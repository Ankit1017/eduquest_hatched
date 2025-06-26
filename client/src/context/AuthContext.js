import React, { createContext, useEffect, useState } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import axios from 'axios';
import { host } from '../config';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [appUser, setAppUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserAuth = async () => {
      if (!isLoaded) {
        setLoading(true);
        return;
      }

      if (!user) {
        // User logged out
        setAppUser(null);
        setLoading(false);
        return;
      }

      // Check localStorage first
      const storedUserData = localStorage.getItem('user');
      const storedUserId = localStorage.getItem('currentUserId');

      // If we have stored data for the same user, use it
      if (storedUserData && storedUserId === user.id) {
        try {
          const parsedUserData = JSON.parse(storedUserData);
          console.log('Using cached user data');
          setAppUser(parsedUserData.user);
          setLoading(false);
          return;
        } catch (error) {
          console.error('Error parsing stored user:', error);
          // Clear corrupted data and continue to sync
          localStorage.removeItem('user');
          localStorage.removeItem('currentUserId');
        }
      }

      // New user or no cached data - sync with server
      await syncUser();
    };

    const syncUser = async () => {
      setLoading(true);
      const role = 'user';
      const classList = [];

      try {
        console.log('Syncing new user with server...');
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

        console.log('Sync successful:', response.data);
        setAppUser(response.data.user);

        // Cache the user data
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('currentUserId', user.id);

      } catch (err) {
        console.error('Sync failed:', err);
      } finally {
        setLoading(false);
      }
    };

    handleUserAuth();
  }, [user, isLoaded]);

  const login = (data) => {
    setAppUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('currentUserId', data.user?.id || user?.id);
  };

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
