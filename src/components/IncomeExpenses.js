import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { numberWithCommas } from '../utils/format'

const IncomeExpenses = () => {
    const { transactions } = useContext(GlobalContext)
    const amounts = transactions.map(transaction => transaction.amount)

    let income = 0
    let expense = 0

    const temp1 = amounts.filter(item => item > 0)
    if (temp1.length > 0) {
        income = temp1.reduce((sum, amount) => sum += amount)
        .toFixed(2)
    }

    const temp2 = amounts.filter(item => item < 0)
    if (temp2.length > 0) {
        expense = -1 * (temp2.reduce((sum, amount) => sum += amount).toFixed(2))
    }

    return (
        <div className="inc-exp-container">
        <div>
            <h4>Income</h4>
            <p className="money plus">${numberWithCommas(income)}</p>
        </div>
        <div>
            <h4>Expense</h4>
            <p className="money minus">${numberWithCommas(expense)}</p>
        </div>
      </div>
    )
}

export default IncomeExpenses