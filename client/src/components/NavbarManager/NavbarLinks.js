// NavbarLinks.jsx
// Renders navigation links with animated underline

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavbarStyles';

/**
 * NavbarLinks
 * @param {Array} links - Array of {to, label, show}
 * @param {function} [onClick] - Optional click handler (for mobile menu)
 */
const NavbarLinks = ({ links, onClick }) => {
  const location = useLocation();

  return (
    <div style={styles.navLinks}>
      {links.filter(l => l.show).map(l => {
        const active = location.pathname === l.to;
        return (
          <Link
            key={l.to}
            to={l.to}
            style={styles.navLink(active)}
            tabIndex={0}
            onClick={onClick}
          >
            {l.label}
            <span style={styles.navLinkUnderline(active)} />
          </Link>
        );
      })}
    </div>
  );
};

export default NavbarLinks;
