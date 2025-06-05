// OptionInput.jsx
// Reusable input for question options

import React from 'react';
import styles from './QuestionFormStyles';

/**
 * OptionInput
 * @param {number} index - Option index (0-based)
 * @param {string} value - Current value
 * @param {function} onChange - Handler for value change
 */
const OptionInput = ({ index, value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={e => onChange(index, e.target.value)}
    placeholder={`Option ${index + 1}`}
    required
    style={styles.input}
    aria-label={`Option ${index + 1}`}
    autoComplete="off"
  />
);

export default OptionInput;
