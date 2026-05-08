const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserProfile = require("../models/UserProfile");
const {
  generateCareerPath,
  enrichPathWithResources,
  extractInterestsFromQuizAnswers,
} = require("../services/geminiService");

/**
 * Generate a new career path based on quiz answers
 * POST /api/paths/generate
 */
router.post("/generate", async (req, res) => {
  try {
    const { quizAnswers, userId, matchPercent } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    if (!quizAnswers || quizAnswers.length === 0) {
      return res.status(400).json({ message: "quizAnswers are required" });
    }

    // Extract interests from quiz answers
    const interests = extractInterestsFromQuizAnswers(quizAnswers);
    console.log("Step 1: Extracted interests:", interests);

    // Generate career path using Gemini
    let careerPath = await generateCareerPath(quizAnswers, interests);
    console.log("Step 2: Generated career path:", careerPath.careerTitle);

    // Get career slug for resource matching
    const careerSlug = careerPath.careerTitle
      .toLowerCase()
      .replace(/\s+/g, "-");
    console.log("Step 3: Career slug:", careerSlug);

    // Enrich path with resources for each topic
    careerPath = await enrichPathWithResources(careerPath, careerSlug);
    console.log("Step 4: Enriched path with resources");

    // Get or create user profile
    let userProfile = await UserProfile.findOne({ userId });
    console.log("Step 5: Found or creating user profile");
    if (!userProfile) {
      userProfile = new UserProfile({
        userId,
        generatedPaths: [],
        savedResources: [],
      });
    }

    // Add new generated path
    console.log("Step 6: Creating new ObjectId...");
    const newPathId = new mongoose.Types.ObjectId();
    console.log("Step 7: Created ObjectId:", newPathId);

    const pathData = {
      pathId: newPathId,
      generatedAt: new Date(),
      careerTitle: careerPath.careerTitle,
      careerSlug: careerSlug,
      matchPercent:
        typeof matchPercent === "number"
          ? Math.max(0, Math.min(100, Math.round(matchPercent)))
          : undefined,
      quizAnswersSummary: interests,
      pathData: careerPath,
      customizations: {
        addedTopics: [],
        removedTopics: [],
        editedPhases: [],
      },
      completedTopics: [],
    };

    console.log("Step 8: Replacing existing generated path for career slug");
    userProfile.generatedPaths = userProfile.generatedPaths.filter(
      (p) => p.careerSlug !== careerSlug,
    );
    userProfile.generatedPaths.push(pathData);
    console.log("Step 9: Saving userProfile");
    await userProfile.save();
    console.log("Step 10: Saved successfully");

    res.status(201).json({
      success: true,
      message: "Career path generated successfully",
      pathId: newPathId,
      path: pathData,
    });
  } catch (error) {
    console.error("Error in /api/paths/generate:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      message: "Error generating career path",
      error: error.message,
    });
  }
});

/**
 * Get all generated paths for a user
 * GET /api/paths/user/:userId
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userProfile = await UserProfile.findOne({ userId });

    if (!userProfile) {
      return res.json({ paths: [] });
    }

    const sortedPaths = [...userProfile.generatedPaths].sort(
      (a, b) => new Date(b.generatedAt) - new Date(a.generatedAt),
    );
    const dedupedPaths = [];
    const seenKeys = new Set();
    for (const path of sortedPaths) {
      const dedupeKey = [
        path.careerSlug || "",
        (path.careerTitle || "").trim().toLowerCase(),
      ]
        .filter(Boolean)
        .join("|");

      const fallbackKey = path.pathId?.toString() || "";
      const resolvedKey = dedupeKey || fallbackKey;

      if (!seenKeys.has(resolvedKey)) {
        seenKeys.add(resolvedKey);
        dedupedPaths.push(path);
      }
    }

    res.json({
      userId,
      paths: dedupedPaths,
    });
  } catch (error) {
    console.error("Error fetching user paths:", error);
    res
      .status(500)
      .json({ message: "Error fetching paths", error: error.message });
  }
});

/**
 * Get a specific generated path
 * GET /api/paths/:pathId
 */
router.get("/:pathId", async (req, res) => {
  try {
    const { pathId } = req.params;
    const userProfile = await UserProfile.findOne({
      "generatedPaths.pathId": pathId,
    });

    if (!userProfile) {
      return res.status(404).json({ message: "Path not found" });
    }

    const path = userProfile.generatedPaths.find(
      (p) => p.pathId.toString() === pathId,
    );
    res.json(path);
  } catch (error) {
    console.error("Error fetching path:", error);
    res
      .status(500)
      .json({ message: "Error fetching path", error: error.message });
  }
});

/**
 * Update path customizations
 * PUT /api/paths/:pathId
 */
router.put("/:pathId", async (req, res) => {
  try {
    const { pathId } = req.params;
    const { customizations, completedTopics } = req.body;

    const userProfile = await UserProfile.findOne({
      "generatedPaths.pathId": pathId,
    });

    if (!userProfile) {
      return res.status(404).json({ message: "Path not found" });
    }

    const pathIndex = userProfile.generatedPaths.findIndex(
      (p) => p.pathId.toString() === pathId,
    );

    if (customizations) {
      userProfile.generatedPaths[pathIndex].customizations = customizations;
    }

    if (completedTopics) {
      userProfile.generatedPaths[pathIndex].completedTopics = completedTopics;
    }

    await userProfile.save();
    res.json({
      message: "Path updated successfully",
      path: userProfile.generatedPaths[pathIndex],
    });
  } catch (error) {
    console.error("Error updating path:", error);
    res
      .status(500)
      .json({ message: "Error updating path", error: error.message });
  }
});

/**
 * Delete a generated path
 * DELETE /api/paths/:pathId
 */
router.delete("/:pathId", async (req, res) => {
  try {
    const { pathId } = req.params;
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const userProfile = await UserProfile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    userProfile.generatedPaths = userProfile.generatedPaths.filter(
      (p) => p.pathId.toString() !== pathId,
    );

    await userProfile.save();
    res.json({ message: "Path deleted successfully" });
  } catch (error) {
    console.error("Error deleting path:", error);
    res
      .status(500)
      .json({ message: "Error deleting path", error: error.message });
  }
});

module.exports = router;
