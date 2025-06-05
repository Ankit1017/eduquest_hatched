import { useEffect } from 'react';
import { useClass } from '../../context/ClassContext';
import { List, ListItem, ListItemText, Typography, CircularProgress, Box, Paper } from '@mui/material';
import ClassDetail from './ClassDetail';

const darkTheme = {
  background: '#0a1929',
  textPrimary: '#e3f2fd',
  cardBackground: '#132f4c',
  accent: '#64b5f6'
};

const ClassList = () => {
  const { classes, loading, error, fetchClasses } = useClass();

  useEffect(() => {
    fetchClasses();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress sx={{ color: darkTheme.accent }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={6}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, margin: '40px auto', px: 2 }}>
      <Paper
        elevation={3}
        sx={{
          background: darkTheme.cardBackground,
          color: darkTheme.textPrimary,
          p: 3,
          borderRadius: 3
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: darkTheme.accent, fontWeight: 600 }}>
          Your Classes
        </Typography>
        {classes.length === 0 ? (
          <Typography sx={{ mt: 2, color: darkTheme.textPrimary }}>
            You are not enrolled in any classes yet.
          </Typography>
        ) : (
          <List>
            {classes.map(cls => (
              <ListItem key={cls._id} divider sx={{ background: darkTheme.background }}>
                <ListItemText
                  primary={cls.name}
                  secondary={`Subject: ${cls.subject} | Status: ${cls.status}`}
                  primaryTypographyProps={{ sx: { color: darkTheme.textPrimary, fontWeight: 500 } }}
                  secondaryTypographyProps={{ sx: { color: darkTheme.accent } }}
                />
                {/* Pass a key if ClassDetail renders a list */}
                <ClassDetail classId={cls._id} key={cls._id + '-detail'} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default ClassList;
