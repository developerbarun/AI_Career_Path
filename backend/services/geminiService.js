const { GoogleGenerativeAI } = require("@google/generative-ai");
const Resource = require("../models/Resource");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

/**
 * Template-based career paths (fallback when Gemini not available)
 */
const careerTemplates = {
  "ml-engineer": {
    careerTitle: "Machine Learning Engineer",
    description:
      "Design and build ML systems that learn from data. Develop algorithms, train models, and deploy them to production to solve real-world problems at scale.",
    demandLevel: "Very High",
    salaryRange: { min: 110000, max: 200000 },
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "TensorFlow / PyTorch", level: "Advanced" },
      { name: "Mathematics & Statistics", level: "Advanced" },
      { name: "Data Preprocessing", level: "Intermediate" },
      { name: "MLOps & Deployment", level: "Intermediate" },
    ],
    tools: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Jupyter"],
    companies: ["Google", "Meta", "Tesla", "OpenAI", "DeepMind"],
    prerequisites: ["Strong Python skills", "Linear algebra knowledge"],
  },
  "data-scientist": {
    careerTitle: "Data Scientist",
    description:
      "Extract insights from data through analysis and visualization. Build statistical models and communicate findings to drive business decisions.",
    demandLevel: "High",
    salaryRange: { min: 100000, max: 180000 },
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "SQL", level: "Advanced" },
      { name: "Statistics", level: "Advanced" },
      { name: "Data Visualization", level: "Intermediate" },
      { name: "Business Acumen", level: "Intermediate" },
    ],
    tools: ["Python", "SQL", "Pandas", "Tableau", "Power BI"],
    companies: ["Google", "Amazon", "Microsoft", "Netflix", "Airbnb"],
    prerequisites: ["SQL basics", "Statistical knowledge"],
  },
  "nlp-engineer": {
    careerTitle: "NLP Engineer",
    description:
      "Build systems that understand and process human language. Work with transformers and large language models to create conversational AI.",
    demandLevel: "Very High",
    salaryRange: { min: 120000, max: 210000 },
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "Transformers", level: "Advanced" },
      { name: "Deep Learning", level: "Advanced" },
      { name: "NLP Algorithms", level: "Intermediate" },
      { name: "BERT/GPT", level: "Intermediate" },
    ],
    tools: ["Python", "HuggingFace", "PyTorch", "NLTK", "spaCy"],
    companies: ["OpenAI", "Google", "Meta", "Microsoft", "Anthropic"],
    prerequisites: ["Deep learning basics", "NLP fundamentals"],
  },
  "cv-engineer": {
    careerTitle: "Computer Vision Engineer",
    description:
      "Create systems that can see and understand images and videos. Work on object detection, image segmentation, and visual recognition.",
    demandLevel: "High",
    salaryRange: { min: 115000, max: 200000 },
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "CNN Architectures", level: "Advanced" },
      { name: "OpenCV", level: "Advanced" },
      { name: "Image Processing", level: "Intermediate" },
      { name: "Real-time Processing", level: "Intermediate" },
    ],
    tools: ["Python", "OpenCV", "PyTorch", "TensorFlow", "YOLO"],
    companies: ["Tesla", "Nvidia", "Google", "Meta", "Apple"],
    prerequisites: ["Linear algebra", "Deep learning fundamentals"],
  },
};

/**
 * Generate career path based on quiz answers (fallback version without Gemini)
 */
async function generateCareerPath(quizAnswers, userInterests) {
  try {
    // Determine best career path from quiz answers
    const careerSlug = determineCareerFromAnswers(quizAnswers);
    const template =
      careerTemplates[careerSlug] || careerTemplates["ml-engineer"];

    // Create phases based on template
    const careerPath = {
      ...template,
      phases: generatePhases(template.careerTitle),
    };

    return careerPath;
  } catch (error) {
    console.error("Error generating career path:", error);
    // Return default ML Engineer path as fallback
    return {
      ...careerTemplates["ml-engineer"],
      phases: generatePhases("Machine Learning Engineer"),
    };
  }
}

/**
 * Generate learning phases
 */
