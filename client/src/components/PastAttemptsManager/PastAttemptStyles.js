// PastAttemptStyles.js
// Dark theme styles with modern aesthetics

export const styles = {
  container: {
    marginTop: '32px',
    padding: '24px 24px',
    color: '#f0f0f0',
  },
  card: {
    background: 'linear-gradient(145deg, #1a1d24, #23272f)',
    borderRadius: '14px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
    padding: '26px',
    margin: '24px auto',
    maxWidth: '800px',
    border: '1px solid rgba(255,255,255,0.08)'
  },
  header: {
    color: '#60a5fa',
    marginBottom: '24px',
    textAlign: 'center',
    fontSize: '1.8rem',
    fontWeight: 700,
    letterSpacing: '0.02em'
  },
  badge: (color) => ({
    display: 'inline-block',
    padding: '4px 14px',
    borderRadius: '20px',
    background: color,
    color: '#fff',
    fontSize: '0.92rem',
    fontWeight: 600,
    marginLeft: '12px',
    textShadow: '0 1px 2px rgba(0,0,0,0.15)'
  }),
  option: (isCorrect, isSelected) => ({
    padding: '10px 18px',
    borderRadius: '10px',
    background: isCorrect
      ? 'rgba(76,175,80,0.15)'
      : isSelected
        ? 'rgba(255,183,77,0.15)'
        : 'rgba(255,255,255,0.05)',
    color: isCorrect
      ? '#4caf50'
      : isSelected
        ? '#ffb74d'
        : '#e0e0e0',
    border: isCorrect
      ? '1px solid rgba(76,175,80,0.4)'
      : isSelected
        ? '1px solid rgba(255,183,77,0.4)'
        : '1px solid rgba(255,255,255,0.1)',
    margin: '8px 0',
    fontWeight: isCorrect || isSelected ? 600 : 400,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.2s ease'
  }),
  backButton: {
    background: 'rgba(255,255,255,0.08)',
    color: '#90caf9',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 20px',
    cursor: 'pointer',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    ':hover': {
      background: 'rgba(144,202,249,0.15)'
    }
  },
  attemptCard: {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
    padding: '20px',
    margin: '16px 0',
    border: '1px solid rgba(255,255,255,0.06)',
    transition: 'all 0.2s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0,0,0,0.3)'
    }
  },
  loading: {
    textAlign: 'center',
    color: '#90caf9',
    fontSize: '1.2rem',
    padding: '32px 0'
  }
};

export default styles;
