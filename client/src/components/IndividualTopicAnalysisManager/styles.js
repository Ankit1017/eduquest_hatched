const darkTheme = {
  overlayBg: 'rgba(10, 25, 41, 0.92)',
  modalBg: '#181b22',
  cardBg: '#23272f',
  columnBg: '#20232a',
  tagBg: '#1976d2',
  tagText: '#e3f2fd',
  correctBg: 'rgba(56, 142, 60, 0.15)',
  correctBorder: '#43a047',
  correctText: '#43a047',
  incorrectBg: 'rgba(211, 47, 47, 0.13)',
  incorrectBorder: '#ef9a9a',
  incorrectText: '#ef5350',
  closeBtnBg: '#23272f',
  closeBtnText: '#90caf9',
  shadow: '0 6px 24px rgba(25, 118, 210, 0.13)'
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: darkTheme.overlayBg,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'auto'
  },
  modal: (isMobile) => ({
    background: darkTheme.modalBg,
    borderRadius: '18px',
    boxShadow: darkTheme.shadow,
    padding: isMobile ? '10px 4px 16px 4px' : '32px 24px 24px 24px',
    maxWidth: isMobile ? '98vw' : '1100px',
    width: isMobile ? '98vw' : '98vw',
    margin: isMobile ? '8px 0' : '40px 0',
    position: 'relative',
    border: '1.5px solid #23272f',
    overflowX: 'hidden'
  }),
  modalHeader: (isMobile) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: isMobile ? 12 : 30,
    padding: isMobile ? '4px 4px 0 4px' : '0 0 0 0'
  }),
  topicTitle: (isMobile) => ({
    color: '#1976d2',
    fontWeight: 700,
    fontSize: isMobile ? '1.15rem' : '1.5rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: isMobile ? '75vw' : 'none'
  }),
  closeBtn: (isMobile) => ({
    background: darkTheme.closeBtnBg,
    color: darkTheme.closeBtnText,
    border: 'none',
    borderRadius: '50%',
    width: isMobile ? 32 : 36,
    height: isMobile ? 32 : 36,
    fontSize: isMobile ? 18 : 20,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s',
    position: 'static',
    marginLeft: 10,
    flexShrink: 0
  }),
  flexContainer: (isMobile) => ({
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '10px' : '36px',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  }),
  column: (isMobile) => ({
    flex: 1,
    minWidth: isMobile ? 'unset' : 340,
    maxWidth: isMobile ? '100%' : 480,
    background: darkTheme.columnBg,
    borderRadius: '12px',
    padding: isMobile ? '10px 4px' : '18px 14px',
    margin: isMobile ? '6px 0' : '12px 0',
    boxShadow: '0 2px 8px rgba(25,118,210,0.08)',
    overflowY: 'auto',
    maxHeight: isMobile ? 'unset' : '70vh',
    border: '1px solid #23272f'
  }),
  card: (isMobile) => ({
    background: darkTheme.cardBg,
    borderRadius: '10px',
    boxShadow: '0 1px 8px rgba(25,118,210,0.10)',
    margin: isMobile ? '10px 0' : '18px 0',
    padding: isMobile ? '10px 8px' : '16px 14px',
    border: '1px solid #23272f'
  }),
  qTitle: { fontWeight: 600, marginBottom: 6, color: '#90caf9' },
  tagRow: (isMobile) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: isMobile ? '6px' : '10px',
    margin: '6px 0 0 0'
  }),
  tag: (isMobile) => ({
    display: 'inline-block',
    padding: isMobile ? '2px 10px' : '3px 12px',
    background: darkTheme.tagBg,
    color: darkTheme.tagText,
    borderRadius: '12px',
    fontSize: isMobile ? '0.92em' : '1em',
    margin: 0,
    fontWeight: 500,
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap',
  }),
  optionList: { listStyle: 'none', padding: 0, margin: '8px 0' },
  optionItem: {
    padding: '7px 12px',
    borderRadius: '7px',
    margin: '3px 0',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
    background: 'rgba(255,255,255,0.02)',
    color: '#e3f2fd',
    border: '1px solid #23272f',
    transition: 'background 0.2s, color 0.2s'
  },
  correct: {
    background: darkTheme.correctBg,
    color: darkTheme.correctText,
    border: `1.5px solid ${darkTheme.correctBorder}`
  },
  incorrect: {
    background: darkTheme.incorrectBg,
    color: darkTheme.incorrectText,
    border: `1.5px solid ${darkTheme.incorrectBorder}`
  }
};

export default styles;
