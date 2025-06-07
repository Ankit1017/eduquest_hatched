// NavbarLinks.jsx
// Modern navigation links with smooth animations

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavbarStyles';

const NavbarLinks = ({ links, isMobile = false, onClick }) => {
  const location = useLocation();

  const linkStyle = isMobile ? styles.mobileNavLink : styles.navLink;
  const containerStyle = isMobile ? styles.mobileNavLinks : styles.navLinks;

  return (
    <div style={containerStyle}>
      {links.filter(l => l.show).map(l => {
        const active = location.pathname === l.to;
        return (
          <Link
            key={l.to}
            to={l.to}
            style={linkStyle(active)}
            onClick={onClick}
            onMouseEnter={(e) => {
              if (!isMobile) {
                Object.assign(e.target.style, linkStyle(active)['&:hover'] || {});
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                Object.assign(e.target.style, linkStyle(active));
              }
            }}
          >
            {l.label}
            {!isMobile && <div style={styles.navLinkIndicator(active)} />}
          </Link>
        );
      })}
    </div>
  );
};

export default NavbarLinks;
