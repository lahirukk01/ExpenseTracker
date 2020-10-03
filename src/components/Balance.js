import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { numberWithCommas } from '../utils/format'

const Balance = () => {
    const { transactions } = useContext(GlobalContext)
    
    const amounts = transactions.map((transaction => transaction.amount))

    let total = 0
    if (amounts.length > 0) {
        total = amounts.reduce((account, item) => account += item).toFixed(2)
    }
    
    return (
        <>
            <h4>Your Balance</h4>
            <h1 id="balance">${numberWithCommas(total)}</h1>
        </>
    )
}

export default Balance