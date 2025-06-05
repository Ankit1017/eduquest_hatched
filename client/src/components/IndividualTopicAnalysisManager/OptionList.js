// OptionList.jsx
// Renders the list of options for a question, highlighting correct and selected options

import React from 'react';
import styles from './styles';

/**
 * @param {Array} options - Array of option strings
 * @param {number} correctIndex - Index of the correct option
 * @param {number} selectedIndex - Index of the user's selected option
 * @param {boolean} showSelection - Whether to highlight the user's selection
 */
const OptionList = ({ options, correctIndex, selectedIndex, showSelection }) => (
  <ul style={styles.optionList}>
    {options.map((opt, i) => {
      // Determine style and prefix for each option
      let style = { ...styles.optionItem };
      let prefix = '';
      if (i === correctIndex) {
        style = { ...style, ...styles.correct };
        prefix = '✔️ ';
      }
      if (showSelection && i === selectedIndex && i !== correctIndex) {
        style = { ...style, ...styles.incorrect };
        prefix = '❌ ';
      }
      return (
        <li key={i} style={style}>
          {prefix}{opt}
        </li>
      );
    })}
  </ul>
);

export default OptionList;
