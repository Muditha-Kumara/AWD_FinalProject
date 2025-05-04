import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

function calculateAmortizationSchedule({ loanAmount, interestRate, term, termType }) {
  const principal = parseFloat(loanAmount);
  const rate = parseFloat(interestRate);
  const nPayments = termType && termType.toLowerCase().startsWith('y') ? parseInt(term) * 12 : parseInt(term);
  const monthlyInterest = rate / 100 / 12;
  if (!principal || !rate || !nPayments) return { payments: [], balances: [] };
  const payment = (principal * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -nPayments));
  let balance = principal;
  const balances = [];
  for (let i = 1; i <= nPayments; i++) {
    const interest = balance * monthlyInterest;
    const principalPaid = payment - interest;
    balance = balance - principalPaid;
    balances.push(balance > 0 ? balance : 0);
  }
  return { payments: Array(nPayments).fill(payment), balances };
}

function getChartData(loans) {
  if (!loans || loans.length === 0) return null;
  const maxTerm = Math.max(...loans.map(l => l.termType && l.termType.toLowerCase().startsWith('y') ? parseInt(l.term) * 12 : parseInt(l.term)));
  const labels = Array.from({ length: maxTerm }, (_, i) => `Month ${i + 1}`);
  const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1', '#fd7e14'];
  let datasets = [];
  loans.forEach((loan, idx) => {
    const { balances } = calculateAmortizationSchedule(loan);
    const paddedBalances = Array.from({ length: maxTerm }, (_, i) => i < balances.length ? balances[i] : null);
    datasets.push({
      label: loan.title + ' - Remaining Balance',
      data: paddedBalances,
      fill: false,
      borderColor: colors[idx % colors.length],
      backgroundColor: colors[idx % colors.length],
      tension: 0.1,
    });
  });
  return { labels, datasets };
}

function ComparePage() {
  const [calculations, setCalculations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [showLimitPopup, setShowLimitPopup] = useState(false);

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

  const handleCheckbox = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      } else if (prev.length < 3) {
        return [...prev, id];
      } else {
        setShowLimitPopup(true);
        return prev; // Do not add more than 3
      }
    });
  };

  const selectedLoans = calculations.filter(l => selectedIds.includes(l.id));
  const chartData = getChartData(selectedLoans);

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4" >
      <h2>Compare Saved Calculations</h2>
      {calculations.length === 0 ? (
        <div>No calculations found.</div>
      ) : (
        <div style={{ maxHeight: 350, overflowY: 'auto', overflowX: 'auto', border: '1px solid #ddd', borderRadius: 6 }}>
          <table className="table table-bordered mt-4 mb-0" style={{ minWidth: 900 }}>
            <thead>
              <tr>
                <th>Select</th>
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
                <tr key={calc.id}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(calc.id)}
                      onChange={() => handleCheckbox(calc.id)}
                    />
                  </td>
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
        </div>
      )}
      {showLimitPopup && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Selection Limit</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowLimitPopup(false)}></button>
              </div>
              <div className="modal-body">
                <p>You can only select up to 3 loans for comparison.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => setShowLimitPopup(false)}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedLoans.length > 0 && (
        <>
          <div className="mt-4 d-flex flex-wrap text-start gap-3">
            {selectedLoans.map((loan, idx) => (
              <div className="me-4" key={loan.id} style={{borderLeft: `4px solid ${['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1', '#fd7e14'][idx % 7]}`, paddingLeft: 8}}>
                <p className="mb-1"><strong>{loan.title}</strong></p>
                <p className="mb-1">Loan Type: {loan.loanTypeName || "N/A"}</p>
                <p className="mb-1">Monthly Payment: ${loan.monthlyPayment}</p>
                <p className="mb-1">Loan Amount: ${loan.loanAmount}</p>
                <p className="mb-1">Interest Rate: {loan.interestRate}%</p>
                <p className="mb-1">Term: {loan.term} {loan.termType === 'months' ? 'months' : 'years'}</p>
              </div>
            ))}
          </div>
          <div className="mt-4" style={{ overflowX: 'auto', background: '#f8f9fa', border: '1px solid #ddd', borderRadius: 6, padding: 16, minWidth: 600 }}>
            <div style={{ minWidth: 900, height: 400 }}>
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: true },
                    title: { display: false },
                  },
                  scales: {
                    x: { title: { display: true, text: selectedLoans.every(l => l.termType === 'months') ? 'Number of Payments (Months)' : 'Number of Payments (Years)' } },
                    y: { title: { display: true, text: 'Remaining Balance ($)' }, beginAtZero: true },
                  },
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ComparePage;