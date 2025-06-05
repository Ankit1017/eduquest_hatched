// NavbarMobileMenu.jsx
// Mobile menu overlay with links and user info

import React from 'react';
import styles from './NavbarStyles';
import NavbarLinks from './NavbarLinks';
import NavbarUserBox from './NavbarUserBox';

/**
 * NavbarMobileMenu
 * @param {Array} links - Navigation links
 * @param {string} username - Current username
 * @param {function} onClose - Function to close the menu
 */
const NavbarMobileMenu = ({ links, username, onClose }) => (
  <div style={styles.mobileMenu} onClick={onClose}>
    <NavbarLinks links={links} onClick={onClose} />
    <div style={styles.mobileUserBox}>
      <NavbarUserBox username={username} />
    </div>
  </div>
);

export default NavbarMobileMenu;
