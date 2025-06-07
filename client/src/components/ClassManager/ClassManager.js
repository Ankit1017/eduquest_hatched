import { useContext, useState } from 'react';
import { ClassProvider } from '../../context/ClassContext';
import AllClassesPage from './AllClassesPage';
import CreateClassForm from './CreateClassForm';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  IconButton,
  Fab
} from '@mui/material';
import { Add, Class, ArrowBack } from '@mui/icons-material';
import { Navbar } from "../NavbarManager";
import { AuthContext } from "../../context/AuthContext";

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
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'create', 'classes'

  const renderDashboard = () => (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
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

      <Grid container spacing={3} justifyContent="center">
        {/* View All Classes Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              background: darkTheme.cardBackground,
              border: darkTheme.border,
              borderRadius: 3,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(100, 181, 246, 0.2)'
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Class sx={{ fontSize: 48, color: darkTheme.accent, mb: 2 }} />
              <Typography variant="h6" sx={{ color: darkTheme.textPrimary, mb: 1 }}>
                My Classes
              </Typography>
              <Typography variant="body2" sx={{ color: darkTheme.textSecondary }}>
                View and manage all your classes
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
              <Button
                variant="contained"
                onClick={() => setCurrentView('classes')}
                sx={{
                  background: darkTheme.accent,
                  '&:hover': { background: '#1976d2' }
                }}
              >
                View Classes
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Create Class Card - Only for teachers/admins */}
        {['teacher', 'admin'].includes(user?.role) && (
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                background: darkTheme.cardBackground,
                border: darkTheme.border,
                borderRadius: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(100, 181, 246, 0.2)'
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Add sx={{ fontSize: 48, color: '#4caf50', mb: 2 }} />
                <Typography variant="h6" sx={{ color: darkTheme.textPrimary, mb: 1 }}>
                  Create Class
                </Typography>
                <Typography variant="body2" sx={{ color: darkTheme.textSecondary }}>
                  Start a new class and invite students
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button
                  variant="contained"
                  onClick={() => setCurrentView('create')}
                  sx={{
                    background: '#4caf50',
                    '&:hover': { background: '#388e3c' }
                  }}
                >
                  Create Class
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );

  const renderHeader = () => {
    if (currentView === 'dashboard') return null;

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, px: 3 }}>
        <IconButton
          onClick={() => setCurrentView('dashboard')}
          sx={{
            color: darkTheme.accent,
            mr: 2,
            '&:hover': { background: 'rgba(100, 181, 246, 0.1)' }
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" sx={{ color: darkTheme.textPrimary }}>
          {currentView === 'create' && 'Create New Class'}
          {currentView === 'classes' && 'My Classes'}
        </Typography>
      </Box>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'create':
        return <CreateClassForm onSuccess={() => setCurrentView('classes')} />;
      case 'classes':
        return <AllClassesPage />;
      default:
        return renderDashboard();
    }
  };

  return (
    <ClassProvider>
      <Navbar />
      <Box
        sx={{
          minHeight: '100vh',
          background: darkTheme.background,
          color: darkTheme.textPrimary
        }}
      >
        {renderHeader()}
        {renderContent()}

        {/* Floating Action Button for quick class creation */}
        {currentView === 'classes' && ['teacher', 'admin'].includes(user?.role) && (
          <Fab
            color="primary"
            aria-label="create class"
            onClick={() => setCurrentView('create')}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              background: darkTheme.accent,
              '&:hover': { background: '#1976d2' }
            }}
          >
            <Add />
          </Fab>
        )}
      </Box>
    </ClassProvider>
  );
};

export default ClassManager;
