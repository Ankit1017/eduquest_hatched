// AuthForm.jsx
// Generic authentication form for login/register, accepts all props for full control

import React from 'react';
import styles from './AuthStyles';

/**
 * Generic form for authentication actions (login/register).
 * Accepts all field and button props, and allows style overrides.
 *
 * @param {string} title - Form title
 * @param {function} onSubmit - Submit handler
 * @param {string} username - Username value
 * @param {function} setUsername - Username setter
 * @param {string} password - Password value
 * @param {function} setPassword - Password setter
 * @param {string} buttonText - Button label
 * @param {boolean} loading - Loading state
 * @param {string} errorMsg - Error message
 * @param {string} successMsg - Success message
 * @param {object} [customStyles] - Optional style overrides
 */
const AuthForm = ({
  title,
  onSubmit,
  username,
  setUsername,
  password,
  setPassword,
  buttonText,
  loading,
  errorMsg,
  successMsg,
  customStyles = {}
}) => {
  // Merge default styles with custom overrides (if any)
  const merged = (key) => ({ ...styles[key], ...customStyles[key] });

  return (
    <div style={merged('card')}>
      <h2 style={{ color: '#1976d2', textAlign: 'center', marginBottom: 20 }}>{title}</h2>
      <form onSubmit={onSubmit}>
        <label style={merged('label')} htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter username"
          required
          style={merged('input')}
          autoComplete="username"
        />
        <label style={merged('label')} htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
          required
          style={merged('input')}
          autoComplete={title === 'Create Account' ? 'new-password' : 'current-password'}
        />
        <button
          type="submit"
          style={loading
            ? { ...merged('button'), ...styles.buttonDisabled, ...customStyles.buttonDisabled }
            : merged('button')
          }
          disabled={loading}
        >
          {loading ? (buttonText === 'Login' ? 'Logging in...' : 'Registering...') : buttonText}
        </button>
      </form>
      {/* Show feedback messages */}
      {successMsg && <div style={merged('msgSuccess')}>{successMsg}</div>}
      {errorMsg && <div style={merged('msgError')}>{errorMsg}</div>}
    </div>
  );
};

export default AuthForm;
