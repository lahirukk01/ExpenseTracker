const AppReducer = (state, action) => {
    switch(action.type) {
        case 'GET_TRANSACTIONS':
            // console.log(action)
            let transactions = action.payload.map(tr => {
                tr['id'] = tr['_id']
                return tr
            })

            return {
                ...state,
                loading: false,
                transactions
            }
        case 'DELETE_TRANSACTION': 
            return {
                ...state,
                transactions: state.transactions
                .filter(transaction => transaction.id !== action.payload)
            }
        case 'ADD_TRANSACTION': 
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        case 'TRANSACTION_ERROR':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default AppReducer

