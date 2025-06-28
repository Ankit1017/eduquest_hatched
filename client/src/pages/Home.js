// Home.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navbar } from '../components/NavbarManager';
import axios from 'axios';
import { PerformanceAnalysis } from '../components/PerformanceAnalysisManager';
import { IndividualTopicAnalysis } from '../components/IndividualTopicAnalysisManager';
import {
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  Container,
  Fade,
  Slide,
  useMediaQuery,
  useTheme
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import QuizIcon from '@mui/icons-material/Quiz';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TopicIcon from '@mui/icons-material/Topic';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PastAttempts } from "../components/PastAttemptsManager";
import { host } from "../config";

// --------- DARK THEME CONFIGURATION ---------
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

// --------- HERO SECTION STYLE ---------
const heroStyle = {
  textAlign: 'center',
  margin: '40px 0',
  color: darkTheme.accent,
  fontWeight: 700,
  fontSize: '2.4rem',
  letterSpacing: '-0.5px',
  lineHeight: 1.2,
  textShadow: '0 2px 8px rgba(100, 181, 246, 0.2)'
};

// --------- RESPONSIVE BREAKPOINTS ---------
const breakpoints = {
  xs: '(max-width: 600px)',
  sm: '(max-width: 960px)',
  md: '(max-width: 1280px)'
};

// --------- SAMPLE TOPICS WITH ICONS ---------
const availableTopics = [
  { name: 'Mathematics', icon: '📊', color: '#ff6b6b' },
  { name: 'Physics', icon: '⚛️', color: '#4ecdc4' },
  { name: 'Chemistry', icon: '🧪', color: '#45b7d1' },
  { name: 'Biology', icon: '🧬', color: '#96ceb4' },
  { name: 'Computer Science', icon: '💻', color: '#feca57' },
  { name: 'English', icon: '📚', color: '#ff9ff3' },
  { name: 'History', icon: '🏛️', color: '#54a0ff' },
  { name: 'Geography', icon: '🌍', color: '#5f27cd' },
  { name: 'Economics', icon: '📈', color: '#00d2d3' },
  { name: 'Psychology', icon: '🧠', color: '#ff6348' }
];

