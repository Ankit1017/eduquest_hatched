import { useContext, useState } from 'react';
import { useClass } from '../../context/ClassContext';
import { Button, TextField, Grid, Paper, Typography, Box, Alert } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

const darkTheme = {
  background: '#0a1929',
  textPrimary: '#e3f2fd',
  textSecondary: '#90caf9',
  accent: '#64b5f6',
  cardBackground: '#132f4c',
  border: '1px solid rgba(100, 181, 246, 0.1)'
};

const CreateClassForm = () => {
  const { createClass } = useClass();
  const { user } = useContext(AuthContext);

  const generateRandomId = (length = 8) => {
    return Math.random().toString(36).substr(2, length);
  };

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subject: 'math',
    enrollmentCode: '',
    schedule: { days: [], time: '' },
    classId: generateRandomId(),
    user: user,
    status: 'active'
  });

  const [createdStatus, setCreatedStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdClass = await createClass(formData);
      setCreatedStatus(createdClass.status || 'active');
      setFormData({
        name: '',
        description: '',
        subject: 'math',
        enrollmentCode: '',
        schedule: { days: [], time: '' },
        classId: generateRandomId(),
        user: user,
        status: 'active'
      });
    } catch (error) {
      setCreatedStatus('error');
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '10vh',
        background: darkTheme.background,
        color: darkTheme.textPrimary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          background: darkTheme.cardBackground,
          border: darkTheme.border,
          minWidth: { xs: 320, sm: 400 },
          maxWidth: 500,
          width: '100%'
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: darkTheme.accent,
            mb: 3
          }}
        >
          Create New Class
        </Typography>

        {createdStatus === 'active' && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Class created successfully! Status: <b>Active</b>
          </Alert>
        )}
        {createdStatus === 'error' && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to create class. Please try again.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Class Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: darkTheme.background,
                    color: darkTheme.textPrimary,
                    '& fieldset': {
                      borderColor: darkTheme.accent
                    },
                    '&:hover fieldset': {
                      borderColor: darkTheme.textSecondary
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: darkTheme.accent
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: darkTheme.textSecondary,
                    '&.Mui-focused': {
                      color: darkTheme.accent
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enrollment Code"
                value={formData.enrollmentCode}
                onChange={(e) => setFormData({ ...formData, enrollmentCode: e.target.value })}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: darkTheme.background,
                    color: darkTheme.textPrimary,
                    '& fieldset': {
                      borderColor: darkTheme.accent
                    },
                    '&:hover fieldset': {
                      borderColor: darkTheme.textSecondary
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: darkTheme.accent
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: darkTheme.textSecondary,
                    '&.Mui-focused': {
                      color: darkTheme.accent
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  background: darkTheme.accent,
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  '&:hover': {
                    background: '#1976d2',
                    transform: 'scale(1.02)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Create Class
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateClassForm;
