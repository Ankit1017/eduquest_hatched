// AdminStyles.js
// Shared, overridable style objects for all admin-related components (dark theme)

const darkTheme = {
  cardBg: "#181b22",
  listItemBg: "#23272f",
  cardHeader: "#90caf9",
  cardShadow: "0 4px 24px rgba(25,118,210,0.13)",
  border: "1.5px solid #23272f",
  buttonBg: "linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)",
  buttonText: "#fff",
  buttonDisabledBg: "#374151",
  buttonDisabledText: "#b0bec5",
  buttonHover: "#1565c0"
};

export const styles = {
  card: {
    background: darkTheme.cardBg,
    borderRadius: '14px',
    boxShadow: darkTheme.cardShadow,
    padding: '24px',
    margin: '20px 0',
    maxWidth: '420px',
    border: darkTheme.border,
    color: darkTheme.buttonText
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 18px',
    margin: '10px 0',
    background: darkTheme.listItemBg,
    borderRadius: '10px',
    transition: 'background 0.2s, transform 0.2s',
    cursor: 'pointer',
    border: darkTheme.border,
    color: darkTheme.buttonText
    // For hover, use a class or inline event in React
  },
  button: {
    background: darkTheme.buttonBg,
    color: darkTheme.buttonText,
    border: 'none',
    borderRadius: '7px',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 600,
    transition: 'background 0.2s, color 0.2s'
    // For hover, use a class or inline event in React
  },
  buttonDisabled: {
    background: darkTheme.buttonDisabledBg,
    color: darkTheme.buttonDisabledText,
    cursor: 'not-allowed'
  },
  cardHeader: {
    margin: '0 0 20px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: darkTheme.cardHeader,
    fontWeight: 700,
    fontSize: '1.18rem'
  }
};

export default styles;
