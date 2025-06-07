// NavbarStyles.js
// Modern dark navbar with glassmorphism and scroll effects

export const styles = {
  nav: (isScrolled) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: isScrolled
      ? 'rgba(10, 25, 41, 0.85)'
      : 'rgba(10, 25, 41, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: isScrolled
      ? '1px solid rgba(100, 181, 246, 0.2)'
      : '1px solid rgba(255, 255, 255, 0.1)',
    color: '#e3f2fd',
    padding: '0 clamp(20px, 5vw, 40px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 72,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: isScrolled
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 2px 16px rgba(0, 0, 0, 0.1)',
  }),


  logo: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 800,
    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
    color: '#fff',
    textDecoration: 'none',
    gap: '14px',
    letterSpacing: '-0.02em',
    position: 'relative',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.02)'
    }
  },

  logoIcon: {
    fontSize: '2em',
    background: 'linear-gradient(135deg, #64b5f6 0%, #90caf9 50%, #bbdefb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'drop-shadow(0 2px 4px rgba(100, 181, 246, 0.3))',
  },

  logoText: {
    background: 'linear-gradient(135deg, #fff 0%, #e3f2fd 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  navContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    flex: 1,
    justifyContent: 'center',
  },

  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },

  navLink: (active) => ({
    color: active ? '#fff' : '#b3c5d7',
    textDecoration: 'none',
    fontWeight: active ? 600 : 500,
    fontSize: '0.95rem',
    padding: '10px 20px',
    borderRadius: '12px',
    background: active
      ? 'linear-gradient(135deg, rgba(100, 181, 246, 0.2) 0%, rgba(144, 202, 249, 0.1) 100%)'
      : 'transparent',
    border: active ? '1px solid rgba(100, 181, 246, 0.3)' : '1px solid transparent',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    letterSpacing: '0.02em',
    '&:hover': {
      color: '#fff',
      background: active
        ? 'linear-gradient(135deg, rgba(100, 181, 246, 0.3) 0%, rgba(144, 202, 249, 0.2) 100%)'
        : 'rgba(255, 255, 255, 0.08)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(100, 181, 246, 0.2)',
    }
  }),

  navLinkIndicator: (active) => ({
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: active ? '80%' : '0%',
    height: '2px',
    background: 'linear-gradient(90deg, #64b5f6 0%, #90caf9 100%)',
    borderRadius: '2px',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }),

  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },

  userBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '8px 16px',
    fontWeight: 600,
    fontSize: '0.9rem',
    letterSpacing: '0.02em',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(100, 181, 246, 0.3)',
    }
  },

  userAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #64b5f6 0%, #90caf9 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.8rem',
    boxShadow: '0 2px 8px rgba(100, 181, 246, 0.3)',
  },

  hamburger: (isOpen) => ({
    display: 'none',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
    }
  }),

  hamburgerBar: (isOpen, index) => ({
    width: '24px',
    height: '2px',
    background: '#fff',
    borderRadius: '2px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transformOrigin: 'center',
    margin: '3px 0',
    ...(isOpen && index === 0 && {
      transform: 'rotate(45deg) translate(6px, 6px)',
    }),
    ...(isOpen && index === 1 && {
      opacity: 0,
    }),
    ...(isOpen && index === 2 && {
      transform: 'rotate(-45deg) translate(6px, -6px)',
    }),
  }),

  mobileMenu: (isOpen) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(10, 25, 41, 0.98)',
    backdropFilter: 'blur(20px)',
    padding: '100px 32px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    zIndex: 999,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }),

  mobileNavLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '32px',
  },

  mobileNavLink: (active) => ({
    color: active ? '#fff' : '#b3c5d7',
    textDecoration: 'none',
    fontWeight: active ? 600 : 500,
    fontSize: '1.1rem',
    padding: '16px 24px',
    borderRadius: '12px',
    background: active
      ? 'linear-gradient(135deg, rgba(100, 181, 246, 0.2) 0%, rgba(144, 202, 249, 0.1) 100%)'
      : 'rgba(255, 255, 255, 0.05)',
    border: active ? '1px solid rgba(100, 181, 246, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    letterSpacing: '0.02em',
  }),

  mobileUserBox: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '20px',
    marginTop: 'auto',
  },

  // Responsive breakpoints
  '@media (max-width: 900px)': {
    hamburger: {
      display: 'flex'
    },
    navLinks: {
      display: 'none'
    },
    userBox: {
      display: 'none'
    }
  }
};

export default styles;
