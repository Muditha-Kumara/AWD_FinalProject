import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoanCalculator from './LoanCalculator';
import LoginModal from './components/LoginModal';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComparePage from './pages/ComparePage';
import './App.css'; // Add custom styles
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (token) => {
    try {
      // Decode the JWT token to extract the email
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Assuming JWT token
      const email = decodedToken.email;

      if (email) {
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
        setUserEmail(email);
      } else {
        console.error('Email not found in token');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }

    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <Router>
      <div className="app-container" style={{ minHeight: '100vh', width: '100%', maxWidth: '100vw', backgroundImage: 'url(/public/background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Navbar
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          onLoginClick={handleLogout}
          onShowLoginModal={() => setShowLoginModal(true)}
        />

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={
              <ErrorBoundary>
                <LoanCalculator onRequireLogin={() => setShowLoginModal(true)} />
              </ErrorBoundary>
            } />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </div>

        <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
      </div>
    </Router>
  );
}

export default App;
