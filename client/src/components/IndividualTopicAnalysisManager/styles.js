// styles.js
// Centralized dark theme style definitions for the IndividualTopicAnalysis module

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
    // Covers the entire viewport with a semi-transparent dark background
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: darkTheme.overlayBg,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'auto'
  },
  modal: {
    // Modal container styling
    background: darkTheme.modalBg,
    borderRadius: '18px',
    boxShadow: darkTheme.shadow,
    padding: '32px 24px 24px 24px',
    maxWidth: '1100px',
    width: '98vw',
    margin: '40px 0',
    position: 'relative',
    border: '1.5px solid #23272f'
  },
  closeBtn: {
    // Close button styling (top-right corner)
    position: 'absolute',
    top: 18,
    right: 24,
    background: darkTheme.closeBtnBg,
    color: darkTheme.closeBtnText,
    border: 'none',
    borderRadius: '50%',
    width: 36,
    height: 36,
    fontSize: 20,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s'
  },
  flexContainer: {
    // Container for columns (Correct/Incorrect answers)
    display: 'flex',
    gap: '36px',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  column: {
    // Individual column styling
    flex: 1,
    minWidth: 340,
    maxWidth: 480,
    background: darkTheme.columnBg,
    borderRadius: '12px',
    padding: '18px 14px',
    margin: '12px 0',
    boxShadow: '0 2px 8px rgba(25,118,210,0.08)',
    overflowY: 'auto',
    maxHeight: '70vh',
    border: '1px solid #23272f'
  },
  card: {
    // Card for each question
    background: darkTheme.cardBg,
    borderRadius: '10px',
    boxShadow: '0 1px 8px rgba(25,118,210,0.10)',
    margin: '18px 0',
    padding: '16px 14px',
    border: '1px solid #23272f'
  },
  qTitle: { fontWeight: 600, marginBottom: 6, color: '#90caf9' },
  tag: {
    // Tag (topic label) styling
    display: 'inline-block',
    padding: '3px 10px',
    background: darkTheme.tagBg,
    color: darkTheme.tagText,
    borderRadius: '12px',
    fontSize: '0.95em',
    margin: '2px 8px 2px 0'
  },
  optionList: { listStyle: 'none', padding: 0, margin: '8px 0' },
  optionItem: {
    // Base style for each option in the list
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
    // Highlight for correct option
    background: darkTheme.correctBg,
    color: darkTheme.correctText,
    border: `1.5px solid ${darkTheme.correctBorder}`
  },
  incorrect: {
    // Highlight for incorrect selection
    background: darkTheme.incorrectBg,
    color: darkTheme.incorrectText,
    border: `1.5px solid ${darkTheme.incorrectBorder}`
  }
};

export default styles;
