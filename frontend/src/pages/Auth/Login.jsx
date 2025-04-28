import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/Inputs/Input';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';
import { API_PATHS, BASE_URL } from '../../utils/apiPath';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  
  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    setError('');
    setLoading(true);  
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
       return;
    }
    if (!password) {
      setError('Please enter your password.');
      setLoading(false);  
      return;
    }
    try {
      const response = await axios.post( BASE_URL+API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      console.log('Login Success:', response.data);
      const { token, user } = response.data;
  
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        updateUser(user)
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Login Error:', err);
  
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError('Server not responding. Please try again later.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);  // Set loading to false after the API call completes
    }
  };
  

  return (
    <AuthLayout>
      <div className="lg:w-full h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-1 mb-6">
          Please enter your details to log in.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-700 text-white rounded-md hover:bg-primary-dark transition-all"
            disabled={loading}  // Disable button when loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-[13px] text-slate-800 mt-3 text-center">
            Don't have an account?{' '}
            <Link className="font-medium text-primary underline" to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
