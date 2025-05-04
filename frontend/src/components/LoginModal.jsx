import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginModal({ show, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        onLogin(data.token); // Pass the token to the parent component
        setError('');
      } else if (response.status === 404) {
        setError('User not found');
      } else if (response.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;