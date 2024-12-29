
const axios = require("axios");

const runCode = async (req, res) => {
  const { code, language, testCases } = req.body;

  try {
    const results = [];
    for (const testCase of testCases) {
      const { input, output: expected } = testCase;

      const payload = {
        language, // e.g., "python3"
        version: "*", // Latest version
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

module.exports = { runCode };
