import React from "react";
import "./ResultModal.css";

const ResultModal = ({ result, onClose }) => {
  if (!result) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Execution Result</h2>
        {result.map((testCase, index) => (
          <div key={index} className="test-case-result">
            <h3>Test Case {index + 1}:</h3>
            <p>
              <strong>Input:</strong> {testCase.input}
            </p>
            <p>
              <strong>Output:</strong> {testCase.output}
            </p>
            <p>
              <strong>Expected:</strong> {testCase.expected}
            </p>
            <p>
              <strong>Result:</strong>{" "}
              {testCase.passed ? (
                <span className="passed">Passed ✅</span>
              ) : (
                <span className="failed">Failed ❌</span>
              )}
            </p>
            {testCase.error && (
              <p>
                <strong>Error:</strong> {testCase.error}
              </p>
            )}
          </div>
        ))}
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
