const express = require("express");
const router = express.Router();
const CareerPath = require("../models/CareerPath");
const { seedCareers } = require("../seed/seedData");

// GET all career paths
router.get("/", async (req, res) => {
  try {
    let careers = await CareerPath.find();
    if (careers.length === 0) {
      await seedCareers();
      careers = await CareerPath.find();
    }
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single career path by slug
router.get("/:slug", async (req, res) => {
  try {
    const career = await CareerPath.findOne({ slug: req.params.slug });
    if (!career)
      return res.status(404).json({ message: "Career path not found" });
    res.json(career);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new career path
router.post("/", async (req, res) => {
  try {
    const career = new CareerPath(req.body);
    const saved = await career.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Seed endpoint
router.post("/seed", async (req, res) => {
  try {
    await seedCareers();
    const careers = await CareerPath.find();
    res.json({ message: "Database seeded!", count: careers.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
