/**
 * Home.jsx
 * 
 * This component serves as the main dashboard for logged-in users.
 * It displays user performance analytics, individual topic analysis, and past test attempts.
 * The UI adapts responsively and provides onboarding for new users.
 * 
 * Key Features:
 * - Performance and topic analytics
 * - Past attempts history
 * - Onboarding for new users
 * - Responsive design and theming
 */

import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  useMediaQuery,
  Container,
  Tabs,
  Tab,
  Paper,
  Slide,
  Grid,
  Fade,
  Card,
  CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { HeroSection, TabPanel } from '../components/PageManager';
import { Navbar } from '../components/NavbarManager';
import { PerformanceAnalysis } from '../components/PerformanceAnalysisManager';
import { IndividualTopicAnalysis } from '../components/IndividualTopicAnalysisManager';
import { PastAttempts } from '../components/PastAttemptsManager';
import { useUserPerformanceApi } from '../api';
import {
  TrendingUpIcon,
  SmartToyIcon,
  QuizIcon,
  TopicIcon,
  CheckCircleIcon,
  ArrowForwardIcon
} from '../icons';
import { availableTopics } from '../components/PageManager/topics';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Theme configuration for dark mode
const darkTheme = {
  background: '#0a1929',
  textPrimary: '#e3f2fd',
  textSecondary: '#90caf9',
  accent: '#64b5f6',
  cardBackground: '#132f4c',
  border: '1px solid rgba(100, 181, 246, 0.1)',
  accentGradient: 'linear-gradient(45deg, #64b5f6 30%, #42a5f5 70%, #2196f3 90%)',
  shadow: '0 8px 32px rgba(100, 181, 246, 0.1)',
  hoverShadow: '0 12px 40px rgba(100, 181, 246, 0.2)'
};

const heroStyle = {
  textAlign: 'center',
  marginTop: '2rem',
  color: '#e3f2fd',
  fontWeight: 700
};

/**
 * Home Page Component
 * Displays user performance, topic analysis, and past attempts.
 * Handles fetching, loading, and error states.
 */
