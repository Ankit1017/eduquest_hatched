// Register.jsx
// Register form using the generic AuthForm

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import AuthForm from './AuthForm';
import {host} from '../../config'

/**
 * Register component.
 * Handles registration logic and passes props to AuthForm.
 */
const Register = () => {
  // State for form fields and feedback
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useContext(AuthContext);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const res = await axios.post(`${host}/api/auth/register`, { username, password });
      setSuccessMsg('Registration successful! Logging you in...');
      login(res.data);
    } catch (err) {
      setErrorMsg('Registration failed. Username may already exist.');
    }
    setLoading(false);
  };

  return (
    <AuthForm
      title="Create Account"
      onSubmit={handleSubmit}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      buttonText="Register"
      loading={loading}
      errorMsg={errorMsg}
      successMsg={successMsg}
    />
  );
};

export default Register;
