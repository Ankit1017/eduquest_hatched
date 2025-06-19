// Navbar.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './NavbarStyles';
import NavbarLinks from './NavbarLinks';
import NavbarUserBox from './NavbarUserBox';
import NavbarMobileMenu from './NavbarMobileMenu';

const NAVBAR_HEIGHT = 72; // px, adjust if your navbar height changes
const appIcon = "📄";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Responsive handler
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation links
  const links = [
    { to: '/', label: 'Home', show: true },
    { to: '/question-paper', label: 'Question Paper', show: true },
    { to: '/add-question', label: 'Add Question', show: user?.role !== 'student' },
    { to: '/admin', label: 'Admin', show: user?.role !== 'student' },
    { to: '/class', label: 'Class', show: true },
  ];

  return (
    <>
      <nav style={styles.nav(isScrolled)}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>{appIcon}</span>
          <span style={styles.logoText}>Hatched</span>
        </Link>

        {/* Desktop Links */}
        {user && !isMobile && (
          <div style={styles.navContainer}>
            <NavbarLinks links={links} />
          </div>
        )}

        {/* User Section */}
        {user ? (
          <div style={styles.userSection}>
            {/* Desktop User Box */}
            {!isMobile && <NavbarUserBox username={user.name} />}
            {/* Mobile Hamburger */}
            <div
              style={{
                ...styles.hamburger(menuOpen),
                display: isMobile ? 'flex' : 'none'
              }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(index => (
                <div key={index} style={styles.hamburgerBar(menuOpen, index)} />
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '12px 20px',
            color: '#b3c5d7',
            fontWeight: 500,
            fontSize: '0.9rem'
          }}>
            Please login to continue
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && isMobile && (
          <NavbarMobileMenu
            isOpen={menuOpen}
            links={links}
            username={user?.name}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </nav>
      {/* Spacer div to push content below fixed navbar */}
      <div style={{ height: NAVBAR_HEIGHT }} />
    </>
  );
};

export default Navbar;
