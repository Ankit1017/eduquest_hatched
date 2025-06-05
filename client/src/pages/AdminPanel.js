import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import MakeAdmin from '../components/AdminManager/MakeAdmin';
import { Navbar } from '../components/NavbarManager';
import { useNavigate } from 'react-router-dom';
import QuestionList from "../components/QuestionList";
import {host} from "../config";
// Centralized dark theme palette
const darkTheme = {
  background: '#101a28',
  card: '#181b22',
  accent: '#64b5f6',
  textPrimary: '#e3f2fd',
  border: '1.5px solid #23272f'
};

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${host}/api/admin/get-allusers`);
      const arr = Object.values(response.data.data);
      console.log(response)
      setData(arr.length === 0 ? [{ _id: null, username: "no user to make admin" }] : arr);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Redirect non-admins
    if (!user || user.isAdmin === false) {
      navigate('/');
    } else {
      fetchUsers();
    }
    // eslint-disable-next-line
  }, [user, navigate]);

  return (
    <div style={{
      background: darkTheme.background,
      minHeight: '60vh',
      color: darkTheme.textPrimary
    }}>
      {/* Fixed Navbar at top */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        zIndex: 1200,
        background: darkTheme.background,
        boxShadow: '0 2px 14px rgba(25,118,210,0.12)'
      }}>
        <Navbar theme={darkTheme} />
      </div>

      {/* Main content below Navbar */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '60vh',
        paddingTop: 96 // Height of navbar + extra spacing
      }}>
        <div style={{
          background: darkTheme.card,
          border: darkTheme.border,
          borderRadius: 18,
          boxShadow: '0 8px 32px rgba(25,118,210,0.18)',
          padding: '36px 32px',
          maxWidth: 540,
          width: '100%',
          height: '70vh',
          marginBottom: 40,
        }}>
          <h1 style={{
            color: darkTheme.accent,
            fontWeight: 700,
            letterSpacing: 1,
            margin: '0 0 28px 0',
            textAlign: 'center'
          }}>
            Admin Panel
          </h1>
          <h2 style={{
            color: darkTheme.textPrimary,
            fontWeight: 500,
            fontSize: '1.25rem',
            textAlign: 'center',
            marginBottom: 36
          }}>
            Welcome, {user?.username}
          </h2>
          <MakeAdmin data={data} fetchUsers={fetchUsers} theme={darkTheme} />
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <button
              onClick={() => setShowQuestions(q => !q)}
              style={{
                marginTop: 32,
                padding: '12px 32px',
                backgroundColor: darkTheme.accent,
                color: darkTheme.textPrimary,
                border: 'none',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(100,181,246,0.08)',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#539be5'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = darkTheme.accent}
              aria-expanded={showQuestions}
              aria-controls="question-list-container"
            >
              {showQuestions ? 'Hide All Questions' : 'Show All Questions'}
            </button>
          </div>
        </div>
        {showQuestions && (
          <div
            id="question-list-container"
            style={{
              background: darkTheme.card,
              border: darkTheme.border,
              borderRadius: 18,
              boxShadow: '0 8px 32px rgba(25,118,210,0.18)',
              padding: 32,
              maxWidth: 900,
              width: '100%',
              marginBottom: 40,
              maxHeight: '60vh',
              overflowY: 'auto'
            }}
          >
            <QuestionList />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
