import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import {QuestionForm} from './components/QuestionFormManager';
import QuestionPaperPage from './components/QuestionPaper';
import SyncUser from "./components/SyncUser";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthProvider from './context/AuthContext';
import ClassJoinPage from "./pages/ClassJoinPage";
import { ClassProvider } from './context/ClassContext';
import ClassManager from "./components/ClassManager/ClassManager";
// Optional: Simple NotFound component for unmatched routes
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
  return (
    <BrowserRouter>
      <AuthProvider>
      <ClassProvider>
      <Routes>
        <Route path='/' element={<SyncUser />}/>
        <Route path='/home' element={<Home />} />
        <Route path='/add-question' element={<QuestionForm />} />
        <Route path='/question-paper' element={<QuestionPaperPage />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path="/join/:enrollmentCode" element={<ClassJoinPage />} />
        <Route path="/class" element={<ClassManager/>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
      </ClassProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
