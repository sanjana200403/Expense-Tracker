import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const IncomeOverview = ({ transactions, onAddIncome, onDeleteIncome }) => {
    return (
        <div className="rounded-log">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-xl font-semibold">Income Overview</h5>
                    <p>Track your earnings over time and analyze your income</p>
                </div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={onAddIncome}>
                    Add Income
                </button>
            </div>       
            {/* Income List */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {transactions && transactions.length > 0 ? (
                    transactions?.map((income) => (
                        <div key={income._id} className="bg-white p-5 rounded shadow-md hover:shadow-lg transition-all">
                               <h2 className='text-lg font-semibold'>{income?.source}</h2>
                            <h4 className="text-lg">{income?.amount}</h4>
                            <p className="text-sm text-gray-500">{income?.description}</p>
                            <p className="mt-2 text-sm text-gray-400">Date: {new Date(income.date).toLocaleDateString()}</p>

                            <div className="mt-4 flex justify-end items-center">
                                <button
                                    onClick={() => onDeleteIncome(income)}
                                    className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2"
                                >
                                    <FaTrash />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No income data available.</p>
                )}
            </div>
        </div>
    );
};

export default IncomeOverview;
