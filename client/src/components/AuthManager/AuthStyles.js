// AuthStyles.js
// Shared, overridable style objects for all auth-related components

/**
 * These styles are intended to be used as defaults. You can
 * override them by passing your own style props to components.
 */
export const styles = {
  card: {
    background: '#fff',
    borderRadius: '14px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.09)',
    padding: '32px 28px',
    margin: '60px auto',
    maxWidth: '400px',
    minWidth: '280px'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    margin: '12px 0',
    borderRadius: '7px',
    border: '1px solid #bdbdbd',
    fontSize: '1rem',
    background: '#fafbfc',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border 0.2s'
  },
  label: {
    fontWeight: 600,
    margin: '8px 0 4px 0',
    display: 'block'
  },
  button: {
    background: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 26px',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '18px',
    width: '100%',
    transition: 'background 0.2s'
  },
  buttonDisabled: {
    background: '#b0bec5',
    cursor: 'not-allowed'
  },
  msgError: {
    color: '#d32f2f',
    fontWeight: 600,
    margin: '18px 0 0 0',
    textAlign: 'center'
  },
  msgSuccess: {
    color: '#388e3c',
    fontWeight: 600,
    margin: '18px 0 0 0',
    textAlign: 'center'
  },
  logoutBtn: {
    background: '#fff',
    color: '#1976d2',
    border: '1.5px solid #1976d2',
    borderRadius: '6px',
    padding: '6px 18px 6px 12px',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background 0.18s, color 0.18s, border 0.18s',
    marginLeft: '6px'
  },
  logoutBtnHover: {
    background: '#1976d2',
    color: '#fff',
    border: '1.5px solid #1565c0'
  }
};

export default styles;
