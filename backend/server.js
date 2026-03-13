const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const careerRoutes = require("./routes/careerRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err.message));

// Routes
app.use("/api/careers", careerRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/quiz", quizRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "AI Career Path API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
