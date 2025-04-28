import React, { useEffect } from 'react';
import { LuArrowBigRight } from 'react-icons/lu';
import TransactionInfoCard from '../card/TransactionInfoCard';
import moment from 'moment';

const RecentTransaction = ({ transactions, onSeeMore }) => {
  useEffect(() => {
  }, [transactions]);

  return (
    <div className="card">
    <div className="flex items-center justify-between">
      <h5 className="text-lg">Recent Transactions</h5>
      <button className="card-btn" onClick={onSeeMore}>
        See All <LuArrowBigRight className="text-base" />
      </button>
    </div>
    <div className="mt-6">
      {transactions && transactions.length > 0 ? (
        transactions.slice(0, 5).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === "Expense" ? item.category : item.source}
            icon={item.icon}
            date={moment(item.date).format('DD MMM YYYY')}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn={true}
          />
        ))
      ) : (
        <div className="text-center text-gray-500 mt-10 text-lg">
          No transactions have happened.
        </div>
      )}
    </div>
  </div>
  
  );
};

export default RecentTransaction;
