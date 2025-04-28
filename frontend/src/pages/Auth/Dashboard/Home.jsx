import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import useUserAuth from '../../../hooks/useUserAuth';
import axios from 'axios';
import { API_PATHS, BASE_URL } from '../../../utils/apiPath';
import InfoCard from '../../../components/card/InfoCard';
import { addThousandSeparator } from '../../../utils/helper';
import { IoMdCard } from 'react-icons/io'; // ✅ Import the icon
import RecentTransaction from '../../../components/Dashboard/RecentTransaction';
import { useNavigate } from 'react-router-dom';
import FinanceOverview from '../../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../../components/Dashboard/ExpenseTransactions';
import Last30daysExpenses from '../../../components/Dashboard/Last30daysExpenses';

const Home = () => {
  useUserAuth();
  const navigate = useNavigate()
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        BASE_URL + API_PATHS.DASHBOARD.GET_DATA,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      console.log("dashboard data", response);
      setDashboard(response.data); 
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu={'Dashboard'}>
      <div className='my-5 mx-auto'>
        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <div className="div">
          <div className='my-5 mx-auto'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
              <InfoCard
                icon={<IoMdCard />}
                label="Total Balance"
                value={dashboard?.totalBalance != null ? addThousandSeparator(dashboard.totalBalance) : 0}
                color="bg-primary"
              />
                    <InfoCard
                icon={<IoMdCard />}
                label="Total Income"
                value={dashboard?.totalBalance != null ? addThousandSeparator(dashboard.totalIncome) : 0}
                color="bg-orange-500"
              />
                    <InfoCard
                icon={<IoMdCard />}
                label="Total Expense"
                value={dashboard?.totalBalance != null ? addThousandSeparator(dashboard.totalExpenses) : 0}
                color="bg-red-500"
              />
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RecentTransaction
            transactions={dashboard?.lastTransactions}
            onSeeMore={()=>navigate('/expense')}
            />
            <FinanceOverview
            totalBalance={dashboard?.totalBalance || 0}
            totalIncome={dashboard?.totalIncome || 0}
            totalExpenses={dashboard?.totalExpenses||0}
            />
            <ExpenseTransactions
            transactions={dashboard?.last30DaysTotalExpenses.transactions}
            onSeeMore={()=>navigate('/expense')}
            />
            <Last30daysExpenses
             data={dashboard?.last30DaysTotalExpenses?.transactions || []}
            />

           </div>

           </div>
        )}
      </div> 
    </DashboardLayout>
  );
};

export default Home;
