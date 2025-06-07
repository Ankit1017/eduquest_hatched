import React, { useContext } from 'react';
import {Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import { QuestionForm } from './components/QuestionFormManager';
import QuestionPaperPage from './components/QuestionPaper';
import SyncUser from "./components/SyncUser";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from './context/AuthContext';
import { ClassProvider } from './context/ClassContext';
import ClassManager from "./components/ClassManager/ClassManager";
import JoinClassPage from './pages/JoinClassPage'; // <-- Import your new page

const NotFound = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1976d2'
  }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: 10 }}>404</h1>
    <p style={{ fontSize: '1.2rem' }}>Page Not Found</p>
  </div>
);

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading ...</div>
  }

  return (
    <ClassProvider>
      <Routes>
        {
          user ? (
            <>
              <Route path='/' element={<Home />} />
              <Route path='/add-question' element={<QuestionForm />} />
              <Route path='/question-paper' element={<QuestionPaperPage />} />
              <Route path='/admin' element={<AdminPanel />} />
              <Route path="/class" element={<ClassManager />} />
              <Route path="/join/:classId" element={<JoinClassPage />} /> {/* <-- Add this */}
              <Route path='*' element={<NotFound />} />
            </>
          ) :
            (
              <>
                {/* If not logged in, redirect all to SyncUser */}
                <Route path='*' element={<SyncUser />} />
              </>
            )
        }
      </Routes>
    </ClassProvider>
  );
};

export default App;
