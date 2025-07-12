/**
 * ApiContext.js
 *
 * Provides a global API utility context for the app.
 * Handles GET/POST requests, in-memory caching, and cache management.
 * Centralizes API logic for maintainability and reusability.
 */

import React, { createContext, useContext, useRef } from 'react';
import axios from 'axios';

const ApiContext = createContext();

/**
 * ApiProvider
 * Wraps children with API context, providing GET/POST utilities and cache management.
 *
 * Props:
 *   - host: Base API host URL.
 *   - children: React children.
 */
export const ApiProvider = ({ host, children }) => {
  // In-memory cache for GET requests
  const cacheRef = useRef({});

  /**
   * Creates a unique cache key based on endpoint and params.
   * @param {string} endpoint - API endpoint.
   * @param {object} params - Query parameters.
   * @returns {string} Cache key.
   */
  const getCacheKey = (endpoint, params = {}) => {
    const paramString = Object.entries(params)
      .sort()
      .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
      .join('&');
    return `${endpoint}?${paramString}`;
  };

  /**
   * Generic GET request with optional caching.
   * @param {string} endpoint - API endpoint.
   * @param {object} params - Query parameters.
   * @param {object} options - { useCache: boolean }
   * @returns {Promise<any>} API response data.
   */
  const get = async (endpoint, params = {}, { useCache = true } = {}) => {
    const cacheKey = getCacheKey(endpoint, params);

    // Return cached data if available and allowed
    if (useCache && cacheRef.current[cacheKey]) {
      return cacheRef.current[cacheKey];
    }

    // Build full URL with query string
    let url = `${host}${endpoint}`;
    if (Object.keys(params).length) {
      const query = new URLSearchParams(params).toString();
      url += `?${query}`;
    }

    // Fetch from API
    const { data } = await axios.get(url);
    if (useCache) cacheRef.current[cacheKey] = data;
    return data;
  };

  /**
   * Generic POST request.
   * @param {string} endpoint - API endpoint.
   * @param {object} body - POST body.
   * @param {object} config - Axios config.
   * @returns {Promise<any>} API response data.
   */
  const post = async (endpoint, body = {}, config = {}) => {
    const url = `${host}${endpoint}`;
    const { data } = await axios.post(url, body, config);
    return data;
  };

  /**
   * Clears the in-memory cache (e.g., on logout).
   */
  const clearCache = () => {
    cacheRef.current = {};
  };

  return (
    <ApiContext.Provider value={{ get, post, clearCache }}>
      {children}
    </ApiContext.Provider>
  );
};

/**
 * useApi
 * Custom hook to access API utilities.
 * @returns {object} { get, post, clearCache }
 */
export const useApi = () => useContext(ApiContext);
