// NavbarUserBox.jsx
// Renders the user info and logout button

import React from 'react';
import styles from './NavbarStyles';
import {Logout} from '../AuthManager'; // Adjust path as needed

/**
 * NavbarUserBox
 * @param {string} username
 */
const NavbarUserBox = ({ username }) => (
  <div style={styles.userBox}>
    <span>{username}</span>
    <Logout />
  </div>
);

export default NavbarUserBox;
