const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["Course", "Book", "Tutorial", "Tool", "Community"],
      required: true,
    },
    url: { type: String },
    description: { type: String },
    careerPath: { type: String },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    free: { type: Boolean, default: false },
    rating: { type: Number, min: 0, max: 5 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Resource", resourceSchema);
