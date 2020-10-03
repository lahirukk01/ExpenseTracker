import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { numberWithCommas } from '../utils/format'

const Transaction = ({ transaction }) => {
    const { deleteTransaction } = useContext(GlobalContext)
    const sign = transaction.amount > 0 ? '+' : '-'
    const liClassName = transaction.amount > 0 ? 'plus' : 'minus'

    return (
    <li className={liClassName}>
        {transaction.text} <span>{sign}$ {numberWithCommas(Math.abs(transaction.amount))}</span>
        <button className="delete-btn" 
        onClick={() => deleteTransaction(transaction.id)}>x</button>
    </li>)
}

export default Transaction