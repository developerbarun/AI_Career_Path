const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [
      {
        text: String,
        careerWeights: {
          type: Map,
          of: Number,
        },
      },
    ],
    category: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Quiz", quizSchema);
