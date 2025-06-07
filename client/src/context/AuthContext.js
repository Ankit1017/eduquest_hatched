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
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user)
    const syncUser = async () => {
      if (user && isLoaded) {
        const role = 'user'; // define or extract user role
        const classList = []; // your logic here

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
                Authorization: `Bearer`, // Optional: pass Clerk token if needed
                'Content-Type': 'application/json'
              }
            }
          );

          console.log('Sync successful:', response.data);
          setAppUser(response.data.user);
          console.log(appUser)
          localStorage.setItem('user', JSON.stringify(response.data));
        } catch (err) {
          console.error('Sync failed:', err);
        }
      }
    };

    if (user) {
      syncUser();
    }
  }, [user, isLoaded]);

  const login = (data) => {
    setAppUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    navigate('/home')
  };

  const logout = async () => {
    await signOut();
    console.log(user)
    setAppUser(null);
    localStorage.removeItem('user');
    navigate('/')
  };

  return (
    <AuthContext.Provider value={{ user: appUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
