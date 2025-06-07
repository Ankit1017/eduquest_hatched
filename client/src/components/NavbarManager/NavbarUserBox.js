// NavbarUserBox.jsx
// Modern user box with avatar and better styling

import React from 'react';
import styles from './NavbarStyles';
import { Logout } from '../AuthManager';

const NavbarUserBox = ({ username, isMobile = false }) => {
  const getInitials = (name) => {
    return name
      ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : 'U';
  };

  return (
    <div style={styles.userBox}>
      <div style={styles.userAvatar}>
        {getInitials(username)}
      </div>
      <span style={{ color: '#fff', fontWeight: 600 }}>
        {username}
      </span>
      {!isMobile && <Logout />}
    </div>
  );
};

export default NavbarUserBox;
