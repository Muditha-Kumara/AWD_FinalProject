import React, { useState } from 'react';
import axios from 'axios';

function SaveCalculationModal({ show, onClose, onSaveSuccess, calculation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const payload = {
        title,
        description,
        ...calculation
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/calculations/save`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLoading(false);
      onSaveSuccess();
    } catch (err) {
      setLoading(false);
      setError('Failed to save calculation.');
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Save Calculation</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description (optional)</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <strong>Loan Type:</strong> {calculation.loanTypeName}<br/>
                <strong>Loan Amount:</strong> ${calculation.loanAmount}<br/>
                <strong>Interest Rate:</strong> {calculation.interestRate}%<br/>
                <strong>Term:</strong> {calculation.term} {calculation.termType}<br/>
                <strong>Monthly Payment:</strong> ${calculation.monthlyPayment}
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaveCalculationModal;
