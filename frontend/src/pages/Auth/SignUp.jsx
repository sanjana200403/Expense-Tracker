import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axios from 'axios';
import { API_PATHS, BASE_URL } from '../../utils/apiPath';
import { UserContext } from '../../context/userContext';
import { uploadImage } from '../../utils/uploadImage';

// Email validation function
const validEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (!validEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    try {
      let profileImageUrl = ''; // Declare profileImageUrl

      if (profilePic) {
        const imageUploadsRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadsRes.imageUrl || ''; // Assign the image URL
      }

      const response = await axios.post(BASE_URL + API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl, // Send profileImageUrl to the backend
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('SignUp Error:', err);

      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError('Server not responding. Please try again later.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black mb-2">Create an Account</h3>

        <form onSubmit={handleSignUp} className="grid grid-cols-1 gap-4">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your name"
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="btn-primary">
            Sign up
          </button>

          <p className="text-sm text-slate-800 mt-3">
            Already have an account?{' '}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