const Home = () => {
  // Context and API hooks
  const { user } = useContext(AuthContext);
  const { fetchUserPerformance, fetchUserTopicPerformance } = useUserPerformanceApi();

  // UI and data state
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('performance');

  // Topic analysis state
  const [hasIndividualTopicData, setHasIndividualTopicData] = useState(false);
  const [indiTopic, setIndiTopic] = useState('');
  const [topicData, setTopicData] = useState({ correctAnswers: [], incorrectAnswers: [] });
  const [topicLoading, setTopicLoading] = useState(false);

  // Refs for scrolling
  const performanceRef = useRef(null);
  const pastAttemptsRef = useRef(null);

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

  // Tab and topic state for onboarding
  const [tabValue, setTabValue] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState('');
  const navigate = useNavigate();

  /**
   * Handles tab change event for onboarding.
   */
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  /**
   * Handles topic selection for onboarding.
   */
  const handleTopicSelect = (topic) => setSelectedTopic(topic);

  /**
   * Initiates the test if a topic is selected; otherwise, shows an alert.
   */
  const handleStartTest = () =>
    selectedTopic
      ? navigate('/question-paper')
      : alert('Please select a topic first!');

  /**
   * Fetch user performance data on mount or when user changes.
   */
  useEffect(() => {
    if (!user?._id) return;

    let isMounted = true;
    setLoading(true);

    (async () => {
      try {
        const data = await fetchUserPerformance(user._id);
        if (isMounted) setPerformance(data);
      } catch (err) {
        console.error('Performance fetch error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => { isMounted = false; };
  }, [user, fetchUserPerformance]);

  /**
   * Fetch topic-specific analysis for a given topic.
   * Memoized to avoid unnecessary re-creation.
   */
  const handleCardClick = useCallback(async (topic) => {
    if (!user || !topic) return;

    setTopicLoading(true);
    setHasIndividualTopicData(true);
    setIndiTopic(topic);

    try {
      const data = await fetchUserTopicPerformance(user._id, topic);

      if (!data?.data || !Array.isArray(data.data)) {
        console.error("Invalid data structure received:", data);
        setTopicData({ correctAnswers: [], incorrectAnswers: [] });
        return;
      }

      const correctAnswers = data.data.filter(item => item.isCorrect);
      const incorrectAnswers = data.data.filter(item => !item.isCorrect);

      setTopicData({ correctAnswers, incorrectAnswers });
    } catch (err) {
      console.error('Topic analysis error:', err);
      alert('Error loading topic data. Please try again.');
      setTopicData({ correctAnswers: [], incorrectAnswers: [] });
    } finally {
      setTopicLoading(false);
    }
  }, [user, fetchUserTopicPerformance]);

  // Early return if user is not loaded
  if (!user) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress size={60} thickness={4} sx={{ color: darkTheme.accent }} />
        <Typography variant="h6" mt={2} color={darkTheme.textSecondary}>
          Loading user...
        </Typography>
      </Box>
    );
  }

  // Section navigation buttons for dashboard
  const SectionButtons = () => (
    <Box display="flex" gap={2} justifyContent="left" marginTop={4} mb={2}>
      <Button
        variant={activeSection === 'performance' ? 'contained' : 'outlined'}
        onClick={() => {
          setActiveSection('performance');
          performanceRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        sx={{
          background: activeSection === 'performance' ? darkTheme.accentGradient : 'transparent',
          color: activeSection === 'performance' ? 'white' : darkTheme.accent,
          border: `1px solid ${darkTheme.accent}`
        }}
      >
        Performance
      </Button>
      <Button
        variant={activeSection === 'past' ? 'contained' : 'outlined'}
        onClick={() => {
          setActiveSection('past');
          pastAttemptsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        sx={{
          background: activeSection === 'past' ? darkTheme.accentGradient : 'transparent',
          color: activeSection === 'past' ? 'white' : darkTheme.accent,
          border: `1px solid ${darkTheme.accent}`
        }}
      >
        Past Attempts
      </Button>
    </Box>
  );

  return (
    <div style={{ minHeight: '100vh', background: darkTheme.background, color: darkTheme.textPrimary }}>
      <Navbar theme={darkTheme} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        {/* Section Navigation or Welcome */}
        {!loading && (
          performance?.topicAnalysis?.length > 0
            ? <SectionButtons />
            : (
              <Typography variant="h3" component="h1" sx={heroStyle}>
                Welcome Back, {user?.name?.split(' ')[0] ?? 'User'}!
              </Typography>
            )
        )}

        {/* Loading State */}
        {loading ? (
          <Box textAlign="center" mt={6}>
            <CircularProgress size={60} thickness={4} sx={{ color: darkTheme.accent }} />
            <Typography variant="h6" mt={2} color={darkTheme.textSecondary}>
              Analyzing Your Performance...
            </Typography>
          </Box>
        ) : performance?.topicAnalysis?.length > 0 ? (
          <div ref={performanceRef} style={{ scrollMarginTop: '100px' }} data-id="performance">
            <PerformanceAnalysis
              handleCardClick={handleCardClick}
              performance={performance}
              theme={darkTheme}
            />
            {/* Topic Analysis Loading */}
            {topicLoading && (
              <Box textAlign="center" mt={4} mb={4}>
                <CircularProgress size={40} thickness={4} sx={{ color: darkTheme.accent }} />
                <Typography variant="body1" mt={1} color={darkTheme.textSecondary}>
                  Loading topic data...
                </Typography>
              </Box>
            )}
            {/* Individual Topic Analysis */}
            {hasIndividualTopicData && !topicLoading && (
              <IndividualTopicAnalysis
                key={indiTopic}
                setHasIndividualTopicData={setHasIndividualTopicData}
                correctAnswers={topicData.correctAnswers}
                incorrectAnswers={topicData.incorrectAnswers}
                indiTopic={indiTopic}
                theme={darkTheme}
              />
            )}
          </div>
        ) : (
          // Onboarding for new users
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
                {/* About Tab */}
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
                  <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} wrap="nowrap">
                    {[
                      {
                        icon: TrendingUpIcon,
                        title: "Performance Tracking",
                        description: "Monitor your progress with detailed analytics and performance insights"
                      },
                      {
                        icon: SmartToyIcon,
                        title: "AI-Powered Analysis",
                        description: "Our AI agent analyzes your mistakes and creates personalized improvement strategies"
                      },
                      {
                        icon: QuizIcon,
                        title: "Smart Testing",
                        description: "Take tests across multiple subjects with intelligent question selection"
                      }
                    ].map((feature, index) => {
                      const IconComponent = feature.icon;
                      return (
                        <Grid item xs={4} key={index}>
                          <Fade in timeout={1200 + index * 200}>
                            <Card sx={{
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: darkTheme.border,
                              height: '100%',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: darkTheme.hoverShadow,
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
                                  background: darkTheme.accentGradient,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 2
                                }}>
                                  <IconComponent sx={{ fontSize: { xs: 24, sm: 30 }, color: 'white' }} />
                                </Box>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    color: darkTheme.textPrimary,
                                    mb: 2,
                                    fontWeight: 600,
                                    fontSize: { xs: '1rem', sm: '1.25rem' }
                                  }}
                                >
                                  {feature.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: darkTheme.textSecondary,
                                    lineHeight: 1.6,
                                    fontSize: { xs: '0.875rem', sm: '1rem' }
                                  }}
                                >
                                  {feature.description}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Fade>
                        </Grid>
                      );
                    })}
                  </Grid>
                </TabPanel>
                {/* How It Works Tab */}
                <TabPanel value={tabValue} index={1}>
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
                      <AssessmentIcon sx={{ fontSize: { xs: 30, sm: 40 }, color: 'white' }} />
                    </Box>
                    <Typography
                      variant={isMobile ? "h5" : "h4"}
                      sx={{
                        color: darkTheme.textPrimary,
                        mb: 3,
                        fontWeight: 700
                      }}
                    >
                      How Hatched Works
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: darkTheme.textSecondary,
                        lineHeight: 1.8,
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        maxWidth: 700,
                        mx: 'auto'
                      }}
                    >
                      Our AI-powered system continuously learns from your performance to provide personalized test preparation.
                    </Typography>
                  </Box>
                  <Box sx={{ maxWidth: 900, margin: '0 auto' }}>
                    {[
                      {
                        step: "1",
                        title: "Take Your First Test",
                        description: "Choose a topic and start with our comprehensive question bank",
                        color: '#ff6b6b'
                      },
                      {
                        step: "2",
                        title: "AI Analyzes Your Mistakes",
                        description: "Our intelligent agent identifies patterns in your incorrect answers and weak areas",
                        color: '#4ecdc4'
                      },
                      {
                        step: "3",
                        title: "Personalized Tomorrow's Paper",
                        description: "Based on your mistakes, we generate a customized test for the next day focusing on your weak points",
                        color: '#45b7d1'
                      },
                      {
                        step: "4",
                        title: "Continuous Improvement",
                        description: "The cycle repeats, ensuring constant progress and targeted learning",
                        color: '#96ceb4'
                      }
                    ].map((item, index) => (
                      <Fade in timeout={1000 + index * 300} key={index}>
                        <Card sx={{
                          mb: 3,
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: darkTheme.border,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateX(8px)',
                            boxShadow: darkTheme.hoverShadow
                          }
                        }}>
                          <CardContent sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: { xs: 2, sm: 3 },
                            flexDirection: { xs: 'column', sm: 'row' },
                            textAlign: { xs: 'center', sm: 'left' }
                          }}>
                            <Box sx={{
                              width: { xs: 50, sm: 60 },
                              height: { xs: 50, sm: 60 },
                              background: item.color,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: { xs: 0, sm: 3 },
                              mb: { xs: 2, sm: 0 },
                              flexShrink: 0
                            }}>
                              <Typography sx={{
                                color: 'white',
                                fontWeight: 800,
                                fontSize: { xs: '1.2rem', sm: '1.4rem' }
                              }}>
                                {item.step}
                              </Typography>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography sx={{
                                color: darkTheme.textPrimary,
                                fontWeight: 700,
                                fontSize: { xs: '1.1rem', sm: '1.2rem' },
                                mb: 1
                              }}>
                                {item.title}
                              </Typography>
                              <Typography sx={{
                                color: darkTheme.textSecondary,
                                lineHeight: 1.6
                              }}>
                                {item.description}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Fade>
                    ))}
                  </Box>
                </TabPanel>
                {/* Get Started Tab */}
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
                      Select a subject to begin your personalized learning journey with Hatched.
                    </Typography>
                  </Box>
                  {/* Topic Selection */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, sm: 3 }, justifyContent: 'center', mb: 4 }}>
                    {availableTopics.map((topic) => (
                      <Box key={topic.name} sx={{ width: { xs: '100%', sm: '48%', md: '30%', lg: '23%' } }}>
                        <Paper
                          elevation={0}
                          sx={{
                            background: selectedTopic === topic.name
                              ? darkTheme.accentGradient
                              : 'rgba(255, 255, 255, 0.05)',
                            border: selectedTopic === topic.name
                              ? `2px solid ${darkTheme.accent}`
                              : darkTheme.border,
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            height: '100%',
                            '&:hover': {
                              transform: 'translateY(-6px) scale(1.02)',
                              boxShadow: darkTheme.hoverShadow,
                              background: selectedTopic === topic.name
                                ? darkTheme.accentGradient
                                : 'rgba(255, 255, 255, 0.1)'
                            }
                          }}
                          onClick={() => handleTopicSelect(topic.name)}
                        >
                          <Box sx={{ textAlign: 'center', p: { xs: 2, sm: 3 }, height: '100%' }}>
                            <Typography sx={{ fontSize: { xs: '2rem', sm: '2.5rem' }, mb: 2 }}>
                              {topic.icon}
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{
                                color: selectedTopic === topic.name ? 'white' : darkTheme.textPrimary,
                                fontWeight: 700,
                                fontSize: { xs: '0.9rem', sm: '1rem' }
                              }}
                            >
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
                  {/* Start Test Button */}
                  {selectedTopic && (
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: darkTheme.textPrimary,
                          mb: 3,
                          fontSize: { xs: '1.1rem', sm: '1.25rem' }
                        }}
                      >
                        Selected Topic:{' '}
                        <span
                          style={{
                            background: darkTheme.accentGradient,
                            backgroundClip: 'text',
                            textFillColor: 'transparent',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 700
                          }}
                        >
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
        )}

        {/* Past Attempts */}
        <div ref={pastAttemptsRef} style={{ scrollMarginTop: '100px' }} data-id="past">
          <PastAttempts userId={user._id} theme={darkTheme} />
        </div>
      </div>
    </div>
  );
};

export default Home;
