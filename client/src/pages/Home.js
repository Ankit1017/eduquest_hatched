// Home.jsx
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navbar } from '../components/NavbarManager';
import axios from 'axios';
import { PerformanceAnalysis } from '../components/PerformanceAnalysisManager';
import { IndividualTopicAnalysis } from '../components/IndividualTopicAnalysisManager';
import { CircularProgress, Grid, Paper, Typography, Button, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import QuizIcon from '@mui/icons-material/Quiz';
import { PastAttempts } from "../components/PastAttemptsManager";
import { host } from "../config";

// --------- DARK THEME CONFIGURATION ---------
const darkTheme = {
  background: '#0a1929',
  textPrimary: '#e3f2fd',
  textSecondary: '#90caf9',
  accent: '#64b5f6',
  cardBackground: '#132f4c',
  border: '1px solid rgba(100, 181, 246, 0.1)'
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

// --------- FEATURE CARDS DATA ---------
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

// --------- MAIN HOME COMPONENT ---------
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
        <Typography variant="h3" component="h1" sx={heroStyle}>
          Welcome Back, {user?.name?.split(' ')[0] ?? 'User'}!
        </Typography>

        {loading ? (
          <Box textAlign="center" mt={6}>
            <CircularProgress size={60} thickness={4} sx={{ color: darkTheme.accent }} />
            <Typography variant="h6" mt={2} color={darkTheme.textSecondary}>
              Analyzing Your Performance...
            </Typography>
          </Box>
        ) : (
          performance?.topicAnalysis?.length > 0 ? (
            <>
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
            </>
          ) : (
            <div style={{ marginTop: 40 }}>
              <Typography variant="h5" align="center" gutterBottom color={darkTheme.textSecondary}>
                Get Started with QuizMaster
              </Typography>
              <Grid container spacing={4} sx={{ mt: 2, mb: 6 }}>
                {featureCards.map((card, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        height: '100%',
                        textAlign: 'center',
                        background: darkTheme.cardBackground,
                        border: darkTheme.border,
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 8px 24px rgba(100, 181, 246, 0.15)'
                        }
                      }}
                    >
                      {card.icon}
                      <Typography
                        variant="h6"
                        sx={{
                          mt: 2,
                          mb: 1,
                          fontWeight: 600,
                          color: darkTheme.textPrimary
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography variant="body1" color={darkTheme.textSecondary}>
                        {card.text}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              <Box textAlign="center" mt={4}>
                <Button
                  variant="contained"
                  size="large"
                  href="/practice"
                  sx={{
                    px: 6,
                    py: 1.5,
                    fontSize: '1.1rem',
                    background: `linear-gradient(45deg, ${darkTheme.accent} 30%, #42a5f5 90%)`,
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: `0 4px 12px ${darkTheme.accent}40`
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Start Practicing Now
                </Button>
              </Box>
            </div>
          )
        )}

        <PastAttempts userId={user._id} theme={darkTheme} />
      </div>
    </div>
  );
};

export default Home;
