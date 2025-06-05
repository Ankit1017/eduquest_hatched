// AdminUserList.jsx
// Generic user list with admin action button

import React from 'react';
import styles from './AdminStyles';
import { UserIcon } from '@heroicons/react/24/outline';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

/**
 * Renders a list of users with an action button per user.
 * @param {Array} users - User objects (must have _id and username)
 * @param {function} onAction - Function(userId) to call when button is clicked
 * @param {string} processingId - User ID currently being processed
 * @param {string} actionText - Button text
 */
const AdminUserList = ({
  users,
  onAction,
  processingId,
  actionText = "Make Admin"
}) => (
  <div style={{ marginTop: '16px' }}>
    {users.map((user) => (
      <div
        key={user._id}
        style={styles.listItem}
        // Optionally, you can add hover effect with onMouseEnter/onMouseLeave
        onClick={() => !processingId && onAction(user._id)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <UserIcon width={20} height={20} style={{ color: '#6c757d' }} />
          <span style={{ fontWeight: 500 }}>{user.username}</span>
        </div>
        <button
          style={{
            ...styles.button,
            ...(processingId === user._id ? styles.buttonDisabled : {})
          }}
          disabled={processingId === user._id}
        >
          {processingId === user._id ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status"></span>
              Processing...
            </>
          ) : (
            <>
              <ShieldCheckIcon width={16} height={16} />
              {actionText}
            </>
          )}
        </button>
      </div>
    ))}
  </div>
);

export default AdminUserList;
