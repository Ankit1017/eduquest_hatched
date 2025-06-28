import React from 'react';
import styles from './styles';

/**
 * @param {Array} tags - Array of topic/tag strings
 * @param {boolean} isMobile - Pass this if you want to adjust tag size for mobile
 */
const TagList = ({ tags, isMobile }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: isMobile ? '6px' : '10px',
      margin: '6px 0 0 0'
    }}
  >
    {tags.map((tag, i) => (
      <span style={styles.tag(isMobile)} key={i}>
        {tag}
      </span>
    ))}
  </div>
);

export default TagList;
