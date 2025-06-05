import React from 'react';
import { chipStyle, tagSelectorContainer, buttonStyle, disabledButtonStyle } from './styles';

// Dark theme color palette for inline styles
const darkTheme = {
  inputBg: "#23272f",
  inputBorder: "#31343c",
  inputText: "#e3f2fd",
  inputPlaceholder: "#90caf9",
  label: "#90caf9",
  timerInputBg: "#181b22",
  timerInputBorder: "#31343c",
  timerInputText: "#e3f2fd"
};

const TagSelector = ({
    availableTags,
    selectedTags,
    onTagChange,
    search,
    setSearch,
    loadingQuestions,
    handleFetchQuestions,
    questions,
    timer,
    setTimer,
    handleStartTest
}) => {
    const filteredTags = availableTags
        .filter(tag => tag.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 12);

    return (
        <section style={{ marginBottom: 24 }}>
            <h3 style={{ marginBottom: 8, color: darkTheme.label }}>Select Tags:</h3>
            <input
                type="text"
                placeholder="Search tags..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                    width: '100%',
                    padding: '9px 12px',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    border: `1.5px solid ${darkTheme.inputBorder}`,
                    background: darkTheme.inputBg,
                    color: darkTheme.inputText,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border 0.2s',
                }}
                // Placeholder color for dark theme
                onFocus={e => (e.target.style.border = `2px solid ${darkTheme.label}`)}
                onBlur={e => (e.target.style.border = `1.5px solid ${darkTheme.inputBorder}`)}
            />
            <div style={tagSelectorContainer}>
                {filteredTags.map((tag) => (
                    <span
                        key={tag}
                        style={chipStyle(selectedTags.includes(tag))}
                        onClick={() => onTagChange(tag)}
                        tabIndex={0}
                        onKeyPress={e => (e.key === 'Enter' || e.key === ' ') && onTagChange(tag)}
                        role="button"
                        aria-pressed={selectedTags.includes(tag)}
                    >
                        {tag}
                    </span>
                ))}
                {filteredTags.length === 0 && (
                    <span style={{ color: '#607d8b' }}>No tags found</span>
                )}
            </div>
            <button
                style={selectedTags.length === 0 || loadingQuestions ? disabledButtonStyle : buttonStyle}
                onClick={handleFetchQuestions}
                disabled={selectedTags.length === 0 || loadingQuestions}
            >
                {loadingQuestions ? 'Fetching...' : 'Fetch Questions'}
            </button>
            {questions.length > 0 && (
                <div style={{ marginTop: 24 }}>
                    <label style={{ color: darkTheme.label, fontWeight: 500 }}>
                        Set Timer (minutes):&nbsp;
                        <input
                            type="number"
                            min={1}
                            max={180}
                            defaultValue={Math.ceil(questions.length * 1.5)}
                            style={{
                                width: '60px',
                                padding: '6px',
                                borderRadius: '6px',
                                border: `1.5px solid ${darkTheme.timerInputBorder}`,
                                background: darkTheme.timerInputBg,
                                color: darkTheme.timerInputText,
                                fontSize: '1rem',
                                outline: 'none',
                                marginLeft: 4,
                                marginRight: 10
                            }}
                            onChange={e => setTimer(Number(e.target.value) * 60)}
                        />
                    </label>
                    <button
                        style={{ ...buttonStyle, marginLeft: 12 }}
                        onClick={() => handleStartTest(timer ? timer / 60 : Math.ceil(questions.length * 1.5))}
                    >
                        Start Test
                    </button>
                </div>
            )}
        </section>
    );
};

export default TagSelector;
