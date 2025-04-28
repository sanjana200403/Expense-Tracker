import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Auth/Dashboard/Home';
import Expense from './pages/Auth/Dashboard/Expense';
import Income from './pages/Auth/Dashboard/Income'; // Ensure this component is created
import UserProvider from './context/userContext';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify';
const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </Router>
           {/* ToastContainer */}
      <ToastContainer
        position="top-right"          // Toast popup position
        autoClose={3000}              // Auto close after 3 seconds
        hideProgressBar={false}       
        newestOnTop={false}
        closeOnClick
        rtl={false}                   
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"               // You can also use 'light' or 'dark'
      />
      </div>
    </UserProvider>
  );
}

export default App;
