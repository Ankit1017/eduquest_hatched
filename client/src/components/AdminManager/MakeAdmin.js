// MakeAdmin.jsx
// Main admin manager component for promoting users to admin with dark theme

import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import styles from './AdminStyles';
import AdminUserList from './AdminUserList';
import { ShieldCheckIcon as ShieldCheckSolid } from '@heroicons/react/24/solid';
import { UserIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import {host} from '../../config'

// Dark theme palette
const darkTheme = {
  cardBg: "#181b22",
  accent: "#90caf9",
  success: "#43a047",
  error: "#f44336",
  warning: "#ff9800",
  adminBadge: "#1976d2",
  textPrimary: "#e3f2fd",
  textSecondary: "#b0bec5"
};

/**
 * MakeAdmin component
 * @param {Array} data - Array of user objects
 * @param {function} fetchUsers - Function to refresh the user list
 */
const MakeAdmin = ({ data, fetchUsers }) => {
  const [processingId, setProcessingId] = React.useState(null);

  // Separate admins from regular users
  const currentAdmins = data.filter(user => user.isAdmin);
  const regularUsers = data.filter(user => !user.isAdmin);

  // Handle the admin promotion API request
  const makeAdminRequest = async (user_id) => {
    if (!user_id) {
      toast.error("No user selected");
      return;
    }
    setProcessingId(user_id);
    try {
      const response = await axios.patch(`${host}/api/admin/add-admin`, {
        user_id: user_id,
      });
      toast.success(response.data.message, {
        duration: 4000,
        style: {
          background: darkTheme.cardBg,
          color: darkTheme.success,
          border: `1px solid ${darkTheme.success}`,
          borderRadius: '12px'
        }
      });
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed", {
        style: {
          background: darkTheme.cardBg,
          color: darkTheme.error,
          border: `1px solid ${darkTheme.error}`,
          borderRadius: '12px'
        }
      });
    }
    setProcessingId(null);
  };

  // Handle admin removal (optional)
  const removeAdminRequest = async (user_id) => {
    if (!user_id) {
      toast.error("No user selected");
      return;
    }
    setProcessingId(user_id);
    try {
      const response = await axios.patch("${host}/api/admin/remove-admin", {
        user_id: user_id,
      });
      toast.success(response.data.message, {
        duration: 4000,
        style: {
          background: darkTheme.cardBg,
          color: darkTheme.warning,
          border: `1px solid ${darkTheme.warning}`,
          borderRadius: '12px'
        }
      });
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed", {
        style: {
          background: darkTheme.cardBg,
          color: darkTheme.error,
          border: `1px solid ${darkTheme.error}`,
          borderRadius: '12px'
        }
      });
    }
    setProcessingId(null);
  };

  return (
    <div style={{
      padding: '24px',
      background: darkTheme.cardBg,
      color: darkTheme.textPrimary
    }}>
      {/* Current Admins Section */}
      {currentAdmins.length > 0 && (
        <div style={{ ...styles.card, marginBottom: '32px' }}>
          <h3 style={{
            ...styles.cardHeader,
            color: darkTheme.accent,
            borderBottom: `2px solid ${darkTheme.adminBadge}`,
            paddingBottom: '12px'
          }}>
            <ShieldCheckSolid width={24} height={24} />
            Current Admins ({currentAdmins.length})
          </h3>
          <div style={{ marginTop: '16px' }}>
            {currentAdmins.map((admin) => (
              <div
                key={admin._id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  margin: '10px 0',
                  background: `linear-gradient(90deg, ${darkTheme.cardBg} 60%, rgba(25, 118, 210, 0.08) 100%)`,
                  borderRadius: '10px',
                  border: `2px solid ${darkTheme.adminBadge}`,
                  color: darkTheme.textPrimary
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <ShieldCheckSolid width={20} height={20} style={{ color: darkTheme.adminBadge }} />
                  <span style={{ fontWeight: 600 }}>{admin.username}</span>
                  <span style={{
                    background: darkTheme.adminBadge,
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}>ADMIN</span>
                </div>
                <button
                  style={{
                    background: 'transparent',
                    color: darkTheme.warning,
                    border: `1px solid ${darkTheme.warning}`,
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '0.85rem',
                    cursor: processingId === admin._id ? 'not-allowed' : 'pointer',
                    opacity: processingId === admin._id ? 0.6 : 1,
                    transition: 'all 0.2s'
                  }}
                  onClick={() => removeAdminRequest(admin._id)}
                  disabled={processingId === admin._id}
                >
                  {processingId === admin._id ? 'Processing...' : 'Remove Admin'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Users Section */}
      <div style={styles.card}>
        <h3 style={{
          ...styles.cardHeader,
          color: darkTheme.accent
        }}>
          <UserIcon width={24} height={24} />
          Promote to Admin ({regularUsers.length} users)
        </h3>
        {regularUsers.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '32px',
            color: darkTheme.textSecondary
          }}>
            <ShieldExclamationIcon width={48} height={48} style={{ margin: '0 auto 16px' }} />
            <p>All users are already admins!</p>
          </div>
        ) : (
          <AdminUserList
            users={regularUsers}
            onAction={makeAdminRequest}
            processingId={processingId}
            actionText="Make Admin"
          />
        )}
      </div>

      {/* Toast notifications with dark theme */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '12px',
            fontSize: '0.9rem',
            fontWeight: 500
          }
        }}
      />
    </div>
  );
};

export default MakeAdmin;
