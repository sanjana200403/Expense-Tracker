import React, { useContext, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';
import { API_PATHS, BASE_URL } from '../../../utils/apiPath';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import useUserAuth from '../../../hooks/useUserAuth';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading , setLoading] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    userId: '',
    icon: '',
    category: '',
    amount: '',
    description: '',
    date: ''
  });
  const { user } = useContext(UserContext);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
   useUserAuth();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseForm({ ...expenseForm, [name]: value });
  };

  const fetchExpenses = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(BASE_URL + API_PATHS.EXPENSE.GET_ALL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(response.data.expenses);
      setLoading(false)
    } catch (error) {
      setLoading(false);
      toast.error('Failed to fetch expenses');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (editingExpense) {
        // Update expense
        await axios.put(`${BASE_URL}/api/v1/expense/${editingExpense._id}`, expenseForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Expense updated successfully');
        fetchExpenses();
      } else {
        // Add new expense
        const response = await axios.post(BASE_URL + API_PATHS.EXPENSE.ADD, expenseForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExpenses([...expenses, response.data]);
        toast.success('Expense added successfully');
        fetchExpenses()
      }
      setOpenAddExpenseModal(false);
      setEditingExpense(null);
      setExpenseForm({
        userId: '',
        icon: '',
        category: '',
        amount: '',
        description: '',
        date: ''
      });
    } catch (error) {
      toast.error('Failed to save expense');
    }
  };

  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BASE_URL}/api/v1/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(expenses.filter((expense) => expense._id !== id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success('Expense deleted successfully');
    } catch (error) {
      toast.error('Failed to delete expense');
    }
  };

  const openModal = (expense = null) => {
    if (expense) {
      setEditingExpense(expense);
      setExpenseForm({
        icon: expense.icon,
        category: expense.category,
        amount: expense.amount,
        description: expense.description,
        date: expense.date.slice(0, 10)
      });
    } else {
      setEditingExpense(null);
      setExpenseForm({
        userId: '',
        icon: '',
        category: '',
        amount: '',
        description: '',
        date: ''
      });
    }
    setOpenAddExpenseModal(true);
  };

  const renderExpenses = () => {
    if (!expenses || expenses.length === 0) {
      return (
        <div className="text-center text-gray-500 mt-10 text-lg">
          No expenses have happened.
        </div>
      );
    }
  
    return expenses.map((expense) => (
      <div key={expense._id} className="bg-gray-100 rounded-xl shadow p-6 mb-6 flex flex-col gap-2">
        <div className="text-3xl">{expense.icon}</div>
        <div className='flex justify-between'>
          <div className="text-2xl text-gray-800 font-bold">{expense.category}</div>
          <div className="text-green-600 font-bold">₹{expense.amount}</div>
        </div>
        <div className="text-gray-500">{expense.description}</div>
        <div className="text-sm text-gray-400">{new Date(expense.date).toLocaleDateString()}</div>
        <div className="flex gap-4 mt-3 justify-end">
          <button
            onClick={() => openModal(expense)}
            className="bg-purple-700 hover:bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => setOpenDeleteAlert({ show: true, data: expense })}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };
  
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
         {loading ? (
          <h1 className='flex justify-center'>Loading Expenses...</h1>
        ) : (
          <>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Expenses</h1>
          <button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow">
            Add Expense
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderExpenses()}
        </div>

        {openAddExpenseModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg">
              <h3 className="text-xl font-semibold mb-6">{editingExpense ? "Edit Expense" : "Add New Expense"}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={expenseForm.category}
                  onChange={handleInputChange}
                  className="w-full border rounded px-4 py-2"
                />
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={expenseForm.amount}
                  onChange={handleInputChange}
                  className="w-full border rounded px-4 py-2"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={expenseForm.description}
                  onChange={handleInputChange}
                  className="w-full border rounded px-4 py-2"
                />
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => { setOpenAddExpenseModal(false); setEditingExpense(null); }}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    {editingExpense ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {openDeleteAlert.show && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg">
              <h3 className="text-xl font-semibold mb-6">Delete Expense</h3>
              <p>Are you sure you want to delete this expense?</p>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setOpenDeleteAlert({ show: false, data: null })}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteExpense(openDeleteAlert.data._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
      </>)}
    </DashboardLayout>
  );
};

export default Expense;
