import React, { useState, useContext } from 'react';
import axios from 'axios';

const UserAuth = (props) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const [message, setMessage] = useState('');

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
      const response = await axios.post(
        'http://localhost:3000/users/log-in',
        formData
      );
      setMessage(response.data.message);
      localStorage.setItem(
        'user',
        JSON.stringify({
          token: response.data.token,
          user: response.data.user
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/users/log-out');
      localStorage.removeItem('user');
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
      <a href="/">Home</a>
    </div>
  );
};

export default UserAuth;
