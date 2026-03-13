const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const { seedQuiz } = require("../seed/seedData");

router.get("/", async (req, res) => {
  try {
    let questions = await Quiz.find();
    if (questions.length === 0) {
      await seedQuiz();
      questions = await Quiz.find();
    }
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST quiz results - calculate best career match
router.post("/results", (req, res) => {
  try {
    const { answers } = req.body;
    const scores = {};

    answers.forEach((answer) => {
      if (answer.careerWeights) {
        Object.entries(answer.careerWeights).forEach(([career, weight]) => {
          scores[career] = (scores[career] || 0) + weight;
        });
      }
    });

    const sorted = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([career, score]) => ({ career, score }));

    res.json({ results: sorted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
