// Dark theme color palette
const darkTheme = {
  background: "#181b22",
  card: "#23272f",
  chip: "#23272f",
  chipSelected: "#1976d2",
  chipBorder: "#31343c",
  chipBorderSelected: "#64b5f6",
  chipText: "#e3f2fd",
  chipTextSelected: "#fff",
  button: "linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)",
  buttonText: "#fff",
  buttonDisabled: "#374151",
  tagSelectorBg: "#23272f",
  tagSelectorBorder: "#31343c"
};

// Chip style for tags/filters
export const chipStyle = (selected) => ({
  display: 'inline-block',
  padding: '2.5px 14px',
  margin: '3px 7px 3px 0',
  borderRadius: '14px',
  border: selected
    ? `2px solid ${darkTheme.chipBorderSelected}`
    : `1.5px solid ${darkTheme.chipBorder}`,
  background: selected
    ? `linear-gradient(90deg, ${darkTheme.chipSelected} 70%, #60a5fa 100%)`
    : darkTheme.chip,
  color: selected ? darkTheme.chipTextSelected : darkTheme.chipText,
  cursor: 'pointer',
  fontWeight: selected ? 700 : 500,
  fontSize: '1rem',
  lineHeight: 1.3,
  transition: 'all 0.18s',
  boxShadow: selected
    ? '0 2px 8px rgba(25, 118, 210, 0.16)'
    : 'none',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  letterSpacing: '0.01em'
});

// Card style for containers
export const cardStyle = {
  background: darkTheme.card,
  borderRadius: '18px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
  padding: '36px 40px',
  margin: '30px 0',
  maxWidth: '1100px',
  minHeight: '520px',
  width: '90vw',
  boxSizing: 'border-box',
  border: `1.5px solid ${darkTheme.chipBorder}`,
  transition: 'max-width 0.2s, min-height 0.2s, box-shadow 0.2s'
};

// Button style
export const buttonStyle = {
  background: darkTheme.button,
  color: darkTheme.buttonText,
  border: 'none',
  borderRadius: '8px',
  padding: '12px 28px',
  fontWeight: 700,
  fontSize: '1rem',
  cursor: 'pointer',
  margin: '24px 0 0 0',
  transition: 'background 0.2s, transform 0.2s',
  boxShadow: '0 2px 8px rgba(25, 118, 210, 0.13)'
};

// Disabled button style
export const disabledButtonStyle = {
  ...buttonStyle,
  background: darkTheme.buttonDisabled,
  color: '#b0bec5',
  cursor: 'not-allowed',
  boxShadow: 'none'
};

// Tag selector container style
export const tagSelectorContainer = {
  maxHeight: '120px',
  overflowY: 'auto',
  border: `1.5px solid ${darkTheme.tagSelectorBorder}`,
  borderRadius: '10px',
  padding: '12px',
  background: darkTheme.tagSelectorBg
};
