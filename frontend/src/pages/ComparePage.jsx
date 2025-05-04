import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ComparePage() {
  const [calculations, setCalculations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCalculations = async () => {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to view saved calculations.');
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/loans/calculations/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Map snake_case/lowercase fields to camelCase for frontend
        const mapped = res.data.map(calc => ({
          id: calc.id || calc._id,
          title: calc.title,
          description: calc.description,
          loanTypeName: calc.loantypename || calc.loanTypeName,
          loanAmount: calc.loanamount || calc.loanAmount,
          interestRate: calc.interestrate || calc.interestRate,
          term: calc.term,
          termType: calc.termtype || calc.termType,
          monthlyPayment: calc.monthlypayment || calc.monthlyPayment,
        }));
        setCalculations(mapped);
      } catch (err) {
        if (err.response) {
          if (err.response.status === 403) {
            setError('Access denied. Please log in again or check your permissions.');
          } else if (err.response.status === 401) {
            setError('Session expired. Please log in again.');
          } else if (err.response.status === 500) {
            setError('Server error. Please try again later.');
          } else {
            setError(`Error: ${err.response.statusText}`);
          }
        } else {
          setError('Failed to load calculations.');
        }
      }
      setLoading(false);
    };
    fetchCalculations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2>Saved Calculations</h2>
      {calculations.length === 0 ? (
        <div>No calculations found.</div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Loan Type</th>
              <th>Loan Amount</th>
              <th>Interest Rate</th>
              <th>Term</th>
              <th>Monthly Payment</th>
            </tr>
          </thead>
          <tbody>
            {calculations.map(calc => (
              <tr key={calc._id || calc.id}>
                <td>{calc.title}</td>
                <td>{calc.description}</td>
                <td>{calc.loanTypeName}</td>
                <td>${calc.loanAmount}</td>
                <td>{calc.interestRate}%</td>
                <td>{calc.term} {calc.termType}</td>
                <td>${calc.monthlyPayment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ComparePage;