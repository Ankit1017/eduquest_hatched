// src/pages/NewUserHomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Tabs,
  Tab,
  Paper,
  Slide,
  useMediaQuery,
  useTheme,
  Typography,
  Button
} from '@mui/material';
import {TabPanel,Navbar,HeroSection,FeatureCard} from '../components/PageManager';
import { availableTopics } from '../components/PageManager/topics';

import { TrendingUpIcon, SmartToyIcon, QuizIcon, TopicIcon, CheckCircleIcon, ArrowForwardIcon } from '../icons';


const darkTheme = {
  background: '#0a1929',
  textPrimary: '#e3f2fd',
  textSecondary: '#90caf9',
  accent: '#64b5f6',
  cardBackground: '#132f4c',
  border: '1px solid rgba(100, 181, 246, 0.1)',
  // Enhanced theme properties
  accentGradient: 'linear-gradient(45deg, #64b5f6 30%, #42a5f5 70%, #2196f3 90%)',
  shadow: '0 8px 32px rgba(100, 181, 246, 0.1)',
  hoverShadow: '0 12px 40px rgba(100, 181, 246, 0.2)'
};

const NewUserHomePage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 960px)');

  const handleTabChange = (event, newValue) => setTabValue(newValue);
  const handleTopicSelect = (topic) => setSelectedTopic(topic);
  const handleStartTest = () => selectedTopic ? navigate('/question-paper') : alert('Please select a topic first!');
  const handleSignIn = () => navigate('/home');

  return (
    <Box sx={{ background: darkTheme.background, minHeight: '100vh', color: darkTheme.textPrimary }}>
      <Navbar onSignIn={handleSignIn} theme={darkTheme} isMobile={isMobile} />
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5, md: 7 } }}>
        <HeroSection theme={darkTheme} isMobile={isMobile} isTablet={isTablet} />
        <Slide direction="up" in timeout={1000}>
          <Paper sx={{
            background: darkTheme.cardBackground,
            border: darkTheme.border,
            borderRadius: { xs: 2, sm: 3 },
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            boxShadow: darkTheme.shadow
          }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant={isMobile ? "fullWidth" : "centered"}
              sx={{
                borderBottom: `1px solid ${darkTheme.border}`,
                '& .MuiTab-root': {
                  color: darkTheme.textSecondary,
                  fontWeight: 600,
                  py: { xs: 2, sm: 3 },
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  '&.Mui-selected': { color: darkTheme.accent, fontWeight: 700 }
                },
                '& .MuiTabs-indicator': { height: 3, background: darkTheme.accentGradient }
              }}
            >
              <Tab label="About Hatched" />
              <Tab label="How It Works" />
              <Tab label="Get Started" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
                <Box sx={{
                  width: { xs: 60, sm: 80 },
                  height: { xs: 60, sm: 80 },
                  background: darkTheme.accentGradient,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3
                }}>
                  <SmartToyIcon sx={{ fontSize: { xs: 30, sm: 40 }, color: 'white' }} />
                </Box>
                <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: darkTheme.textPrimary, mb: 3, fontWeight: 700 }}>
                  About Hatched Platform
                </Typography>
                <Typography variant="body1" sx={{ color: darkTheme.textSecondary, lineHeight: 1.8, fontSize: { xs: '1rem', sm: '1.1rem' }, maxWidth: 800, mx: 'auto' }}>
                  Hatched is an innovative test preparation platform designed to revolutionize how you improve your academic performance.
                  Our platform combines intelligent testing with AI-powered analysis to create a personalized learning experience that adapts to your unique needs.
                </Typography>
              </Box>
              {/* Feature Cards Grid */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, sm: 3, md: 4 }, justifyContent: 'center' }}>
                {[
                  { icon: TrendingUpIcon, title: "Performance Tracking", description: "Monitor your progress with detailed analytics and performance insights" },
                  { icon: SmartToyIcon, title: "AI-Powered Analysis", description: "Our AI agent analyzes your mistakes and creates personalized improvement strategies" },
                  { icon: QuizIcon, title: "Smart Testing", description: "Take tests across multiple subjects with intelligent question selection" }
                ].map((feature, index) => (
                  <FeatureCard key={index} {...feature} theme={darkTheme} />
                ))}
              </Box>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              {/* ...How It Works Tab (similar pattern as above) */}
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 5 } }}>
                <Box sx={{
                  width: { xs: 60, sm: 80 },
                  height: { xs: 60, sm: 80 },
                  background: darkTheme.accentGradient,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3
                }}>
                  <TopicIcon sx={{ fontSize: { xs: 30, sm: 40 }, color: 'white' }} />
                </Box>
                <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: darkTheme.textPrimary, mb: 3, fontWeight: 700 }}>
                  Choose Your First Topic
                </Typography>
                <Typography variant="body1" sx={{ color: darkTheme.textSecondary, fontSize: { xs: '1rem', sm: '1.1rem' }, maxWidth: 600, mx: 'auto' }}>
                  Select a subject to begin your personalized learning journey with Hatched
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, sm: 3 }, justifyContent: 'center', mb: 4 }}>
                {availableTopics.map((topic, index) => (
                  <Box key={topic.name} sx={{ width: { xs: '100%', sm: '48%', md: '30%', lg: '23%' } }}>
                    <Paper
                      elevation={0}
                      sx={{
                        background: selectedTopic === topic.name ? darkTheme.accentGradient : 'rgba(255, 255, 255, 0.05)',
                        border: selectedTopic === topic.name ? `2px solid ${darkTheme.accent}` : darkTheme.border,
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        height: '100%',
                        '&:hover': {
                          transform: 'translateY(-6px) scale(1.02)',
                          boxShadow: darkTheme.hoverShadow,
                          background: selectedTopic === topic.name ? darkTheme.accentGradient : 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                      onClick={() => handleTopicSelect(topic.name)}
                    >
                      <Box sx={{ textAlign: 'center', p: { xs: 2, sm: 3 }, height: '100%' }}>
                        <Typography sx={{ fontSize: { xs: '2rem', sm: '2.5rem' }, mb: 2 }}>
                          {topic.icon}
                        </Typography>
                        <Typography variant="h6" sx={{ color: selectedTopic === topic.name ? 'white' : darkTheme.textPrimary, fontWeight: 700, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                          {topic.name}
                        </Typography>
                        {selectedTopic === topic.name && (
                          <CheckCircleIcon sx={{ color: 'white', mt: 1, fontSize: { xs: 20, sm: 24 } }} />
                        )}
                      </Box>
                    </Paper>
                  </Box>
                ))}
              </Box>
              {selectedTopic && (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ color: darkTheme.textPrimary, mb: 3, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                    Selected Topic: <span style={{
                      background: darkTheme.accentGradient,
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: 700
                    }}>
                      {selectedTopic}
                    </span>
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleStartTest}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: { xs: 4, sm: 6 },
                      py: { xs: 1.5, sm: 2 },
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      background: darkTheme.accentGradient,
                      fontWeight: 700,
                      borderRadius: 3,
                      textTransform: 'none',
                      boxShadow: darkTheme.shadow,
                      '&:hover': {
                        transform: 'translateY(-2px) scale(1.05)',
                        boxShadow: darkTheme.hoverShadow
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    Start Your First Test
                  </Button>
                </Box>
              )}
            </TabPanel>
          </Paper>
        </Slide>
      </Container>
    </Box>
  );
};

export default NewUserHomePage;
