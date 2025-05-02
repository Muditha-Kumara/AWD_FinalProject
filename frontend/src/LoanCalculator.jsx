import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LoanCalculator() {
  const chartRef = useRef(null); // Reference to the chart container
  const chartInstanceRef = useRef(null); // Reference to the chart instance
  const [loanTypes, setLoanTypes] = useState([]);
  const [selectedLoanType, setSelectedLoanType] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [term, setTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch loan types and interest rates from backend API
    fetch('http://localhost:5000/api/loans')
      .then((response) => response.json())
      .then((data) => setLoanTypes(data))
      .catch((error) => console.error('Error fetching loan types:', error));
  }, []);

  useEffect(() => {
    return () => {
      // Ensure proper cleanup of the chart instance on unmount
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  const calculateLoan = () => {
    if (!chartRef.current) {
      console.warn('Chart container is not available.');
      return;
    }

    const principal = parseFloat(loanAmount);
    const monthlyInterest = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseInt(term) * 12;

    if (principal && monthlyInterest && numberOfPayments) {
      const payment =
        (principal * monthlyInterest) /
        (1 - Math.pow(1 + monthlyInterest, -numberOfPayments));
      setMonthlyPayment(payment.toFixed(2));

      // Generate chart data
      const payments = Array.from({ length: numberOfPayments }, (_, i) => i + 1);
      const balances = payments.map((n) =>
        principal * Math.pow(1 + monthlyInterest, n) -
        payment * ((Math.pow(1 + monthlyInterest, n) - 1) / monthlyInterest)
      );
      const newChartData = {
        labels: payments,
        datasets: [
          {
            label: 'Remaining Balance',
            data: balances,
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
          },
        ],
      };

      setChartData(newChartData);

      // Destroy the previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    } else {
      alert('Please fill in all fields with valid numbers.');
    }
  };

  const handleSave = () => {
    // Check if user is logged in and save data
    const isLoggedIn = false; // Replace with actual login check
    if (!isLoggedIn) {
      alert('Please log in to save your calculation.');
      // Trigger login popup here
    } else {
      fetch('/api/save-calculation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loanAmount, term, interestRate, monthlyPayment }),
      })
        .then((response) => {
          if (response.ok) alert('Calculation saved successfully!');
          else alert('Failed to save calculation.');
        })
        .catch((error) => console.error('Error saving calculation:', error));
    }
  };

  const handleAddToCompare = () => {
    fetch('/api/add-to-compare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loanAmount, term, interestRate, monthlyPayment }),
    })
      .then((response) => {
        if (response.ok) alert('Added to compare successfully!');
        else alert('Failed to add to compare.');
      })
      .catch((error) => console.error('Error adding to compare:', error));
  };

  return (
    <div className="container mt-4" ref={chartRef}>
      <h2>Loan Calculator</h2>
      <div className="mb-3">
        <label className="form-label">Select Loan Type</label>
        <div>
          {loanTypes.map((type) => (
            <div key={type.id} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="loanType"
                value={type.id}
                onChange={() => {
                  setSelectedLoanType(type.id);
                  setInterestRate(type.interestRate);
                }}
              />
              <label className="form-check-label">{type.name} ({type.interestRate}%)</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="loanAmount" className="form-label">Loan Amount</label>
        <input
          type="number"
          className="form-control"
          id="loanAmount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="term" className="form-label">Term</label>
        <div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="termType"
              value="years"
              defaultChecked
              onChange={() => setTerm('')}
            />
            <label className="form-check-label">Years</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="termType"
              value="months"
              onChange={() => setTerm('')}
            />
            <label className="form-check-label">Months</label>
          </div>
        </div>
        <input
          type="number"
          className="form-control mt-2"
          id="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter term"
        />
      </div>
      <button className="btn btn-primary me-2" onClick={calculateLoan}>Calculate</button>
      <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
      <button className="btn btn-warning" onClick={handleAddToCompare}>Add to Compare</button>

      {monthlyPayment && (
        <div className="mt-4">
          <h5>Monthly Payment: ${monthlyPayment}</h5>
        </div>
      )}

      {chartData && (
        <div className="mt-4">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
            ref={(chart) => {
              if (chart) {
                chartInstanceRef.current = chart;
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default LoanCalculator;