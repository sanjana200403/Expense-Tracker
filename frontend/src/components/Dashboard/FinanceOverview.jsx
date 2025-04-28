import React from 'react';
import CustomePieChart from '../charts/CustomePieChart';

const COLORS = [
    "#875CF5",
    "#FA2C37",
    "#FF6900"
];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Income", amount: totalIncome },
        { name: "Total Expense", amount: totalExpenses },
    ].filter(item => item.amount > 0); 

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Financial Overview</h5>
            </div>
            <CustomePieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`$${totalBalance}`} 
                colors={COLORS}
                showTextAnchor={true}
            />
        </div>
    );
};

export default FinanceOverview;
