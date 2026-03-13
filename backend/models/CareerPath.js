const mongoose = require("mongoose");

const careerPathSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    icon: { type: String },
    color: { type: String },
    salaryRange: {
      min: Number,
      max: Number,
      currency: { type: String, default: "USD" },
    },
    demandLevel: {
      type: String,
      enum: ["High", "Very High", "Extreme"],
      default: "High",
    },
    skills: [
      {
        name: String,
        level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
      },
    ],
    roadmap: [
      {
        phase: Number,
        title: String,
        duration: String,
        topics: [String],
      },
    ],
    tools: [String],
    companies: [String],
    prerequisites: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model("CareerPath", careerPathSchema);
