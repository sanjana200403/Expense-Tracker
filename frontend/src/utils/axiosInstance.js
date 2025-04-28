import axios from 'axios';
import { BASE_URL } from './apiPath';
import { useNavigate } from 'react-router-dom';  // If you are using react-router-dom

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,  // Increased timeout to 5 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;  
    }
    console.log("Request Config:", config);  // Log the config for debugging
    return config;
  },
  (err) => {
    console.error("Request Error:", err);
    return Promise.reject(err);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Data:", response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Error Response:', error.response.data);  // Log the full error response
      if (error.response.status === 401) {
        // Use useNavigate to redirect programmatically in a React component
        const navigate = useNavigate();
        navigate('/login');  // Redirect on unauthorized
      } else if (error.response.status === 500) {
        console.error('Server error, Please try again later');
      } else if (error.code === 'ECONNABORTED') {
        console.error('Request timeout, please try again later');
      }
    } else {
      console.error('Error without response:', error.message);  // No response from server
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
