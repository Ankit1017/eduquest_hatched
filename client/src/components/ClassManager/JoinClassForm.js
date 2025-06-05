import { useContext, useState } from 'react';
import { useClass } from '../../context/ClassContext';
import { TextField, Button, Box, Typography, Paper, Alert } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

const darkTheme = {
  background: '#0a1929',
  textPrimary: '#e3f2fd',
  textSecondary: '#90caf9',
  accent: '#64b5f6',
  cardBackground: '#132f4c',
  border: '1px solid rgba(100, 181, 246, 0.1)'
};

const JoinClassForm = () => {
  const { joinClass } = useClass();
  const { user } = useContext(AuthContext);
  const [enrollmentData, setEnrollmentData] = useState({
    classId: '',
    enrollmentCode: '',
    user: user
  });
  const [joinStatus, setJoinStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setJoinStatus(null);
    try {
      await joinClass(enrollmentData.classId, enrollmentData.enrollmentCode, enrollmentData.user);
      setJoinStatus('success');
      setEnrollmentData({ classId: '', enrollmentCode: '', user: user });
    } catch (error) {
      setJoinStatus('error');
      console.error(error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: darkTheme.background,
      color: darkTheme.textPrimary
    }}>
      <Box sx={{
        maxWidth: 500,
        margin: '40px auto',
        padding: '0 20px'
      }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            background: darkTheme.cardBackground,
            border: darkTheme.border
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: darkTheme.textPrimary,
              mb: 3
            }}
          >
            Join a Class
          </Typography>

          {joinStatus === 'success' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Successfully joined the class!
            </Alert>
          )}
          {joinStatus === 'error' && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Failed to join class. Please check the details and try again.
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Class ID"
              value={enrollmentData.classId}
              onChange={(e) => setEnrollmentData({
                ...enrollmentData,
                classId: e.target.value
              })}
              required
              margin="normal"
              fullWidth
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

            <TextField
              label="Enrollment Code"
              value={enrollmentData.enrollmentCode}
              onChange={(e) => setEnrollmentData({
                ...enrollmentData,
                enrollmentCode: e.target.value
              })}
              required
              margin="normal"
              fullWidth
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
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
              Join Class
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default JoinClassForm;
