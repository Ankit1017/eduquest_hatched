// src/pages/Home.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  CircularProgress, 
  useMediaQuery 
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { HeroSection } from '../components/PageManager';
import { Navbar } from '../components/NavbarManager';
import { PerformanceAnalysis } from '../components/PerformanceAnalysisManager';
import { IndividualTopicAnalysis } from '../components/IndividualTopicAnalysisManager';
import { PastAttempts } from "../components/PastAttemptsManager";
import axios from 'axios';
import { host } from '../config';

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

const Home = () => {
  const { user } = useContext(AuthContext);
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasIndividualTopicData, setHasIndividualTopicData] = useState(false);
  const [indiTopic, setIndiTopic] = useState("");
  const [topicData, setTopicData] = useState({ correctAnswers: [], incorrectAnswers: [] });
  const [topicLoading, setTopicLoading] = useState(false);
  const performanceRef = useRef(null);
  const pastAttemptsRef = useRef(null);
  const [activeSection, setActiveSection] = useState('performance');
  
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

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
      setHasIndividualTopicData(true);
      setIndiTopic(topic);
      
      const { data } = await axios.get(`${host}/api/user-performance/${user._id}/${topic}`);
      
      // Validate response structure
      if (!data || !data.data || !Array.isArray(data.data)) {
        console.error("Invalid data structure received:", data);
        return;
      }
      
      // Process response data
      const correct = data.data.filter(item => item.isCorrect);
      const incorrect = data.data.filter(item => !item.isCorrect);
      
      setTopicData({
        correctAnswers: correct || [],
        incorrectAnswers: incorrect || []
      });
    } catch (err) {
      console.error('Topic analysis error:', err);
      alert('Error loading topic data. Please try again.');
      setTopicData({ correctAnswers: [], incorrectAnswers: [] });
    } finally {
      setTopicLoading(false);
    }
  };

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

  return (
    <div style={{ minHeight: '100vh', background: darkTheme.background, color: darkTheme.textPrimary }}>
      <Navbar theme={darkTheme} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        {!loading && (
          performance?.topicAnalysis?.length > 0 ? (
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
          ) : (
            <Typography variant="h3" component="h1" sx={heroStyle}>
              Welcome Back, {user?.name?.split(' ')[0] ?? 'User'}!
            </Typography>
          )
        )}
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
                correctAnswers={topicData.correctAnswers}
                incorrectAnswers={topicData.incorrectAnswers}
                indiTopic={indiTopic}
                theme={darkTheme}
              />
            )}
          </div>
        ) : (
          <div>
            <HeroSection theme={darkTheme} isMobile={isMobile} isTablet={isTablet} />
          </div>
        )}
        <div ref={pastAttemptsRef} style={{ scrollMarginTop: '100px' }} data-id="past">
          <PastAttempts userId={user._id} theme={darkTheme} />
        </div>
      </div>
    </div>
  );
};

export default Home;
