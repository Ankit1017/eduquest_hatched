// src/components/HeroSection.jsx
import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const HeroSection = ({ theme, isMobile, isTablet }) => (
  <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 6, md: 8 } }}>
    <Typography
      variant={isMobile ? "h3" : isTablet ? "h2" : "h1"}
      component="h1"
      sx={{
        background: theme.accentGradient,
        backgroundClip: 'text',
        textFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 800,
        mb: 2,
        letterSpacing: '-0.02em'
      }}
    >
      Welcome to Hatched
    </Typography>
    <Typography
      variant={isMobile ? "h6" : "h5"}
      sx={{
        color: theme.textSecondary,
        fontWeight: 300,
        mb: 4,
        maxWidth: 600,
        mx: 'auto',
        lineHeight: 1.6
      }}
    >
      Your AI-Powered Test Performance Platform
    </Typography>
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      gap: 2,
      flexWrap: 'wrap',
      mb: 4
    }}>
      <Chip
        label="AI-Powered"
        sx={{
          background: theme.accentGradient,
          color: 'white',
          fontWeight: 600,
          px: 1
        }}
      />
      <Chip
        label="Personalized Learning"
        sx={{
          background: theme.cardBackground,
          color: theme.textPrimary,
          border: theme.border,
          fontWeight: 600
        }}
      />
      <Chip
        label="Performance Tracking"
        sx={{
          background: theme.cardBackground,
          color: theme.textPrimary,
          border: theme.border,
          fontWeight: 600
        }}
      />
    </Box>
  </Box>
);

export default HeroSection;