function generatePhases(careerTitle) {
  const phaseMap = {
    "Machine Learning Engineer": [
      {
        phase: 1,
        title: "Foundation",
        duration: "3-4 months",
        topics: [
          "Python Programming",
          "Linear Algebra & Calculus",
          "Probability & Statistics",
          "Data Structures",
        ],
      },
      {
        phase: 2,
        title: "Core ML",
        duration: "4-6 months",
        topics: [
          "Supervised Learning",
          "Unsupervised Learning",
          "Neural Networks",
          "Feature Engineering",
        ],
      },
      {
        phase: 3,
        title: "Advanced Topics",
        duration: "3-4 months",
        topics: [
          "Deep Learning",
          "Computer Vision Basics",
          "NLP Fundamentals",
          "Reinforcement Learning Intro",
        ],
      },
      {
        phase: 4,
        title: "Production & Deployment",
        duration: "2-3 months",
        topics: [
          "MLOps",
          "Model Deployment",
          "A/B Testing",
          "Cloud Platforms",
          "Docker & Kubernetes",
        ],
      },
    ],
    "Data Scientist": [
      {
        phase: 1,
        title: "Foundation",
        duration: "2-3 months",
        topics: [
          "Python Basics",
          "SQL Fundamentals",
          "Statistics Essentials",
          "Data Manipulation",
        ],
      },
      {
        phase: 2,
        title: "Data Analysis",
        duration: "3-4 months",
        topics: [
          "Exploratory Data Analysis",
          "Data Visualization",
          "Hypothesis Testing",
          "Statistical Models",
        ],
      },
      {
        phase: 3,
        title: "Machine Learning",
        duration: "3-4 months",
        topics: [
          "ML Algorithms",
          "Model Evaluation",
          "Feature Engineering",
          "Predictive Analytics",
        ],
      },
      {
        phase: 4,
        title: "Communication & Deployment",
        duration: "2-3 months",
        topics: [
          "Data Storytelling",
          "Dashboard Creation",
          "Presenting Insights",
          "Model Deployment",
        ],
      },
    ],
    "NLP Engineer": [
      {
        phase: 1,
        title: "Foundation",
        duration: "2-3 months",
        topics: [
          "Python Advanced",
          "Linear Algebra Deep Dive",
          "Probability Theory",
          "NLP Basics",
        ],
      },
      {
        phase: 2,
        title: "NLP Fundamentals",
        duration: "3-4 months",
        topics: [
          "Tokenization & Preprocessing",
          "Word Embeddings",
          "Sequence Models",
          "RNNs & LSTMs",
        ],
      },
      {
        phase: 3,
        title: "Transformers & Modern NLP",
        duration: "4-5 months",
        topics: [
          "Transformer Architecture",
          "BERT & GPT",
          "Fine-tuning LLMs",
          "Multi-lingual NLP",
        ],
      },
      {
        phase: 4,
        title: "Production NLP",
        duration: "2-3 months",
        topics: [
          "NLP Deployment",
          "API Development",
          "Optimization",
          "Real-world Applications",
        ],
      },
    ],
    "Computer Vision Engineer": [
      {
        phase: 1,
        title: "Foundation",
        duration: "3-4 months",
        topics: [
          "Python Mastery",
          "Linear Algebra & Calculus",
          "Image Processing Basics",
          "Signal Processing",
        ],
      },
      {
        phase: 2,
        title: "Computer Vision Fundamentals",
        duration: "3-4 months",
        topics: [
          "Image Classification",
          "Feature Detection",
          "Edge Detection",
          "Image Filtering",
        ],
      },
      {
        phase: 3,
        title: "Deep Learning for Vision",
        duration: "3-4 months",
        topics: [
          "CNNs",
          "Object Detection",
          "Image Segmentation",
          "Face Recognition",
        ],
      },
      {
        phase: 4,
        title: "Advanced & Production",
        duration: "2-3 months",
        topics: [
          "Real-time Vision",
          "Video Processing",
          "Optimization",
          "Deployment on Edge Devices",
        ],
      },
    ],
  };

  return phaseMap[careerTitle] || phaseMap["Machine Learning Engineer"];
}

/**
 * Determine best career from quiz answers
 */
