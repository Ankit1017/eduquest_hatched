// QuestionFormStyles.js
// Centralized dark theme styles for the question form

export const styles = {
  card: {
    background: 'linear-gradient(135deg, #181b22 60%, #23272f 100%)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
    padding: '36px 32px',
    margin: '48px auto',
    maxWidth: '540px',
    minWidth: '320px',
    border: '1px solid rgba(255,255,255,0.07)'
  },
  header: {
    color: '#60a5fa',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 700,
    fontSize: '1.5rem',
    letterSpacing: '0.02em'
  },
  label: {
    fontWeight: 600,
    margin: '14px 0 6px 0',
    display: 'block',
    color: '#b0b6c1'
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1.5px solid #31343c',
    fontSize: '1rem',
    background: '#23272f',
    color: '#f0f0f0',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border 0.2s',
    fontWeight: 500
  },
  textarea: {
    minHeight: 90,
    resize: 'vertical'
  },
  select: {
    width: '100%',
    padding: '12px 14px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1.5px solid #31343c',
    fontSize: '1rem',
    background: '#23272f',
    color: '#f0f0f0',
    fontWeight: 500,
    outline: 'none',
    transition: 'border 0.2s'
  },
  button: {
    background: 'linear-gradient(90deg, #1976d2 0%, #60a5fa 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 28px',
    fontWeight: 700,
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '22px',
    width: '100%',
    transition: 'background 0.2s'
  },
  buttonDisabled: {
    background: '#374151',
    cursor: 'not-allowed'
  },
  msgSuccess: {
    color: '#43a047',
    fontWeight: 600,
    margin: '18px 0 0 0',
    textAlign: 'center'
  },
  msgError: {
    color: '#f44336',
    fontWeight: 600,
    margin: '18px 0 0 0',
    textAlign: 'center'
  }
};

export default styles;
