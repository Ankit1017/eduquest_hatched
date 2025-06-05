// Login.jsx
// Login form using the generic AuthForm

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import AuthForm from './AuthForm';
import {host} from '../../config'

/**
 * Login component.
 * Handles login logic and passes props to AuthForm.
 */
const Login = () => {
  // State for form fields and feedback
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useContext(AuthContext);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await axios.post(`${host}/api/auth/login`, { username, password });
      login(res.data);
    } catch (err) {
      setErrorMsg('Login failed. Please check your credentials.');
    }
    setLoading(false);
  };

  return (
    <AuthForm
      title="Sign In"
      onSubmit={handleSubmit}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      buttonText="Login"
      loading={loading}
      errorMsg={errorMsg}
    />
  );
};

export default Login;
