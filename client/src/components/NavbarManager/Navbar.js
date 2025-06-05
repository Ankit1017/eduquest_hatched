// Navbar.jsx
// Main Navbar component with dark theme, animation, and responsive logic

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './NavbarStyles';
import NavbarLinks from './NavbarLinks';
import NavbarUserBox from './NavbarUserBox';
import NavbarMobileMenu from './NavbarMobileMenu';

// You can swap this emoji for your logo or an SVG icon!
const appIcon = "📄";

/**
 * Navbar
 * - Responsive, dark, animated navbar with Framer-like effect
 * - Modular and easily maintainable
 */
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  // Responsive handler
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define navigation links
  const links = [
    { to: '/', label: 'Home', show: true },
    { to: '/question-paper', label: 'Question Paper', show: true },
    { to: '/add-question', label: 'Add Question', show: user.role !== 'student' },
    { to: '/admin', label: 'Admin', show: user.role !== 'student' },
    { to: '/class', label: 'Class' ,show: true },
  ];

  return (
    <nav style={styles.nav}>
      {/* Logo and desktop links */}
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <Link to="/" style={styles.logo}>
          <span style={{ fontSize: '1.6em' }}>{appIcon}</span>
          <span>Question Paper App</span>
        </Link>
        {/* Spacer */}
        <div style={{ width: 40 }} />
        {/* Desktop Links */}
        {user && !isMobile && <NavbarLinks links={links} />}
      </div>

      {/* User info and mobile menu */}
      {user ? (
        <>
          {/* Hamburger for mobile */}
          <div
            style={{
              ...styles.hamburger,
              display: isMobile ? 'flex' : 'none'
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            tabIndex={0}
          >
            <div style={styles.bar}></div>
            <div style={styles.bar}></div>
            <div style={styles.bar}></div>
          </div>
          {/* User info (desktop) */}
          {!isMobile && <NavbarUserBox username={user.name} />}
          {/* Mobile Menu Overlay */}
          {menuOpen && isMobile && (
            <NavbarMobileMenu
              links={links}
              username={user.name}
              onClose={() => setMenuOpen(false)}
            />
          )}
        </>
      ) : (
        <span style={{ fontWeight: 500, fontSize: '1.1em', marginLeft: 18, color: '#b0b6c1' }}>
          Login/Register first.
        </span>
      )}
    </nav>
  );
};

export default Navbar;
