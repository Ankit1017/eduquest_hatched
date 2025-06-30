// src/components/TabPanel.jsx
import React from 'react';
import { Box, Fade } from '@mui/material';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Fade in={value === index} timeout={500}>
          <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            {children}
          </Box>
        </Fade>
      )}
    </div>
  );
}

export default TabPanel;
