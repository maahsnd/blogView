import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../UserContext';

const UserAuth = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const { userState, setUserState } = useUserContext();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/users/sign-up',
        formData
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Signup failed. Please try again.');
    }
  };

  const handleLogin = async () => {
    try {
      console.log('login click');
      const response = await axios.post(
        'http://localhost:3000/users/log-in',
        formData
      );
      setMessage(response.data.message);
      setUserState({
        message: response.data.message,
        token: response.data.token,
        user: response.data.user
      });
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/users/log-out');
      setMessage('Logout successful.');
    } catch (error) {
      setMessage('Logout failed.');
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <button onClick={handleSignup}>Signup</button>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserAuth;
