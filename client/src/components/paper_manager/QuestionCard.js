import React from 'react';
import { cardStyle, buttonStyle } from './styles';

// Dark theme palette for inline elements
const darkTheme = {
  attemptedBg: "#1976d2",
  attemptedText: "#fff",
  notAttemptedBg: "#23272f",
  notAttemptedText: "#90caf9",
  selectedBorder: "#64b5f6",
  unselectedBorder: "#31343c",
  radioChecked: "#1976d2",
  radioUnchecked: "#31343c",
  timerNormal: "#90caf9",
  timerLow: "#ff5252"
};

const QuestionCard = ({
    questions,
    currentQuestion,
    setCurrentQuestion,
    userAnswers,
    handleAnswer,
    handlePrev,
    handleNext,
    handleSubmit,
    timerDisplay,
    submitting
}) => (
    <div style={{
        ...cardStyle,
        position: 'relative',
        minHeight: 320,
        boxShadow: '0 4px 24px rgba(25,118,210,0.19)',
        color: '#e3f2fd'
    }}>
        {/* Timer display */}
        <div style={{
            position: 'absolute',
            top: 10,
            right: 20,
            fontWeight: 700,
            color: timerDisplay.split(':')[0] < 1 ? darkTheme.timerLow : darkTheme.timerNormal,
            fontSize: '1.1rem',
            letterSpacing: 0.2
        }}>
            ⏰ {timerDisplay}
        </div>
        {/* Question number */}
        <div style={{ fontWeight: 700, marginBottom: 10, color: '#90caf9' }}>
            Q{currentQuestion + 1} of {questions.length}
        </div>
        {/* Question text */}
        <div style={{ marginBottom: 16, color: '#e3f2fd', fontWeight: 500 }}>
            {questions[currentQuestion].question}
        </div>
        {/* Options */}
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {questions[currentQuestion].options.map((option, idx) => (
                <li key={idx} style={{ marginBottom: 10 }}>
                    <label style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 8,
                        padding: '6px 10px',
                        background: userAnswers[questions[currentQuestion]._id] === idx
                            ? 'rgba(25, 118, 210, 0.08)'
                            : 'rgba(255,255,255,0.01)',
                        color: userAnswers[questions[currentQuestion]._id] === idx
                            ? darkTheme.attemptedText
                            : '#e3f2fd',
                        border: userAnswers[questions[currentQuestion]._id] === idx
                            ? `2px solid ${darkTheme.selectedBorder}`
                            : `1.5px solid ${darkTheme.unselectedBorder}`,
                        transition: 'all 0.15s'
                    }}>
                        <input
                            type="radio"
                            name={questions[currentQuestion]._id}
                            value={idx}
                            checked={userAnswers[questions[currentQuestion]._id] === idx}
                            onChange={() => handleAnswer(idx)}
                            style={{
                                marginRight: 10,
                                accentColor: darkTheme.radioChecked,
                                width: 18,
                                height: 18
                            }}
                        />
                        {option}
                    </label>
                </li>
            ))}
        </ul>
        {/* Attempted scale */}
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            margin: '24px 0 0 0',
            flexWrap: 'wrap'
        }}>
            {questions.map((q, idx) => {
                const isSelected = currentQuestion === idx;
                const isAttempted = userAnswers[q._id] !== undefined;
                return (
                    <button
                        key={q._id}
                        onClick={() => setCurrentQuestion(idx)}
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            border: isSelected
                                ? `2px solid ${darkTheme.selectedBorder}`
                                : `1.5px solid ${darkTheme.unselectedBorder}`,
                            background: isAttempted
                                ? darkTheme.attemptedBg
                                : darkTheme.notAttemptedBg,
                            color: isAttempted
                                ? darkTheme.attemptedText
                                : darkTheme.notAttemptedText,
                            fontWeight: 700,
                            cursor: 'pointer',
                            outline: isSelected
                                ? `2px solid ${darkTheme.selectedBorder}`
                                : 'none',
                            transition: 'all 0.15s',
                            margin: 2,
                            boxShadow: isSelected
                                ? '0 2px 8px rgba(25,118,210,0.12)'
                                : 'none'
                        }}
                        aria-label={`Go to question ${idx + 1} (${isAttempted ? 'attempted' : 'not attempted'})`}
                    >
                        {idx + 1}
                    </button>
                );
            })}
        </div>
        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
            <button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                style={{
                    ...buttonStyle,
                    background: currentQuestion === 0
                        ? '#374151'
                        : 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)',
                    color: currentQuestion === 0 ? '#b0bec5' : '#fff',
                    cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer'
                }}
            >
                Previous
            </button>
            {currentQuestion === questions.length - 1 ? (
                <button
                    onClick={handleSubmit}
                    style={{
                        ...buttonStyle,
                        background: submitting
                            ? '#374151'
                            : 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)',
                        color: submitting ? '#b0bec5' : '#fff',
                        cursor: submitting ? 'not-allowed' : 'pointer'
                    }}
                    disabled={submitting}
                >
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            ) : (
                <button
                    onClick={handleNext}
                    style={{
                        ...buttonStyle,
                        background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)',
                        color: '#fff'
                    }}
                >
                    Next
                </button>
            )}
        </div>
    </div>
);

export default QuestionCard;
