// NewUserHomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  Grid,
  Fade,
  Slide,
  useMediaQuery,
  useTheme,
  Paper,
  AppBar,
  Toolbar
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import QuizIcon from '@mui/icons-material/Quiz';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TopicIcon from '@mui/icons-material/Topic';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LoginIcon from '@mui/icons-material/Login';

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

const breakpoints = {
  xs: '(max-width: 600px)',
  sm: '(max-width: 960px)',
  md: '(max-width: 1280px)'
};

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

// Simple Navbar Component
const SimpleNavbar = ({ onSignIn }) => {
  const isMobile = useMediaQuery(breakpoints.xs);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'rgba(10, 25, 41, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: darkTheme.border
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* Logo/Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{
            width: 40,
            height: 40,
            background: darkTheme.accentGradient,
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
              background: darkTheme.accentGradient,
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Hatched
          </Typography>
        </Box>

        {/* Sign In Button */}
        <Button
          variant="outlined"
          onClick={onSignIn}
          startIcon={!isMobile && <LoginIcon />}
          sx={{
            color: darkTheme.accent,
            borderColor: darkTheme.accent,
            px: { xs: 2, sm: 3 },
            py: 1,
            fontWeight: 600,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            '&:hover': {
              backgroundColor: darkTheme.accent,
              color: 'white',
              transform: 'translateY(-1px)',
              boxShadow: darkTheme.shadow
            },
            transition: 'all 0.3s ease'
          }}
        >
          {isMobile ? 'Sign In' : 'Sign In'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const NewUserHomePage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState('');
  const navigate = useNavigate();
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
      navigate(`/question-paper`);
    } else {
      alert('Please select a topic first!');
    }
  };

  const handleSignIn = () => {
    navigate('/home');
  };

  return (
    <Box sx={{
      background: darkTheme.background,
      minHeight: '100vh',
      color: darkTheme.textPrimary
    }}>
      {/* Simple Navbar */}
      <SimpleNavbar onSignIn={handleSignIn} />

      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5, md: 7 } }}>
        {/* Hero Section */}
        <Fade in timeout={800}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 6, md: 8 } }}>
            <Typography
              variant={isMobile ? "h3" : isTablet ? "h2" : "h1"}
              component="h1"
              sx={{
                background: darkTheme.accentGradient,
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
                color: darkTheme.textSecondary,
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
                  background: darkTheme.accentGradient,
                  color: 'white',
                  fontWeight: 600,
                  px: 1
                }}
              />
              <Chip
                label="Personalized Learning"
                sx={{
                  background: darkTheme.cardBackground,
                  color: darkTheme.textPrimary,
                  border: darkTheme.border,
                  fontWeight: 600
                }}
              />
              <Chip
                label="Performance Tracking"
                sx={{
                  background: darkTheme.cardBackground,
                  color: darkTheme.textPrimary,
                  border: darkTheme.border,
                  fontWeight: 600
                }}
              />
            </Box>
          </Box>
        </Fade>

        {/* Tabs Section */}
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
                  '&.Mui-selected': {
                    color: darkTheme.accent,
                    fontWeight: 700
                  }
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                  background: darkTheme.accentGradient
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

                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  sx={{
                    color: darkTheme.textPrimary,
                    mb: 3,
                    fontWeight: 700
                  }}
                >
                  About Hatched Platform
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: darkTheme.textSecondary,
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

                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  sx={{
                    color: darkTheme.textPrimary,
                    mb: 3,
                    fontWeight: 700
                  }}
                >
                  Choose Your First Topic
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: darkTheme.textSecondary,
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
                              color: selectedTopic === topic.name ? 'white' : darkTheme.textPrimary,
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
                        color: darkTheme.textPrimary,
                        mb: 3,
                        fontSize: { xs: '1.1rem', sm: '1.25rem' }
                      }}
                    >
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
                </Fade>
              )}
            </TabPanel>
          </Paper>
        </Slide>
      </Container>
    </Box>
  );
};

export default NewUserHomePage;
