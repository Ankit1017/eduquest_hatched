import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import {Navbar} from './NavbarManager';
import TagSelector from './paper_manager/TagSelector';
import QuestionCard from './paper_manager/QuestionCard';
import Report from './paper_manager/Report';
import PerformanceAnalysis from './paper_manager/PerformanceAnalysis';
import { cardStyle, buttonStyle, disabledButtonStyle } from './paper_manager/styles';
import {host} from '../config'

const QuestionPaperPage = () => {
    const { user } = useContext(AuthContext);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [report, setReport] = useState(null);
    const [error, setError] = useState('');
    const [performance, setPerformance] = useState(null);
    const [availableTags, setAvailableTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [sortOrder, setSortOrder] = useState('highToLow');
    const [search, setSearch] = useState('');
    const [showTest, setShowTest] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timer, setTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [reviewMode, setReviewMode] = useState(false);
    const [testStartTime, setTestStartTime] = useState(null);
    const [testEndTime, setTestEndTime] = useState(null);
    const [originalTimerValue, setOriginalTimerValue] = useState(0);

    // Prevent back navigation during test
    useEffect(() => {
        if (showTest) {
            window.history.pushState(null, document.title, window.location.href);
            const handlePopState = () => {
                window.history.pushState(null, document.title, window.location.href);
            };
            window.addEventListener('popstate', handlePopState);
            return () => window.removeEventListener('popstate', handlePopState);
        }
    }, [showTest]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get(`${host}/api/tags`);
                setAvailableTags(response.data);
            } catch (error) {
                setError('Could not load tags');
            }
        };
        fetchTags();
    }, []);

    // Timer logic
    useEffect(() => {
        let interval = null;
        if (timerRunning && timer > 0) {
            interval = setInterval(() => setTimer(t => t - 1), 1000);
        } else if (timer === 0 && timerRunning) {
            setTimerRunning(false);
            handleSubmit();
        }
        return () => clearInterval(interval);
    }, [timer, timerRunning]);

    const handleTagChange = (tag) => {
        setSelectedTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
        );
    };

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
            const response = await axios.post(`${host}/api/question-paper`, { tags: selectedTags });
            setQuestions(response.data);
        } catch (error) {
            setError('Error fetching questions. Please try again.');
        }
        setLoadingQuestions(false);
    };

    const handleStartTest = (minutes) => {
        const timerValue = minutes * 60;
        setOriginalTimerValue(timerValue);
        setTimer(timerValue);
        setTimerRunning(true);
        setShowTest(true);
        setTestStartTime(Date.now());
    };

    const handleAnswer = (optionIndex) => {
        setUserAnswers({
            ...userAnswers,
            [questions[currentQuestion]._id]: optionIndex
        });
    };

    const handleNext = () => {
        setCurrentQuestion(q => Math.min(q + 1, questions.length - 1));
    };

    const handlePrev = () => {
        setCurrentQuestion(q => Math.max(q - 1, 0));
    };

    // Always generate questions and topicAccuracy if missing from backend report
    const enrichReport = (serverReport) => {
        // Record test end time
        const endTime = Date.now();
        setTestEndTime(endTime);

        // Calculate time taken in seconds (time elapsed since start)
        const timeTaken = testStartTime ? Math.floor((endTime - testStartTime) / 1000) : null;
        const calculatedTimeTaken = originalTimerValue - timer;
        const finalTimeTaken = calculatedTimeTaken > 0 ? calculatedTimeTaken : timeTaken;
        const avgTimePerQ = finalTimeTaken ? finalTimeTaken / questions.length : null;

        // Per-question details
        let unattempted = 0;
        let score = 0;
        const questionsWithDetails = questions.map(q => {
            const userAnswer = userAnswers[q._id];
            const isCorrect = userAnswer === q.correctOption;
            if (userAnswer === undefined) unattempted++;
            if (isCorrect) score++;
            return {
                ...q,
                userAnswer,
                isCorrect
            };
        });

        // Topic accuracy
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

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setTimerRunning(false);
        setError('');
        setSubmitting(true);

        try {
            const response = await axios.post(`${host}/api/submit-answers`, {
                userId: user._id,
                userAnswers,
                startTime: testStartTime
            });

            // Always enrich the report to guarantee required fields
            setReport(enrichReport(response.data));

            const performanceResponse = await axios.get(
                `${host}/api/user-performance/${user._id}`
            );
            setPerformance(performanceResponse.data);

        } catch (error) {
            setError(error.response?.data?.message || 'Error submitting answers. Please try again.');
        } finally {
            setSubmitting(false);
            setShowTest(false);
        }
    };

    // Tag search/filter logic: show only 12 tags at a time, scrollable
    const filteredTags = availableTags
        .filter(tag => tag.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 12);

    // Timer display
    const timerDisplay = `${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`;

    return (
        <>
            <Navbar />
            <div style={{
                maxWidth: '1200px',
                minHeight: '700px',
                margin: '32px auto',
                padding: '0 16px',
                width: '100vw',
                boxSizing: 'border-box'
            }}>
                <h1 style={{ color: '#1976d2', marginBottom: 10 }}>📝 Start Test</h1>
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
                {error && <div style={{ color: '#d32f2f', margin: '18px 0', fontWeight: 600 }}>{error}</div>}
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
