// PastAttemptStyles.js
export const styles = {
  homePageContainer: (isMobile) => ({
    padding: isMobile ? '10px 2vw' : '20px 24px',
    color: '#f0f0f0',
    minHeight: '95vh',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
  }),
  cardStack: (isMobile) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: isMobile ? '12px' : '24px',
    width: '100%',
  }),
  card: (isMobile) => ({
    background: 'linear-gradient(145deg, #1a1d24, #23272f)',
    borderRadius: '14px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
    padding: isMobile ? '14px 8px' : '26px',
    margin: isMobile ? '16px 0' : '24px auto',
    width: '100%',
    maxWidth: isMobile ? '99vw' : '800px',
    border: '1px solid rgba(255,255,255,0.08)'
  }),
  attemptCard: (isMobile) => ({
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
    padding: isMobile ? '14px 8px' : '26px 36px',
    margin: 0,
    border: '1px solid rgba(255,255,255,0.06)',
    width: '100%',
    maxWidth: '800px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    gap: isMobile ? '12px' : '0',
    transition: 'all 0.2s ease',
  }),
  leftCol: (isMobile) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: isMobile ? 'flex-start' : 'flex-start',
    gap: isMobile ? '8px' : '14px',
    flex: 1,
  }),
  dateTime: (isMobile) => ({
    color: '#b3c2d4',
    fontSize: isMobile ? '1em' : '1.08em',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: isMobile ? '4px' : '0',
  }),
  statsRow: (isMobile) => ({
    display: 'flex',
    gap: isMobile ? '10px' : '24px',
    fontSize: isMobile ? '0.99em' : '1.05em',
  }),
  score: { color: '#90caf9' },
  time: { color: '#90caf9' },
  viewBtn: (isMobile) => ({
    background: 'linear-gradient(45deg, #1976d2, #2196f3)',
    color: '#fff',
    padding: isMobile ? '8px 18px' : '10px 32px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: isMobile ? '1em' : '1.07em',
    transition: 'transform 0.2s',
    marginLeft: isMobile ? 0 : '24px',
    marginTop: isMobile ? '10px' : 0,
    alignSelf: isMobile ? 'stretch' : 'center',
  }),
  header: (isMobile) => ({
    color: '#60a5fa',
    marginBottom: isMobile ? '14px' : '24px',
    textAlign: 'center',
    fontSize: isMobile ? '1.25rem' : '1.8rem',
    fontWeight: 700,
    letterSpacing: '0.02em'
  }),
  badge: (color, isMobile) => ({
    display: 'inline-block',
    padding: isMobile ? '3px 10px' : '4px 14px',
    borderRadius: '20px',
    background: color,
    color: '#fff',
    fontSize: isMobile ? '0.85rem' : '0.92rem',
    fontWeight: 600,
    marginLeft: isMobile ? '6px' : '12px',
    textShadow: '0 1px 2px rgba(0,0,0,0.15)'
  }),
  option: (isCorrect, isSelected, isMobile) => ({
    padding: isMobile ? '7px 10px' : '10px 18px',
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
    margin: isMobile ? '5px 0' : '8px 0',
    fontWeight: isCorrect || isSelected ? 600 : 400,
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '8px' : '12px',
    fontSize: isMobile ? '0.98em' : '1.04em',
    transition: 'all 0.2s ease'
  }),
  backButton: (isMobile) => ({
    background: 'rgba(255,255,255,0.08)',
    color: '#90caf9',
    border: 'none',
    borderRadius: '8px',
    padding: isMobile ? '7px 12px' : '8px 20px',
    cursor: 'pointer',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: isMobile ? '1em' : '1.08em',
    marginBottom: isMobile ? '10px' : '0',
    transition: 'all 0.2s ease',
  }),
  loading: (isMobile) => ({
    textAlign: 'center',
    color: '#90caf9',
    fontSize: isMobile ? '1em' : '1.2rem',
    padding: isMobile ? '18px 0' : '32px 0'
  })
};

export default styles;