function determineCareerFromAnswers(quizAnswers) {
  const careerScores = {
    "ml-engineer": 0,
    "data-scientist": 0,
    "nlp-engineer": 0,
    "cv-engineer": 0,
  };

  // Simple scoring based on answers
  const answerText = quizAnswers
    .map((a) => (a.selectedOption?.text || a.selectedText || "").toLowerCase())
    .join(" ");

  if (
    answerText.includes("language") ||
    answerText.includes("nlp") ||
    answerText.includes("chatbot")
  ) {
    careerScores["nlp-engineer"] += 3;
  }
  if (
    answerText.includes("vision") ||
    answerText.includes("image") ||
    answerText.includes("visual")
  ) {
    careerScores["cv-engineer"] += 3;
  }
  if (
    answerText.includes("data") ||
    answerText.includes("analysis") ||
    answerText.includes("visualization")
  ) {
    careerScores["data-scientist"] += 2;
  }
  if (
    answerText.includes("build") ||
    answerText.includes("code") ||
    answerText.includes("deploy")
  ) {
    careerScores["ml-engineer"] += 2;
  }

  // Return career with highest score, default to ML Engineer
  let maxCareer = "ml-engineer";
  let maxScore = 0;
  for (const [career, score] of Object.entries(careerScores)) {
    if (score > maxScore) {
      maxScore = score;
      maxCareer = career;
    }
  }

  return maxScore > 0 ? maxCareer : "ml-engineer";
}

/**
 * Get resources for topic
 */
async function getResourcesForTopic(topic, careerSlug) {
  try {
    const resources = await Resource.find({ careerPath: careerSlug }).lean();
    return (resources || []).slice(0, 8).map((r) => ({
      title: r.title,
      type: r.type,
      url: r.url,
      description: r.description,
      free: r.free || false,
      rating: r.rating || 0,
      difficulty: r.difficulty || "Intermediate",
      platform: extractPlatform(r.url),
    }));
  } catch (error) {
    console.error("Error getting resources:", error);
    return [];
  }
}

/**
 * Enrich path with resources
 */
async function enrichPathWithResources(careerPath, careerSlug) {
  const normalizeTopic = (topic) => {
    if (typeof topic === "string") {
      return { name: topic, resources: [] };
    }

    if (topic && typeof topic === "object") {
      return {
        name: topic.name || "",
        resources: Array.isArray(topic.resources) ? topic.resources : [],
      };
    }

    return { name: String(topic || ""), resources: [] };
  };

  try {
    const enrichedPhases = await Promise.all(
      careerPath.phases.map(async (phase) => {
        const enrichedTopics = await Promise.all(
          phase.topics.map(async (topic) => {
            const normalizedTopic = normalizeTopic(topic);
            const resources = await getResourcesForTopic(
              normalizedTopic.name,
              careerSlug,
            );
            return { name: normalizedTopic.name, resources };
          }),
        );
        return { ...phase, topics: enrichedTopics };
      }),
    );
    return { ...careerPath, phases: enrichedPhases };
  } catch (error) {
    console.error("Error enriching path:", error);
    return {
      ...careerPath,
      phases: (careerPath.phases || []).map((phase) => ({
        ...phase,
        topics: (phase.topics || []).map((topic) => normalizeTopic(topic)),
      })),
    };
  }
}

/**
 * Extract platform from URL
 */
function extractPlatform(url) {
  if (!url) return "Online";
  if (url.includes("coursera")) return "Coursera";
  if (url.includes("udacity")) return "Udacity";
  if (url.includes("fast.ai")) return "Fast.ai";
  if (url.includes("stanford")) return "Stanford";
  if (url.includes("youtube")) return "YouTube";
  if (url.includes("github")) return "GitHub";
  if (url.includes("oreilly")) return "O'Reilly";
  if (url.includes("kaggle")) return "Kaggle";
  if (url.includes("arxiv")) return "arXiv";
  if (url.includes("tensorflow")) return "TensorFlow";
  if (url.includes("pytorch")) return "PyTorch";
  if (url.includes("huggingface")) return "HuggingFace";
  return "Online Resource";
}

/**
 * Extract interests from quiz
 */
function extractInterestsFromQuizAnswers(quizAnswers) {
  if (!quizAnswers || quizAnswers.length === 0)
    return "AI and machine learning";
  const interests = quizAnswers
    .map((a) => a.selectedOption?.text || a.selectedText)
    .filter(Boolean)
    .slice(0, 5)
    .join(", ");
  return interests || "AI and machine learning";
}

module.exports = {
  generateCareerPath,
  enrichPathWithResources,
  getResourcesForTopic,
  extractInterestsFromQuizAnswers,
};
