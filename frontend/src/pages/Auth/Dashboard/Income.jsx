import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import IncomeOverview from '../../../components/Income/IncomeOverview';
import axios from 'axios';
import { API_PATHS, BASE_URL } from '../../../utils/apiPath';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import useUserAuth from '../../../hooks/useUserAuth';

const Income = () => {
  useUserAuth()
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const { user } = useContext(UserContext);

  // State for Add Income Form
  const [incomeForm, setIncomeForm] = useState({
    amount: '',
    description: '',
    source: '',
    title: '',
    icon: '',
  });

  const navigate = useNavigate();

  // Helper to get token
  const getToken = () => localStorage.getItem('token');

  // Common headers with token
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  // Fetch all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL + API_PATHS.INCOME.GET_ALL, authHeaders);
      if (response.data && response.data.newIncome) {
        setIncomeData(response.data.newIncome);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
      console.error('Error fetching income:', error);
      toast.error('Failed to fetch income data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  // Add a new income
  const handleAddIncome = async (e) => {
    e.preventDefault();
    const income = {
      amount: incomeForm.amount,
      description: incomeForm.description,
      source: incomeForm.source,
      title: incomeForm.title,
      icon: incomeForm.icon,
      userId: user._id,
    };

    try {
      const response = await axios.post(BASE_URL + API_PATHS.INCOME.ADD, income, authHeaders);
      if (response.data.success) {
        toast.success('Income added successfully');
        fetchIncomeDetails(); // Refresh list
        setOpenAddIncomeModal(false);
        setIncomeForm({
          amount: '',
          description: '',
          source: '',
          title: '',
          icon: '',
        }); // Reset form
      }
    } catch (error) {
      console.error('Error adding income:', error);
      toast.error('Failed to add income');
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncomeForm({ ...incomeForm, [name]: value });
  };

  // Delete an income
  const deleteIncome = async (income) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/income/${income._id}`, authHeaders);
      if (response.data.success) {
        toast.success('Income deleted successfully');
        fetchIncomeDetails(); 
        setOpenDeleteAlert({ show: false, data: null });
      }
    } catch (error) {
      console.error('Error deleting income:', error);
      toast.error('Failed to delete income');
    }
  };

  return (
    <DashboardLayout activeMenu="Income">
         {loading ? (
          <h1 className='flex justify-center'>Loading Incomes...</h1>
        ) : (
          <>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
              onDeleteIncome={deleteIncome}
            />
        </div>
      </div>
      {openAddIncomeModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 p-5">
          <div className="bg-white p-5 rounded shadow-lg w-full md:w-1/3">
            <h3 className="text-lg font-semibold">Add Income</h3>
            <form onSubmit={handleAddIncome}>
              <div className="mt-4">
                <label className="block">Income Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={incomeForm.amount}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mt-4">
                <label className="block">Income Source</label>
                <input
                  type="text"
                  name="source"
                  value={incomeForm.source}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setOpenAddIncomeModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Income
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {openDeleteAlert.show && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg w-full sm:w-1/3">
            <h3 className="text-lg font-semibold">Are you sure you want to delete this income?</h3>
            <div className="mt-4 flex justify-between">
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setOpenDeleteAlert({ show: false, data: null })}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deleteIncome(openDeleteAlert.data._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      </>
    )}
    </DashboardLayout>
  );
};

export default Income;
