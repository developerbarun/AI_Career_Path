const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    email: { type: String },
    generatedPaths: [
      {
        pathId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        generatedAt: { type: Date, default: Date.now },
        careerTitle: String,
        careerSlug: String,
        matchPercent: { type: Number, min: 0, max: 100 },
        quizAnswersSummary: String,
        pathData: {
          careerTitle: String,
          description: String,
          demandLevel: String,
          salaryRange: {
            min: Number,
            max: Number,
          },
          phases: [
            {
              phase: Number,
              title: String,
              duration: String,
              topics: [
                {
                  name: String,
                  resources: [
                    {
                      title: String,
                      type: {
                        type: String,
                        enum: [
                          "Course",
                          "Book",
                          "Tutorial",
                          "Tool",
                          "Community",
                        ],
                      },
                      url: String,
                      description: String,
                      platform: String,
                      difficulty: String,
                      free: Boolean,
                      rating: Number,
                    },
                  ],
                },
              ],
            },
          ],
          skills: [
            {
              name: String,
              level: {
                type: String,
                enum: ["Beginner", "Intermediate", "Advanced"],
              },
            },
          ],
          tools: [String],
          companies: [String],
          prerequisites: [String],
        },
        resources: [
          {
            title: String,
            type: {
              type: String,
              enum: ["Course", "Book", "Tutorial", "Tool", "Community"],
            },
            url: String,
            description: String,
            platform: String,
            difficulty: String,
            free: Boolean,
            rating: Number,
            topics: [String],
          },
        ],
        customizations: {
          addedTopics: [
            {
              phase: Number,
              topic: String,
            },
          ],
          removedTopics: [
            {
              phase: Number,
              topic: String,
            },
          ],
          editedPhases: [
            {
              phase: Number,
              title: String,
              duration: String,
            },
          ],
        },
        completedTopics: [
          {
            phase: Number,
            topic: String,
            completedAt: Date,
          },
        ],
      },
    ],
    savedResources: [
      {
        resourceId: { type: mongoose.Schema.Types.ObjectId },
        pathId: { type: mongoose.Schema.Types.ObjectId },
        savedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("UserProfile", userProfileSchema);
