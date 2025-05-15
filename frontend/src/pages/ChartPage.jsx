import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginModal from "../components/LoginModal";
import SaveCalculationModal from "../components/SaveCalculationModal";
import Cookies from 'js-cookie';

function ChartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { chartData, monthlyPayment, loanType, loanTypeName, loanAmount, interestRate, term, termType } = location.state || {};
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      navigate('/login');
    } else {
      // fetchData(token); // Uncomment and implement fetchData if needed
    }
  }, [navigate]);

  if (!chartData || !monthlyPayment) {
    return (
      <div className="container mt-4">
        No data available to display the chart.
      </div>
    );
  }

  const handleSaveClick = () => {
    const token = Cookies.get('token');
    if (!token) {
      setShowLoginModal(true);
    } else {
      setShowSaveModal(true);
    }
  };

  const handleSaveSuccess = () => {
    setShowSaveModal(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="container mt-4">
      <h2>Loan Payment Chart</h2>
      <div className="mt-4 d-flex flex-wrap text-start gap-3">
        <div className="me-3">
          <p>Loan Type: {loanTypeName || "N/A"}</p>
        </div>
        <div className="me-3">
          <p>Monthly Payment: ${monthlyPayment }</p>
        </div>
        <div className="me-3">
          <p>Loan Amount: ${loanAmount }</p>
        </div>
        <div className="me-3">
          <p>Interest Rate: {interestRate}%</p>
        </div>
        <div className="me-3">
          <p>Term: {term || "0"} {termType === 'months' ? 'months' : 'years'}</p>
        </div>
      </div>
      <div className="mt-4" style={{ height: "400px", width: "100%" }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: false,
                text: "Loan Payment Chart",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Number of Payments",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Remaining Balance ($)",
                },
              },
            },
          }}
        />
      </div>
      <div className="mt-4 d-flex justify-content-end">
        <button className="btn btn-primary" onClick={handleSaveClick}>Save</button>
      </div>
      {saveSuccess && (
        <div className="alert alert-success mt-3">Calculation saved successfully!</div>
      )}
      <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={() => { setShowLoginModal(false); setShowSaveModal(true); }} />
      {showSaveModal && (
        <SaveCalculationModal
          show={showSaveModal}
          onClose={() => setShowSaveModal(false)}
          onSaveSuccess={handleSaveSuccess}
          calculation={{
            chartData,
            monthlyPayment,
            loanType,
            loanTypeName,
            loanAmount,
            interestRate,
            term,
            termType
          }}
        />
      )}
    </div>
  );
}

export default ChartPage;
