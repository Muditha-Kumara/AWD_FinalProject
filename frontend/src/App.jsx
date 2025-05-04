import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoanCalculator from './LoanCalculator';
import LoginModal from './components/LoginModal';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComparePage from './pages/ComparePage';
import ChartPage from './pages/ChartPage';
import './App.css'; // Add custom styles
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  // Accept both token and email from LoginModal
  const handleLogin = (token, email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <Router>
      <div className="app-container d-flex flex-column" style={{ minHeight: '100vh', width: '100%', maxWidth: '100vw', backgroundImage: 'url(/public/background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Navbar
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          onLoginClick={handleLogout}
          onShowLoginModal={() => setShowLoginModal(true)}
        />

        <div className="flex-grow-1 d-flex flex-column" style={{ overflowY: 'auto' }}>
          <div className="container mt-4 flex-grow-1">
            <Routes>
              <Route path="/" element={
                <ErrorBoundary>
                  <LoanCalculator onRequireLogin={() => setShowLoginModal(true)} />
                </ErrorBoundary>
              } />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/chart" element={<ChartPage />} />
            </Routes>
          </div>
        </div>

        <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
      </div>
    </Router>
  );
}

export default App;
