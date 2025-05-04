import React from "react";
import { useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";

function ChartPage() {
  const location = useLocation();
  const { chartData, monthlyPayment, loanType, loanTypeName, loanAmount, interestRate, term, termType } = location.state || {};

  if (!chartData || !monthlyPayment) {
    return (
      <div className="container mt-4">
        No data available to display the chart.
      </div>
    );
  }

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
        <button className="btn btn-primary">Save</button>
      </div>
    </div>
  );
}

export default ChartPage;
