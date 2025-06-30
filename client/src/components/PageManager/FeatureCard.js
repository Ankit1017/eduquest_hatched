// src/components/FeatureCard.jsx
import React from 'react';
import { Card, CardContent, Box, Typography, useTheme } from '@mui/material';

const FeatureCard = ({ icon: Icon, title, description, theme }) => {
  const muiTheme = useTheme();
  return (
    <Card sx={{
      background: 'rgba(255, 255, 255, 0.05)',
      border: theme.border,
      height: '100%',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme.hoverShadow,
        background: 'rgba(255, 255, 255, 0.08)'
      }
    }}>
      <CardContent sx={{
        textAlign: 'center',
        p: { xs: 1.5, sm: 2, md: 3 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <Box sx={{
          width: { xs: 50, sm: 60 },
          height: { xs: 50, sm: 60 },
          background: theme.accentGradient,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 2
        }}>
          <Icon sx={{ fontSize: { xs: 24, sm: 30 }, color: 'white' }} />
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: theme.textPrimary,
            mb: 2,
            fontWeight: 600,
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.textSecondary,
            lineHeight: 1.6,
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
