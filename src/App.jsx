// import React, { useState, useEffect } from "react";
// import Navbar from "./components/Navbar";
// import QuestionDetails from "./components/QuestionDetails";
// import IDE from "./components/IDE";
// import ResultModal from "./components/ResultModal";
// import "./App.css";

// const App = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [result, setResult] = useState(null);
//   const [code, setCode] = useState("");
//   const [currentTopic, setCurrentTopic] = useState("linked-list"); // Default topic
//   const [loading, setLoading] = useState(false);

//   // Fetch questions for the current topic
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`http://localhost:5000/api/questions/${currentTopic}`);
//         const data = await response.json();
//         if (data.length > 0) {
//           setQuestions(data);
//           setCurrentQuestionIndex(0);
//         } else {
//           setQuestions([]);
//         }
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [currentTopic]);

//   const handleRunCode = async () => {
//     const currentQuestion = questions[currentQuestionIndex];
//     if (!currentQuestion) return;

//     try {
//       const response = await fetch("http://localhost:5000/api/execution/run", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           code,
//           language: "python3", // Default language
//           testCases: currentQuestion.testCases,
//         }),
//       });

//       const data = await response.json();
//       setResult(data.results);
//     } catch (error) {
//       console.error("Error running code:", error);
//     }
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setResult(null);
//       setCode(""); // Reset code for the new question
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   if (!questions.length) return <div>No questions available for this topic.</div>;

//   return (
//     <div className="app">
//       <Navbar />
//       <div className="main-container">
//         <QuestionDetails question={questions[currentQuestionIndex]} />
//         <IDE code={code} setCode={setCode} onRun={handleRunCode} />
//       </div>
//       <div className="button-container">
//         <button
//           className="next-button"
//           onClick={handleNextQuestion}
//           disabled={currentQuestionIndex === questions.length - 1}
//         >
//           Next Question
//         </button>
//       </div>
//       <ResultModal result={result} onClose={() => setResult(null)} />
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import QuestionDetails from "./components/QuestionDetails";
import IDE from "./components/IDE";
import ResultModal from "./components/ResultModal";
import "./App.css";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [code, setCode] = useState("");
  const [currentTopic, setCurrentTopic] = useState("linked-list");
  const [loading, setLoading] = useState(false);

  // Fetch questions for the current topic
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        console.log(`Fetching questions for topic: ${currentTopic}`);
        const response = await fetch(`http://localhost:5000/api/questions/${currentTopic}`);
        const data = await response.json();
        console.log("Fetched questions:", data);

        if (data.length > 0) {
          setQuestions(data);
          setCurrentQuestionIndex(0);
        } else {
          setQuestions([]);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [currentTopic]);

  const handleRunCode = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    try {
      console.log("Executing code...");
      const response = await fetch("http://localhost:5000/api/execution/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language: "python3", // Default language
          testCases: currentQuestion.testCases,
        }),
      });

      const data = await response.json();
      console.log("Execution results:", data);
      setResult(data.results);
    } catch (error) {
      console.error("Error running code:", error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setResult(null);
      setCode(""); // Reset code for the new question
      console.log(`Switched to question index: ${currentQuestionIndex + 1}`);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!questions.length) return <div>No questions available for this topic.</div>;

  return (
    <div className="app">
      <Navbar />
      <div className="main-container">
        <QuestionDetails question={questions[currentQuestionIndex]} />
        <IDE code={code} setCode={setCode} onRun={handleRunCode} />
      </div>
      <div className="button-container">
        <button
          className="next-button"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next Question
        </button>
      </div>
      <ResultModal result={result} onClose={() => setResult(null)} />
    </div>
  );
};

export default App;