// --------- TAB PANEL COMPONENT WITH ANIMATION ---------
function TabPanel(props) {
  const { children, value, index, ...other } = props;
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

// --------- ENHANCED NEW USER WELCOME COMPONENT ---------
const NewUserWelcome = ({ user, theme }) => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState('');
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(breakpoints.xs);
  const isTablet = useMediaQuery(breakpoints.sm);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handleStartTest = () => {
    if (selectedTopic) {
      window.location.href = `/question-paper`;
    } else {
      alert('Please select a topic first!');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4, md: 6 } }}>
      {/* Hero Section */}
      <Fade in timeout={800}>
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
              mb: 3,
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
      </Fade>

      {/* Enhanced Tabs Section */}
      <Slide direction="up" in timeout={1000}>
        <Paper sx={{
          background: theme.cardBackground,
          border: theme.border,
          borderRadius: { xs: 2, sm: 3 },
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
          boxShadow: theme.shadow
        }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isMobile ? "fullWidth" : "centered"}
            sx={{
              borderBottom: `1px solid ${theme.border}`,
              '& .MuiTab-root': {
                color: theme.textSecondary,
                fontWeight: 600,
                py: { xs: 2, sm: 3 },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '&.Mui-selected': {
                  color: theme.accent,
                  fontWeight: 700
                }
              },
              '& .MuiTabs-indicator': {
                height: 3,
                background: theme.accentGradient
              }
            }}
          >
            <Tab label="About Hatched" />
            <Tab label="How It Works" />
            <Tab label="Get Started" />
          </Tabs>

          {/* About Hatched Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
              <Box sx={{
                width: { xs: 60, sm: 80 },
                height: { xs: 60, sm: 80 },
                background: theme.accentGradient,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}>
                <SmartToyIcon sx={{ fontSize: { xs: 30, sm: 40 }, color: 'white' }} />
              </Box>

              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{
                  color: theme.textPrimary,
                  mb: 3,
                  fontWeight: 700
                }}
              >
                About Hatched Platform
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: theme.textSecondary,
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  maxWidth: 800,
                  mx: 'auto'
                }}
              >
                Hatched is an innovative test preparation platform designed to revolutionize how you improve your academic performance.
                Our platform combines intelligent testing with AI-powered analysis to create a personalized learning experience that adapts to your unique needs.
              </Typography>
            </Box>

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
                            <IconComponent sx={{ fontSize: { xs: 24, sm: 30 }, color: 'white' }} />
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
                            {feature.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.textSecondary,
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
                background: theme.accentGradient,
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
                  color: theme.textPrimary,
                  mb: 3,
                  fontWeight: 700
                }}
              >
                How Hatched Works
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: theme.textSecondary,
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  maxWidth: 700,
                  mx: 'auto'
                }}
              >
                Our AI-powered system continuously learns from your performance to provide personalized test preparation
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
                    border: theme.border,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      boxShadow: theme.hoverShadow
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
                          color: theme.textPrimary,
                          fontWeight: 700,
                          fontSize: { xs: '1.1rem', sm: '1.2rem' },
                          mb: 1
                        }}>
                          {item.title}
                        </Typography>
                        <Typography sx={{
                          color: theme.textSecondary,
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
                background: theme.accentGradient,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}>
                <TopicIcon sx={{ fontSize: { xs: 30, sm: 40 }, color: 'white' }} />
              </Box>

              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{
                  color: theme.textPrimary,
                  mb: 3,
                  fontWeight: 700
                }}
              >
                Choose Your First Topic
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: theme.textSecondary,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  maxWidth: 600,
                  mx: 'auto'
                }}
              >
                Select a subject to begin your personalized learning journey with Hatched
              </Typography>
            </Box>

            <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
              {availableTopics.map((topic, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={topic.name}>
                  <Fade in timeout={1000 + index * 100}>
                    <Card
                      sx={{
                        background: selectedTopic === topic.name
                          ? theme.accentGradient
                          : 'rgba(255, 255, 255, 0.05)',
                        border: selectedTopic === topic.name
                          ? `2px solid ${theme.accent}`
                          : theme.border,
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        height: '100%',
                        '&:hover': {
                          transform: 'translateY(-6px) scale(1.02)',
                          boxShadow: theme.hoverShadow,
                          background: selectedTopic === topic.name
                            ? theme.accentGradient
                            : 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                      onClick={() => handleTopicSelect(topic.name)}
                    >
                      <CardContent sx={{
                        textAlign: 'center',
                        p: { xs: 2, sm: 3 },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Typography sx={{
                          fontSize: { xs: '2rem', sm: '2.5rem' },
                          mb: 2
                        }}>
                          {topic.icon}
                        </Typography>

                        <Typography
                          variant="h6"
                          sx={{
                            color: selectedTopic === topic.name ? 'white' : theme.textPrimary,
                            fontWeight: 700,
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            textAlign: 'center'
                          }}
                        >
                          {topic.name}
                        </Typography>

                        {selectedTopic === topic.name && (
                          <CheckCircleIcon sx={{
                            color: 'white',
                            mt: 1,
                            fontSize: { xs: 20, sm: 24 }
                          }} />
                        )}
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>

            {selectedTopic && (
              <Fade in timeout={500}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.textPrimary,
                      mb: 3,
                      fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}
                  >
                    Selected Topic: <span style={{
                      background: theme.accentGradient,
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
                      background: theme.accentGradient,
                      fontWeight: 700,
                      borderRadius: 3,
                      textTransform: 'none',
                      boxShadow: theme.shadow,
                      '&:hover': {
                        transform: 'translateY(-2px) scale(1.05)',
                        boxShadow: theme.hoverShadow
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    Start Your First Test
                  </Button>
                </Box>
              </Fade>
            )}
          </TabPanel>
        </Paper>
      </Slide>
    </Container>
  );
};

// --------- FEATURE CARDS DATA (KEPT FOR FALLBACK) ---------
const featureCards = [
  {
    icon: <SchoolIcon sx={{ fontSize: 50, color: darkTheme.accent }} />,
    title: "Comprehensive Question Bank",
    text: "Access thousands of questions across various subjects and difficulty levels."
  },
  {
    icon: <AssessmentIcon sx={{ fontSize: 50, color: darkTheme.accent }} />,
    title: "Detailed Analytics",
    text: "Track your progress with personalized performance reports and insights."
  },
  {
    icon: <QuizIcon sx={{ fontSize: 50, color: darkTheme.accent }} />,
    title: "Smart Practice",
    text: "Get tailored recommendations based on your weak areas."
  }
];

// --------- MAIN HOME COMPONENT (UNCHANGED EXISTING LOGIC) ---------
const Home = () => {
  const { user } = useContext(AuthContext);

  // Performance and topic analysis state
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(false);

  // Individual topic analysis state
  const [hasIndividualTopicData, setHasIndividualTopicData] = useState(false);
  const [indiTopic, setIndiTopic] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [topicLoading, setTopicLoading] = useState(false);

  const performanceRef = useRef(null);
  const pastAttemptsRef = useRef(null);
  const [activeSection, setActiveSection] = useState('performance');

  // Fetch user performance when user logs in
  useEffect(() => {
    if (user) {
      setLoading(true);
      const fetchPerformance = async () => {
        try {
          const response = await axios.get(`${host}/api/user-performance/${user._id}`);
          setPerformance(response.data);
        } catch (err) {
          console.error('Performance fetch error:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchPerformance();
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      const perfBox = performanceRef.current;
      const pastBox = pastAttemptsRef.current;

      if (!perfBox || !pastBox) return; // Wait until both are available

      const offset = 90;
      const perfTop = Math.abs(perfBox.getBoundingClientRect().top - offset);
      const pastTop = Math.abs(pastBox.getBoundingClientRect().top - offset);

      if (perfTop < pastTop) {
        setActiveSection('performance');
      } else {
        setActiveSection('past');
      }
    };

    // Delay initial scroll handler to wait for components to mount
    const timeout = setTimeout(() => {
      handleScroll(); // Run once when both sections are likely rendered
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100); // Adjust timing as needed based on your data loading

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle click on a topic card to show individual topic analysis
  const handleCardClick = async (topic) => {
    if (!user || !topic) return;
    try {
      setTopicLoading(true);
      const { data } = await axios.get(`${host}/api/user-performance/${user._id}/${topic}`);
      if (!data || !data.data || !Array.isArray(data.data)) {
        console.error("Invalid data structure received:", data);
        return;
      }
      const correct = data.data.filter(item => item.isCorrect);
      const incorrect = data.data.filter(item => !item.isCorrect);
      setCorrectAnswers(correct);
      setIncorrectAnswers(incorrect);
      setIndiTopic(topic);
      setHasIndividualTopicData(true);
    } catch (err) {
      console.error('Topic analysis error:', err);
      alert('Error loading topic data. Please try again.');
    } finally {
      setTopicLoading(false);
    }
  };

  if (!user) {
    // Optionally, you can redirect or show a spinner here if user is missing
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress size={60} thickness={4} sx={{ color: darkTheme.accent }} />
        <Typography variant="h6" mt={2} color={darkTheme.textSecondary}>
          Loading user...
        </Typography>
      </Box>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: darkTheme.background,
        color: darkTheme.textPrimary
      }}
    >
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        {!loading &&
          (performance?.topicAnalysis?.length > 0 ? (
            <Box
              display="flex"
              gap={2}
              justifyContent="center"
              mb={2}
              sx={{
                position: { xs: 'static', md: 'sticky' },
                top: { md: 72 },
                zIndex: { md: 1000 },
                background: { md: darkTheme.background },
                py: 1,
                px: 2,
                boxShadow: { md: '0 2px 4px rgba(0,0,0,0.05)' },
                display: 'flex',
                justifyContent: 'start',
                gap: 2,
              }}
            >
              <Button
                variant={activeSection === 'performance' ? 'contained' : 'outlined'}
                onClick={() => performanceRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                Performance
              </Button>
              <Button
                variant={activeSection === 'past' ? 'contained' : 'outlined'}
                onClick={() => pastAttemptsRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                Past Attempts
              </Button>
            </Box>
          ) : (
            (
              <Typography variant="h3" component="h1" sx={heroStyle}>
                Welcome Back, {user?.name?.split(' ')[0] ?? 'User'}!
              </Typography>
            )))
        }

        {loading ? (
          <Box textAlign="center" mt={6}>
            <CircularProgress size={60} thickness={4} sx={{ color: darkTheme.accent }} />
            <Typography variant="h6" mt={2} color={darkTheme.textSecondary}>
              Analyzing Your Performance...
            </Typography>
          </Box>
        ) : (
          performance?.topicAnalysis?.length > 0 ? (
            <div
              ref={performanceRef}
              style={{ scrollMarginTop: '100px' }}
              data-id="performance">
              <PerformanceAnalysis
                handleCardClick={handleCardClick}
                performance={performance}
                theme={darkTheme}
              />

              {topicLoading && (
                <Box textAlign="center" mt={4} mb={4}>
                  <CircularProgress size={40} thickness={4} sx={{ color: darkTheme.accent }} />
                  <Typography variant="body1" mt={1} color={darkTheme.textSecondary}>
                    Loading topic data...
                  </Typography>
                </Box>
              )}

              {hasIndividualTopicData && !topicLoading && (
                <IndividualTopicAnalysis
                  key={indiTopic}
                  setHasIndividualTopicData={setHasIndividualTopicData}
                  correctAnswers={correctAnswers}
                  incorrectAnswers={incorrectAnswers}
                  indiTopic={indiTopic}
                  theme={darkTheme}
                />
              )}
            </div>
          ) : (
            // ENHANCED NEW USER WELCOME PAGE REPLACES SIMPLE CARDS
            <NewUserWelcome user={user} theme={darkTheme} />
          )
        )}

        <div
          ref={pastAttemptsRef}
          style={{ scrollMarginTop: '100px' }}
          data-id="past">
          <PastAttempts userId={user._id} theme={darkTheme} />
        </div>
      </div>
    </div>
  );
};

export default Home;
