const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");
const { seedResources } = require("../seed/seedData");

router.get("/", async (req, res) => {
  try {
    const { careerPath, type, difficulty } = req.query;
    const filter = {};
    if (careerPath) filter.careerPath = careerPath;
    if (type) filter.type = type;
    if (difficulty) filter.difficulty = difficulty;

    let resources = await Resource.find(filter);
    if (resources.length === 0 && Object.keys(filter).length === 0) {
      await seedResources();
      resources = await Resource.find();
    }
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
