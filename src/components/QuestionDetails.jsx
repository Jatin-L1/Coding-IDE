import React from "react";
import "./QuestionDetails.css";

const QuestionDetails = ({ question }) => {
  if (!question) return null;

  return (
    <div className="question-container">
      <h2 className="question-title">{question.title}</h2>
      <p className="question-description">{question.description}</p>
      <div className="question-format">
        <h3>Input Format:</h3>
        <p>{question.inputFormat}</p>
        <h3>Output Format:</h3>
        <p>{question.outputFormat}</p>
      </div>
    </div>
  );
};

export default QuestionDetails;
