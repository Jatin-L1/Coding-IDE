const express = require("express");
const { runCode } = require("../controllers/executionController");
const router = express.Router();

// Route for code execution
router.post("/run", runCode);

module.exports = router;
