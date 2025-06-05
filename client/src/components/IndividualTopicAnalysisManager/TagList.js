// TagList.jsx
// Renders a list of topic tags for a question

import React from 'react';
import styles from './styles';

/**
 * @param {Array} tags - Array of topic/tag strings
 */
const TagList = ({ tags }) => (
  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
    {tags.map((tag, i) => (
      <li style={styles.tag} key={i}>{tag}</li>
    ))}
  </ul>
);

export default TagList;
