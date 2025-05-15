import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoanCalculator from "./LoanCalculator";
import LoginModal from "./components/LoginModal";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ComparePage from "./pages/ComparePage";
import ChartPage from "./pages/ChartPage";
import "./App.css";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    console.log("useEffect is running");

    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/status`, {
          withCredentials: true, 
        });

        console.debug("Auth status response:", response.data);

        if (response.data.email) {
          setIsLoggedIn(true);
          setUserEmail(response.data.email);
          console.debug("User is logged in with email:", response.data.email);
        } else {
          console.debug("User is not logged in.");
        }
      } catch (error) {
        console.error("Failed to fetch auth status:", error);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsLoggedIn(true);
        setUserEmail(response.data.email);
        console.debug("Login successful with email:", response.data.email);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
  };

  return (
    <Router>
      <div
        className="app-container d-flex flex-column"
        style={{
          minHeight: "100vh",
          width: "100%",
          maxWidth: "100vw",
          backgroundImage: "url(/background.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Navbar
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          onLoginClick={handleLogout}
          onShowLoginModal={() => setShowLoginModal(true)}
        />

        <div
          className="flex-grow-1 d-flex flex-column"
          style={{ overflowY: "auto" }}
        >
          <div className="container mt-4 flex-grow-1">
            <Routes>
              <Route
                path="/"
                element={
                  <ErrorBoundary>
                    <LoanCalculator
                      onRequireLogin={() => setShowLoginModal(true)}
                    />
                  </ErrorBoundary>
                }
              />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/chart" element={<ChartPage />} />
              <Route
                path="/login"
                element={
                  <LoginModal
                    show={false}
                    onClose={() => {}}
                    onLogin={() => {}}
                  />
                }
              />
            </Routes>
          </div>
        </div>

        <LoginModal
          show={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      </div>
    </Router>
  );
}

export default App;
