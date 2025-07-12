/**
 * AuthContext.js
 * 
 * Provides global authentication state and utilities for the app.
 * Handles Clerk authentication, user data synchronization, caching, and sign-in/out.
 * 
 * Key Features:
 * - Loads and syncs user profile with backend
 * - Caches user data in localStorage for performance
 * - Exposes login and logout methods
 * - Handles loading and error states
 */

import React, { createContext, useEffect, useState, useCallback } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { host } from '../config';

export const AuthContext = createContext();

/**
 * AuthProvider component wraps the app and provides authentication context.
 */
export const AuthProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [appUser, setAppUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Syncs the authenticated Clerk user with the backend and caches the result.
   */
  const syncUser = useCallback(async () => {
    setLoading(true);
    const role = 'user';
    const classList = [];

    try {
      const response = await axios.post(
        `${host}/api/auth/sync-user`,
        {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
          role,
          classList
        },
        {
          headers: {
            Authorization: `Bearer`,
            'Content-Type': 'application/json'
          }
        }
      );
      setAppUser(response.data.user);
      // Cache the user data
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('currentUserId', user.id);
    } catch (err) {
      console.error('Sync failed:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  /**
   * Handles authentication and user profile loading on mount or Clerk state change.
   */
  useEffect(() => {
    const handleUserAuth = async () => {
      if (!isLoaded) {
        setLoading(true);
        return;
      }
      if (!user) {
        setAppUser(null);
        setLoading(false);
        return;
      }
      // Check localStorage for cached user data
      const storedUserData = localStorage.getItem('user');
      const storedUserId = localStorage.getItem('currentUserId');
      if (storedUserData && storedUserId === user.id) {
        try {
          const parsedUserData = JSON.parse(storedUserData);
          setAppUser(parsedUserData.user);
          setLoading(false);
          return;
        } catch (error) {
          localStorage.removeItem('user');
          localStorage.removeItem('currentUserId');
        }
      }
      // No valid cache, sync with server
      await syncUser();
    };

    handleUserAuth();
  }, [user, isLoaded, syncUser]);

  /**
   * Logs in a user and caches their data.
   * @param {object} data - The user data to set and cache.
   */
  const login = (data) => {
    setAppUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('currentUserId', data.user?.id || user?.id);
  };

  /**
   * Logs out the user, clears cache, and navigates to the home page.
   */
  const logout = async () => {
    try {
      await signOut();
      setAppUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('currentUserId');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user: appUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
