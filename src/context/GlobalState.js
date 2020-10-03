import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import AppReducer from './AppReducer'

// Initial State
const initialState = {
    transactions: [],
    error: null,
    loading: true    
} 

// Create Context
export const GlobalContext = createContext(initialState)

// Provider Component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const getTransactions = async () => {
        try {
            const res = await axios.get('/api/v1/transactions')

            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
    }

    const deleteTransaction = async (id) => { 
        try {
            const res = await axios.delete(`/api/v1/transactions/${id}`)

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
    }

    const addTransaction = async (transaction) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const response = await axios.post('/api/v1/transactions', 
                transaction, config)

            console.log(response)    
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: {
                    ...response.data.data,
                    id: response.data.data._id
                }
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
    }

    return (
        <GlobalContext.Provider value={{
            error: state.error,
            loading: state.loading,
            transactions: state.transactions,
            getTransactions,
            deleteTransaction,
            addTransaction
            }}>
            {children}
        </GlobalContext.Provider>
    )
}