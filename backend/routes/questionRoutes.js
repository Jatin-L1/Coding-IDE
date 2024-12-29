const express = require("express");
const Question = require("../models/Question");

const router = express.Router();

// Fetch questions by topic
router.get("/:topic", async (req, res) => {
  try {
    const { topic } = req.params;
    const questions = await Question.find({ topic });
    if (questions.length === 0) {
      return res.status(404).json({ error: "No questions available for this topic." });
    }
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

module.exports = router;
