// src/components/class/ClassManager.js
import { useUser } from '@clerk/clerk-react';
import { ClassProvider } from '../../context/ClassContext';
import ClassList from './ClassList';
import CreateClassForm from './CreateClassForm';
import JoinClassForm from './JoinClassForm';
import { Box, Typography } from '@mui/material';
import {Navbar} from "../NavbarManager";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

const darkTheme = {
  background: '#0a1929',
  textPrimary: '#e3f2fd',
  textSecondary: '#90caf9',
  accent: '#64b5f6',
  cardBackground: '#132f4c',
  border: '1px solid rgba(100, 181, 246, 0.1)'
};

const ClassManager = () => {
  const { user } = useContext(AuthContext);

  return (
    <ClassProvider>
      <Navbar/>
      <Box
        sx={{
          minHeight: '100vh',
          background: darkTheme.background,
          color: darkTheme.textPrimary,
          p: 3
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: darkTheme.accent,
            fontWeight: 700,
            mb: 4,
            textAlign: 'center'
          }}
        >
          Class Management
        </Typography>


          {['teacher', 'admin'].includes(user?.role) && (
            <CreateClassForm />
          )}

          {user?.role === 'student' && (
            <JoinClassForm />
          )}
        </Box>
    </ClassProvider>
  );
};

export default ClassManager;
