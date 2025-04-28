import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../card/TransactionInfoCard'
import moment from 'moment'

function ExpenseTransactions({ transactions, onSeeMore }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expense</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {transactions && transactions.length > 0 ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.category}
              icon={item.icon}
              date={moment(item.date).format("DD MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10 text-lg">
            No recent transactions.
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseTransactions;

