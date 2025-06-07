// NavbarMobileMenu.jsx
// Modern mobile menu with smooth animations

import React, { useEffect } from 'react';
import styles from './NavbarStyles';
import NavbarLinks from './NavbarLinks';
import NavbarUserBox from './NavbarUserBox';
import { Logout } from '../AuthManager';

const NavbarMobileMenu = ({ isOpen, links, username, onClose }) => {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div
      style={styles.mobileMenu(isOpen)}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <NavbarLinks
          links={links}
          isMobile={true}
          onClick={onClose}
        />

        <div style={styles.mobileUserBox}>
          <NavbarUserBox username={username} isMobile={true} />
          <div style={{ marginTop: '16px' }}>
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
