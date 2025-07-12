/**
 * ClassContext.js
 *
 * Provides global class management state and utilities for the app.
 * Handles fetching, creation, and joining of classes using the unified API utilities.
 * Integrates Clerk authentication for secure API calls.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useClassApi } from '../api'; // Adjust the path if needed

const ClassContext = createContext();

/**
 * ClassProvider
 * Wraps children with class management context.
 * Exposes:
 *   - classes: Array of user's classes
 *   - loading: Boolean loading state
 *   - error: Error message (if any)
 *   - fetchClasses: Fetches all classes for a user
 *   - createClass: Creates a new class
 *   - joinClass: Joins an existing class
 */
export const ClassProvider = ({ children }) => {
  const { getToken } = useAuth();
  const { fetchClasses, createClass, joinClass } = useClassApi();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches all classes for a given user.
   * @param {string} userId - The user's unique ID.
   */
  const handleFetchClasses = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const data = await fetchClasses(userId, token);
      setClasses(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch classes');
    } finally {
      setLoading(false);
    }
  }, [fetchClasses, getToken]);

  /**
   * Creates a new class.
   * @param {object} classData - The class data to create.
   * @returns {object} The created class data.
   */
  const handleCreateClass = async (classData) => {
    setError(null);
    try {
      const token = await getToken();
      const data = await createClass(classData, token);
      setClasses(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || 'Class creation failed');
      throw err;
    }
  };

  /**
   * Joins an existing class.
   * @param {string} classId - The class ID to join.
   * @param {object} user - The user object.
   * @returns {object} The join result.
   */
  const handleJoinClass = async (classId, user) => {
    setError(null);
    try {
      const token = await getToken();
      const data = await joinClass(classId, user, token);
      await handleFetchClasses(user._id);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || 'Enrollment failed');
      throw err;
    }
  };

  return (
    <ClassContext.Provider
      value={{
        classes,
        loading,
        error,
        fetchClasses: handleFetchClasses,
        createClass: handleCreateClass,
        joinClass: handleJoinClass,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

/**
 * useClass
 * Custom hook to access class context.
 * @returns {object} Class context value.
 */
export const useClass = () => useContext(ClassContext);
