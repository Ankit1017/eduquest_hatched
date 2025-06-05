// src/context/ClassContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { host } from '../config';
const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const { getToken } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await axios.get(`${host}/api/classes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClasses(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch classes');
    } finally {
      setLoading(false);
    }
  };

  const createClass = async (classData) => {
    try {
      const token = await getToken();
      const response = await axios.post(`${host}/api/classes`, classData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClasses(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Class creation failed');
      throw err;
    }
  };

  const joinClass = async (classId, enrollmentCode,user) => {
    try {
      const token = await getToken();
      const data= {
        "enrollmentCode":enrollmentCode,
        "user":user
      }
      const response = await axios.post(`${host}/api/classes/${classId}/join`,
        { data},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchClasses();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Enrollment failed');
      throw err;
    }
  };

  return (
    <ClassContext.Provider value={{
      classes,
      loading,
      error,
      fetchClasses,
      createClass,
      joinClass
    }}>
      {children}
    </ClassContext.Provider>
  );
};

export const useClass = () => useContext(ClassContext);
