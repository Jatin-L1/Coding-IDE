const axios = require("axios");
const Question = require("../models/Question");

// Code execution using Piston API
const runCode = async (req, res) => {
  const { code, language, testCases } = req.body;

  try {
    const results = [];
    for (const testCase of testCases) {
      const { input, output: expected } = testCase;

      const payload = {
        language: language, // e.g., "python3", "java", "cpp"
        version: "*", // Use the latest available version
        files: [{ name: "code", content: code }],
        stdin: input, // Test case input
      };

      const response = await axios.post("https://emkc.org/api/v2/piston/execute", payload, {
        headers: { "Content-Type": "application/json" },
      });

      const output = response.data.run.output.trim();
      const error = response.data.run.stderr || response.data.compile?.stderr;

      results.push({
        input,
        output: output || null,
        expected,
        passed: output === expected,
        error: error || null,
      });
    }

    res.json({ results });
  } catch (error) {
    console.error("Error during code execution:", error.message);
    res.status(500).json({ error: "Execution failed", details: error.message });
  }
};

// Fetch all questions for a topic
const getQuestionsByTopic = async (req, res) => {
  try {
    const { topic } = req.params;
    const questions = await Question.find({ topic });
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

module.exports = { runCode, getQuestionsByTopic };
