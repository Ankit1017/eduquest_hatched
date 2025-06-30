// src/components/Navbar.jsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  useMediaQuery
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = ({ onSignIn, theme, isMobile }) => (
  <AppBar
    position="sticky"
    elevation={0}
    sx={{
      background: 'rgba(10, 25, 41, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: theme.border
    }}
  >
    <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{
          width: 40,
          height: 40,
          background: theme.accentGradient,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <SmartToyIcon sx={{ fontSize: 24, color: 'white' }} />
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            background: theme.accentGradient,
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Hatched
        </Typography>
      </Box>
      <Button
        variant="outlined"
        onClick={onSignIn}
        startIcon={!isMobile && <LoginIcon />}
        sx={{
          color: theme.accent,
          borderColor: theme.accent,
          px: { xs: 2, sm: 3 },
          py: 1,
          fontWeight: 600,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: { xs: '0.9rem', sm: '1rem' },
          '&:hover': {
            backgroundColor: theme.accent,
            color: 'white',
            transform: 'translateY(-1px)',
            boxShadow: theme.shadow
          },
          transition: 'all 0.3s ease'
        }}
      >
        Sign In
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
