import React from 'react';

// Dark theme palette for pagination
const darkTheme = {
  buttonBg: "linear-gradient(90deg, #23272f 60%, #181b22 100%)",
  buttonActiveBg: "linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)",
  buttonDisabledBg: "#23272f",
  buttonBorder: "#31343c",
  buttonText: "#e3f2fd",
  buttonDisabledText: "#607d8b",
  accent: "#90caf9"
};

const Pagination = ({ page, setPage, totalPages }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 14,
        gap: 16
    }}>
        <button
            onClick={() => setPage(p => Math.max(p - 1, 0))}
            disabled={page === 0}
            style={{
                padding: '8px 22px',
                borderRadius: 8,
                border: `1.5px solid ${darkTheme.buttonBorder}`,
                background: page === 0 ? darkTheme.buttonDisabledBg : darkTheme.buttonBg,
                color: page === 0 ? darkTheme.buttonDisabledText : darkTheme.buttonText,
                cursor: page === 0 ? 'not-allowed' : 'pointer',
                fontWeight: 700,
                fontSize: "1rem",
                transition: 'background 0.2s, color 0.2s'
            }}
        >
            Previous
        </button>
        <span style={{
            alignSelf: 'center',
            fontWeight: 700,
            color: darkTheme.accent,
            fontSize: "1.08rem"
        }}>
            Page {page + 1} of {totalPages}
        </span>
        <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
            style={{
                padding: '8px 22px',
                borderRadius: 8,
                border: `1.5px solid ${darkTheme.buttonBorder}`,
                background: page === totalPages - 1 ? darkTheme.buttonDisabledBg : darkTheme.buttonBg,
                color: page === totalPages - 1 ? darkTheme.buttonDisabledText : darkTheme.buttonText,
                cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
                fontWeight: 700,
                fontSize: "1rem",
                transition: 'background 0.2s, color 0.2s'
            }}
        >
            Next
        </button>
    </div>
);

export default Pagination;
