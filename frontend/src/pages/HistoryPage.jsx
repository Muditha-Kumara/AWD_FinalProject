import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HistoryPage() {
  const [calculations, setCalculations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCalculations = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/loans/calculations/all`, {
          withCredentials: true,
        });
        setCalculations(res.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate('/'); // Redirect to home if not logged in
        } else {
          setError('Failed to load history. Please try again later.');
        }
      }
      setLoading(false);
    };

    fetchCalculations();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>History</h2>
      {calculations.length === 0 ? (
        <p>No saved loans found.</p>
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
            {calculations.map((calc) => (
              <tr key={calc.id}>
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

export default HistoryPage;