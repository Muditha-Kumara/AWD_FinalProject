import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
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
  const [selectedLoanTypeName, setSelectedLoanTypeName] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [term, setTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [termType, setTermType] = useState('years');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch loan types and interest rates from backend API
    fetch(`${import.meta.env.VITE_API_URL}/loans`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch loan types');
        }
        return response.json();
      })
      .then((data) => setLoanTypes(data))
      .catch((error) => {
        console.error('Error fetching loan types:', error);
        alert('Error fetching loan types: ' + error.message); // Show popup
        setLoanTypes([{ id: 'error', name: 'Error fetching loan types', interestRate: 0 }]); // Display error on webpage
      });
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

      // Navigate to the chart page with data
      navigate('/chart', {
        state: {
          chartData: newChartData,
          monthlyPayment: payment.toFixed(2),
          loanType: selectedLoanType,
          loanTypeName: selectedLoanTypeName,
          loanAmount: principal,
          interestRate: interestRate,
          term: term,
          termType: termType
        }
      });
    } else {
      alert('Please fill in all fields with valid numbers.');
    }
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
                  setSelectedLoanTypeName(type.name);
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
              onChange={() => {
                setTermType('years');
                setTerm('');
              }}
            />
            <label className="form-check-label">Years</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="termType"
              value="months"
              onChange={() => {
                setTermType('months');
                setTerm('');
              }}
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