/**
 * QuestionPaperPage.jsx
 *
 * Main page for handling test creation, execution, and performance analysis.
 * Features:
 * - Tag selection for personalized question sets
 * - Fetching and displaying questions
 * - Test timing and answer tracking
 * - Submitting answers and generating a report
 * - Displaying performance analytics
 */

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navbar } from '../components/NavbarManager';
import TagSelector from '../components/paper_manager/TagSelector';
import QuestionCard from '../components/paper_manager/QuestionCard';
import Report from '../components/paper_manager/Report';
import PerformanceAnalysis from '../components/paper_manager/PerformanceAnalysis';
import { cardStyle, buttonStyle } from '../components/paper_manager/styles';
import { useQuestionPaperApi } from '../api';

const PAGE_STYLE = {
  maxWidth: '1200px',
  minHeight: '700px',
  margin: '32px auto',
  padding: '0 16px',
  width: '100vw',
  boxSizing: 'border-box'
};

const TITLE_STYLE = {
  color: '#1976d2',
  marginBottom: 10
};

/**
 * QuestionPaperPage
 * ---------------
 * The main component for the test-taking experience.
 * Handles fetching tags, selecting tags, starting the test, answering questions, submitting, and displaying results.
 */
const QuestionPaperPage = () => {
  // --- Context ---
  const { user } = useContext(AuthContext);

  // --- State: Test, UI, and Data ---
  const [questions, setQuestions] = useState([]);                // List of fetched questions
  const [userAnswers, setUserAnswers] = useState({});            // User's answers by question ID
  const [report, setReport] = useState(null);                    // Server report after submission
  const [error, setError] = useState('');                        // Error message
  const [performance, setPerformance] = useState(null);          // User's performance data
  const [availableTags, setAvailableTags] = useState([]);        // All tags available for selection
  const [selectedTags, setSelectedTags] = useState([]);          // Tags selected by the user
  const [loadingQuestions, setLoadingQuestions] = useState(false); // Loading state for fetching questions
  const [submitting, setSubmitting] = useState(false);           // Loading state for submitting answers
  const [sortOrder, setSortOrder] = useState('highToLow');       // Sort order for performance analysis
  const [search, setSearch] = useState('');                      // Tag search/filter
  const [showTest, setShowTest] = useState(false);               // Whether the test UI is shown
  const [currentQuestion, setCurrentQuestion] = useState(0);     // Index of the current question
  const [timer, setTimer] = useState(0);                         // Timer value in seconds
  const [timerRunning, setTimerRunning] = useState(false);       // Whether the timer is running
  const [reviewMode, setReviewMode] = useState(false);           // Whether user is reviewing answers
  const [testStartTime, setTestStartTime] = useState(null);      // Timestamp when test started
  const [originalTimerValue, setOriginalTimerValue] = useState(0);// Original timer value for reporting

  // --- API hooks ---
  const {
    fetchTags,
    fetchQuestions,
    submitAnswers,
    fetchUserPerformance,
    clearCache,
  } = useQuestionPaperApi();

  /**
   * Prevents back navigation during the test to avoid accidental exits.
   * Locks the user into the test until it's completed or submitted.
   */
  useEffect(() => {
    if (!showTest) return;
    window.history.pushState(null, document.title, window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, document.title, window.location.href);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [showTest]);

  /**
   * Loads available tags from the API on component mount.
   * Tags are used to filter and personalize the question set.
   */
  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await fetchTags();
        setAvailableTags(data);
      } catch {
        setError('Could not load tags');
      }
    };
    loadTags();
  }, [fetchTags]);

  /**
   * Handles the countdown timer for the test.
   * When the timer reaches zero, automatically submits the test.
   */
  useEffect(() => {
    let interval = null;
    if (timerRunning && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && timerRunning) {
      setTimerRunning(false);
      handleSubmit();
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [timer, timerRunning]);

  /**
   * Toggles a tag in the selectedTags array.
   * @param {string} tag - The tag to add or remove.
   */
  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
  };

  /**
   * Fetches questions from the API based on selected tags.
   * Resets all test and report state.
   */
  const handleFetchQuestions = async () => {
    setLoadingQuestions(true);
    setQuestions([]);
    setReport(null);
    setPerformance(null);
    setError('');
    setUserAnswers({});
    setShowTest(false);
    setCurrentQuestion(0);
    try {
      const data = await fetchQuestions(selectedTags);
      setQuestions(data);
    } catch {
      setError('Error fetching questions. Please try again.');
    }
    setLoadingQuestions(false);
  };

  /**
   * Starts the test timer and initializes test state.
   * @param {number} minutes - Duration of the test in minutes.
   */
  const handleStartTest = (minutes) => {
    const timerValue = minutes * 60;
    setOriginalTimerValue(timerValue);
    setTimer(timerValue);
    setTimerRunning(true);
    setShowTest(true);
    setTestStartTime(Date.now());
  };

  /**
   * Records the user's answer for the current question.
   * @param {number} optionIndex - Index of the selected option.
   */
  const handleAnswer = (optionIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questions[currentQuestion]._id]: optionIndex
    });
  };

  /** Moves to the next question in the test. */
  const handleNext = () => setCurrentQuestion(q => Math.min(q + 1, questions.length - 1));

  /** Moves to the previous question in the test. */
  const handlePrev = () => setCurrentQuestion(q => Math.max(q - 1, 0));

  /**
   * Enriches the server report with calculated data:
   * - Time taken, average time per question, unattempted count, and topic accuracy.
   * @param {object} serverReport - The report data received from the server.
   * @returns {object} - The enriched report.
   */
  const enrichReport = (serverReport) => {
    const endTime = Date.now();
    const timeTaken = testStartTime ? Math.floor((endTime - testStartTime) / 1000) : null;
    const calculatedTimeTaken = originalTimerValue - timer;
    const finalTimeTaken = calculatedTimeTaken > 0 ? calculatedTimeTaken : timeTaken;
    const avgTimePerQ = finalTimeTaken ? finalTimeTaken / questions.length : null;

    let unattempted = 0;
    const questionsWithDetails = questions.map(q => {
      const userAnswer = userAnswers[q._id];
      const isCorrect = userAnswer === q.correctOption;
      if (userAnswer === undefined) unattempted++;
      return {
        ...q,
        userAnswer,
        isCorrect
      };
    });

    // Calculate topic accuracy
    const topicMap = {};
    questions.forEach(q => {
      const userAnswer = userAnswers[q._id];
      const isCorrect = userAnswer === q.correctOption;
      (q.topicTags || []).forEach(tag => {
        if (!topicMap[tag]) topicMap[tag] = { name: tag, correct: 0, total: 0 };
        topicMap[tag].total++;
        if (isCorrect) topicMap[tag].correct++;
      });
    });
    const topicAccuracy = Object.values(topicMap);

    return {
      ...serverReport,
      timeTaken: finalTimeTaken,
      avgTimePerQ: avgTimePerQ,
      unattempted: unattempted,
      questions: (serverReport.questions && serverReport.questions.length)
        ? serverReport.questions
        : questionsWithDetails,
      topicAccuracy: (serverReport.topicAccuracy && serverReport.topicAccuracy.length)
        ? serverReport.topicAccuracy
        : topicAccuracy
    };
  };

  /**
   * Handles test submission:
   * - Sends answers to the server
   * - Clears API cache
   * - Fetches and displays performance
   * @param {Event} [e] - The form submission event (optional).
   */
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setTimerRunning(false);
    setError('');
    setSubmitting(true);

    try {
      const response = await submitAnswers({
        userId: user._id,
        userAnswers,
        startTime: testStartTime
      });
      clearCache();
      setReport(enrichReport(response));
      const performanceResponse = await fetchUserPerformance(user._id);
      setPerformance(performanceResponse);
    } catch (error) {
      setError(error.response?.data?.message || 'Error submitting answers. Please try again.');
    } finally {
      setSubmitting(false);
      setShowTest(false);
    }
  };

  /**
   * Formats the timer value as mm:ss for display.
   */
  const timerDisplay = `${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`;

  // --- Render ---
  return (
    <>
      <Navbar />
      <div style={PAGE_STYLE}>
        <h1 style={TITLE_STYLE}>Start Test</h1>
        {/* Tag selection and question fetching */}
        {!showTest && !report && (
          <TagSelector
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagChange={handleTagChange}
            search={search}
            setSearch={setSearch}
            loadingQuestions={loadingQuestions}
            handleFetchQuestions={handleFetchQuestions}
            questions={questions}
            timer={timer}
            setTimer={setTimer}
            handleStartTest={handleStartTest}
          />
        )}

        {/* Test question view */}
        {showTest && questions.length > 0 && (
          <QuestionCard
            questions={questions}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            userAnswers={userAnswers}
            handleAnswer={handleAnswer}
            handlePrev={handlePrev}
            handleNext={handleNext}
            handleSubmit={handleSubmit}
            timerDisplay={timerDisplay}
            submitting={submitting}
            buttonStyle={buttonStyle}
          />
        )}

        {/* Error display */}
        {error && (
          <div style={{ color: '#d32f2f', margin: '18px 0', fontWeight: 600 }}>
            {error}
          </div>
        )}

        {/* Test report and review */}
        {report && (
          <Report
            report={report}
            reviewMode={reviewMode}
            setReviewMode={setReviewMode}
            setReport={setReport}
            setQuestions={setQuestions}
            setUserAnswers={setUserAnswers}
            setCurrentQuestion={setCurrentQuestion}
            buttonStyle={buttonStyle}
            topicAccuracy={report.topicAccuracy}
          />
        )}

        {/* Performance analysis after test */}
        {performance && (
          <PerformanceAnalysis
            performance={performance}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            cardStyle={cardStyle}
          />
        )}
      </div>
    </>
  );
};

export default QuestionPaperPage;