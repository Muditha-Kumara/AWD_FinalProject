import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBalanceScale, faUser, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import SignUpModal from './SignUpModal';

function Navbar({ isLoggedIn, userEmail, onLoginClick, onShowLoginModal }) {
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUpModal(true);
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <FontAwesomeIcon icon={faHome} /> LoanApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/compare">
                  <FontAwesomeIcon icon={faBalanceScale} /> Compare
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/history">
                  <FontAwesomeIcon icon={faUser} /> History
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link">
                      <FontAwesomeIcon icon={faUser} /> {userEmail}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={onLoginClick}>
                      <FontAwesomeIcon icon={faSignInAlt} /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={onShowLoginModal}>
                      <FontAwesomeIcon icon={faSignInAlt} /> Login
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={handleSignUpClick}>
                      <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {showSignUpModal && <SignUpModal onClose={handleCloseSignUpModal} />}
    </>
  );
}

export default Navbar;