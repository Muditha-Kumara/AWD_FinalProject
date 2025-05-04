import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ComparePage() {
  const [comparisons, setComparisons] = useState([]);

  useEffect(() => {
    // Fetch comparison data from backend
    fetch(`${import.meta.env.VITE_API_URL}/compare`)
      .then((response) => response.json())
      .then((data) => setComparisons(data))
      .catch((error) => console.error('Error fetching comparison data:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Compare Loan Scenarios</h2>
      {comparisons.length > 0 ? (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Loan Amount</th>
              <th>Term (Years)</th>
              <th>Interest Rate (%)</th>
              <th>Monthly Payment</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((comparison, index) => (
              <tr key={index}>
                <td>{comparison.loanAmount}</td>
                <td>{comparison.term}</td>
                <td>{comparison.interestRate}</td>
                <td>{comparison.monthlyPayment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No comparisons available. Add some scenarios to compare.</p>
      )}
    </div>
  );
}

export default ComparePage;