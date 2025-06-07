import { useContext, useState } from 'react';
import { useClass } from '../../context/ClassContext';
import { Button, TextField, Grid, Paper, Typography, Box, Alert, Modal, Snackbar } from '@mui/material';

import { AuthContext } from '../../context/AuthContext';
import {current_host} from "../../config";

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

  const generateEnrollmentCode = (length = 8) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      return Array.from({ length }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join('');
    };

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subject: '',
    enrollmentCode: generateEnrollmentCode(),
    schedule: { days: [], time: '' },
    classId: generateRandomId(),
    user: user,
    status: 'active'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      subject: '',
      enrollmentCode: '',
      schedule: { days: [], time: '' },
      classId: generateRandomId(),
      user: user,
      status: 'active'
    })
  }

  const [createdStatus, setCreatedStatus] = useState(null);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [classLink, setClassLink] = useState('');
  const [copied, setCopied] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const createdClass = await createClass(formData);
      setClassLink(`${current_host}join/${formData.classId}`);
      setCreatedStatus(createdClass.status || 'active');
      setFormData({
        name: '',
        description: '',
        subject: '',
        enrollmentCode: '',
        schedule: { days: [], time: '' },
        classId: generateRandomId(),
        user: user,
        status: 'active'
      });
      setLinkModalOpen(true);
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
                label="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
            {/* <Grid item xs={12}>
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
            </Grid> */}
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
        <Modal open={linkModalOpen} onClose={() => {
          setLinkModalOpen(false)
          setClassLink('');
          resetForm();
        }}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: darkTheme.cardBackground,
              border: `2px solid ${darkTheme.accent}`,
              borderRadius: 3,
              boxShadow: 24,
              p: 4,
              color: darkTheme.textPrimary,
              minWidth: 300,
              maxWidth: 400
            }}
          >
            <Typography variant="h6" gutterBottom>
              Share Class Link
            </Typography>

            <Typography sx={{ mb: 2, wordBreak: 'break-all' }}>
              Class link: {classLink}
            </Typography>

            <Button
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onClick={() => {
                navigator.clipboard.writeText(classLink);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}

            >
              Copy Joining Code
            </Button>

            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setLinkModalOpen(false)
                setClassLink('');
                resetForm();
              }}
              sx={{
                background: darkTheme.accent,
                '&:hover': {
                  background: '#1976d2'
                }
              }}
            >
              Close
            </Button>
          </Box>
        </Modal>
        {copied && (
          <Snackbar open={copied} autoHideDuration={2000}>
            <Alert severity="success">Link copied!</Alert>
          </Snackbar>
        )}


      </Paper>
    </Box>
  );
};

export default CreateClassForm;
