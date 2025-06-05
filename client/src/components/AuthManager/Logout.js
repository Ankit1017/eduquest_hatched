// Logout.jsx
// Logout button with hover effect, using shared styles

import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './AuthStyles';

/**
 * Logout button component.
 * Handles logout logic and navigation.
 */
const Logout = () => {
  const { logout } = useContext(AuthContext);
  const [hover, setHover] = useState(false);

  // Handle logout and redirect
  const handleLogout = async (e) => {
    // e.preventDefault();
    try {
      // navigate("/");
      logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={hover
        ? { ...styles.logoutBtn, ...styles.logoutBtnHover }
        : styles.logoutBtn
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Logout"
    >
      <span role="img" aria-label="logout" style={{ fontSize: '1.2em' }}>🚪</span>
      Logout
    </button>
  );
};

export default Logout;
