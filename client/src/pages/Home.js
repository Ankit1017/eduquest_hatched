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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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

// --------- ENHANCED DARK THEME CONFIGURATION ---------
const darkTheme = {
  background: 'linear-gradient(135deg, #0a1929 0%, #1a2332 100%)',
  cardBackground: 'rgba(19, 47, 76, 0.8)',
  textPrimary: '#ffffff',
  textSecondary: '#b3d9ff',
  accent: '#64b5f6',
  accentGradient: 'linear-gradient(45deg, #64b5f6 30%, #42a5f5 70%, #2196f3 90%)',
  border: '1px solid rgba(100, 181, 246, 0.2)',
  shadow: '0 8px 32px rgba(100, 181, 246, 0.1)',
  hoverShadow: '0 12px 40px rgba(100, 181, 246, 0.2)'
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
      window.location.href = `/practice?topic=${selectedTopic}`;
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

            <Grid container spacing={2}>
                  {[
                    {
                      icon: TrendingUpIcon,
                      title: "Performance Tracking",
                      description: "Monitor progress with detailed analytics"
                    },
                    {
                      icon: SmartToyIcon,
                      title: "AI Analysis",
                      description: "Personalized improvement strategies"
                    },
                    {
                      icon: QuizIcon,
                      title: "Smart Testing",
                      description: "Intelligent question selection"
                    }
                  ].map((feature, index) => (
                    <Grid item xs={12} key={index}>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 2,
                        border: theme.border
                      }}>
                        <Box sx={{
                          width: 40,
                          height: 40,
                          background: theme.accentGradient,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          flexShrink: 0
                        }}>
                          <feature.icon sx={{ fontSize: 20, color: 'white' }} />
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: theme.textPrimary,
                              fontWeight: 600,
                              mb: 0.5
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: theme.textSecondary }}
                          >
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
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

// --------- MAIN HOME COMPONENT WITH ENHANCED RESPONSIVENESS ---------
const Home = () => {
  const { user } = useContext(AuthContext);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(breakpoints.xs);

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

  // Check if user is new (no performance data)
  const isNewUser = !loading && (!performance || !performance.topicAnalysis || performance.topicAnalysis.length === 0);

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
    if (isNewUser) return;

    const handleScroll = () => {
      const perfBox = performanceRef.current;
      const pastBox = pastAttemptsRef.current;

      if (!perfBox || !pastBox) return;

      const offset = 90;
      const perfTop = Math.abs(perfBox.getBoundingClientRect().top - offset);
      const pastTop = Math.abs(pastBox.getBoundingClientRect().top - offset);

      if (perfTop < pastTop) {
        setActiveSection('performance');
      } else {
        setActiveSection('past');
      }
    };

    const timeout = setTimeout(() => {
      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isNewUser]);

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
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: darkTheme.background,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{ color: darkTheme.accent, mb: 3 }}
        />
        <Typography
          variant="h6"
          sx={{
            color: darkTheme.textSecondary,
            textAlign: 'center'
          }}
        >
          Loading user...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: darkTheme.background,
        color: darkTheme.textPrimary
      }}
    >
      <Navbar />

      {loading ? (
        <Box
          sx={{
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2
          }}
        >
          <CircularProgress
            size={60}
            thickness={4}
            sx={{ color: darkTheme.accent, mb: 3 }}
          />
          <Typography
            variant="h6"
            sx={{
              color: darkTheme.textSecondary,
              textAlign: 'center'
            }}
          >
            Analyzing Your Performance...
          </Typography>
        </Box>
      ) : isNewUser ? (
        <NewUserWelcome user={user} theme={darkTheme} />
      ) : (
        <Container maxWidth="xl" sx={{ py: 2 }}>
          {/* Sticky Navigation for Existing Users */}
          <Box
            sx={{
              position: 'sticky',
              top: 72,
              zIndex: 1000,
              background: darkTheme.background,
              py: 2,
              mb: 2,
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'flex-start',
              gap: 2,
              flexWrap: 'wrap'
            }}
          >
            <Button
              variant={activeSection === 'performance' ? 'contained' : 'outlined'}
              onClick={() => performanceRef.current?.scrollIntoView({ behavior: 'smooth' })}
              sx={{
                borderRadius: 3,
                px: 3,
                fontWeight: 600,
                ...(activeSection === 'performance' && {
                  background: darkTheme.accentGradient
                })
              }}
            >
              Performance
            </Button>
            <Button
              variant={activeSection === 'past' ? 'contained' : 'outlined'}
              onClick={() => pastAttemptsRef.current?.scrollIntoView({ behavior: 'smooth' })}
              sx={{
                borderRadius: 3,
                px: 3,
                fontWeight: 600,
                ...(activeSection === 'past' && {
                  background: darkTheme.accentGradient
                })
              }}
            >
              Past Attempts
            </Button>
          </Box>

          <div
            ref={performanceRef}
            style={{ scrollMarginTop: '100px' }}
            data-id="performance"
          >
            <PerformanceAnalysis
              handleCardClick={handleCardClick}
              performance={performance}
              theme={darkTheme}
            />

            {topicLoading && (
              <Box sx={{ textAlign: 'center', my: 4 }}>
                <CircularProgress
                  size={40}
                  thickness={4}
                  sx={{ color: darkTheme.accent, mb: 2 }}
                />
                <Typography
                  variant="body1"
                  sx={{ color: darkTheme.textSecondary }}
                >
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

          <div
            ref={pastAttemptsRef}
            style={{ scrollMarginTop: '100px' }}
            data-id="past"
          >
            <PastAttempts userId={user._id} theme={darkTheme} />
          </div>
        </Container>
      )}
    </Box>
  );
};

export default Home;
