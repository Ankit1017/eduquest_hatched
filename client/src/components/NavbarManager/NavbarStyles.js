// NavbarStyles.js
// Centralized, overridable style objects for Navbar

export const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 999,
    background: 'linear-gradient(90deg, #0f1116 60%, #191c22 100%)',
    color: '#fff',
    padding: '0 32px',
    boxShadow: '0 2px 16px 0 rgba(0,0,0,0.16)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    transition: 'background 0.3s cubic-bezier(.4,0,.2,1)'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 700,
    fontSize: '1.4rem',
    color: '#fff',
    textDecoration: 'none',
    gap: '12px',
    letterSpacing: '0.02em'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '22px'
  },
  navLink: (active) => ({
    color: active ? '#fff' : '#b0b6c1',
    textDecoration: 'none',
    fontWeight: active ? 700 : 500,
    fontSize: '1.08rem',
    padding: '7px 16px',
    borderRadius: '8px',
    background: active ? 'rgba(255,255,255,0.09)' : 'none',
    transition: 'background 0.2s, color 0.2s',
    position: 'relative',
    overflow: 'hidden'
  }),
  navLinkUnderline: (active) => ({
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 4,
    height: 2,
    borderRadius: 2,
    background: active ? 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)' : 'transparent',
    opacity: active ? 1 : 0,
    transition: 'opacity 0.2s'
  }),
  userBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    marginLeft: '32px',
    background: 'rgba(255,255,255,0.04)',
    borderRadius: '8px',
    padding: '6px 18px',
    fontWeight: 600,
    fontSize: '1.08em',
    letterSpacing: 0.3
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'pointer',
    marginLeft: 18,
    zIndex: 1100
  },
  bar: {
    width: '28px',
    height: '3px',
    background: '#fff',
    margin: '4px 0',
    borderRadius: '2px',
    transition: 'all 0.3s cubic-bezier(.4,0,.2,1)'
  },
  mobileMenu: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(17,19,26,0.96)',
    boxShadow: '0 6px 24px rgba(25,118,210,0.13)',
    padding: '80px 0 16px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '22px',
    zIndex: 1200,
    opacity: 1,
    animation: 'fadeIn 0.25s'
  },
  mobileUserBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    margin: '18px 0 0 18px'
  }
};

export default styles;
