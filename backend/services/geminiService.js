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
  "software-engineer": {
    careerTitle: "Software Engineer",
    description:
      "Build reliable products, APIs, and services that people use every day. Focus on clean code, system design, testing, and shipping features end to end.",
    demandLevel: "Very High",
    salaryRange: { min: 105000, max: 190000 },
    skills: [
      { name: "Programming", level: "Advanced" },
      { name: "Data Structures & Algorithms", level: "Advanced" },
      { name: "APIs & Backend Development", level: "Advanced" },
      { name: "Databases", level: "Intermediate" },
      { name: "Testing & Debugging", level: "Advanced" },
    ],
    tools: ["JavaScript", "TypeScript", "Node.js", "React", "Git"],
    companies: ["Google", "Microsoft", "Amazon", "Shopify", "Stripe"],
    prerequisites: ["Programming fundamentals", "Problem solving"],
  },
  "cybersecurity-analyst": {
    careerTitle: "Cybersecurity Analyst",
    description:
      "Protect systems, data, and users by spotting threats, investigating incidents, and hardening defenses across networks and applications.",
    demandLevel: "Very High",
    salaryRange: { min: 95000, max: 175000 },
    skills: [
      { name: "Networking", level: "Advanced" },
      { name: "Threat Detection", level: "Advanced" },
      { name: "Incident Response", level: "Advanced" },
      { name: "Security Tools", level: "Intermediate" },
      { name: "Risk Analysis", level: "Intermediate" },
    ],
    tools: ["Splunk", "Wireshark", "Nmap", "SIEM", "Linux"],
    companies: [
      "CrowdStrike",
      "Palo Alto Networks",
      "Microsoft",
      "Cisco",
      "IBM",
    ],
    prerequisites: ["Networking basics", "Security fundamentals"],
  },
  "cloud-architect": {
    careerTitle: "Cloud Architect",
    description:
      "Design scalable cloud systems and the infrastructure behind modern products. Balance reliability, security, performance, and cost across deployments.",
    demandLevel: "Very High",
    salaryRange: { min: 125000, max: 220000 },
    skills: [
      { name: "Cloud Platforms", level: "Advanced" },
      { name: "Networking", level: "Advanced" },
      { name: "Infrastructure as Code", level: "Advanced" },
      { name: "Security", level: "Intermediate" },
      { name: "Reliability Engineering", level: "Advanced" },
    ],
    tools: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes"],
    companies: ["Amazon", "Microsoft", "Google", "Netflix", "Snowflake"],
    prerequisites: ["Cloud basics", "Networking knowledge"],
  },
  "ux-ui-designer": {
    careerTitle: "UX/UI Designer",
    description:
      "Craft intuitive digital experiences that people enjoy using. Work across research, wireframes, prototypes, and visual design to solve real user problems.",
    demandLevel: "High",
    salaryRange: { min: 90000, max: 170000 },
    skills: [
      { name: "User Research", level: "Advanced" },
      { name: "Wireframing & Prototyping", level: "Advanced" },
      { name: "Visual Design", level: "Advanced" },
      { name: "Accessibility", level: "Intermediate" },
      { name: "Design Systems", level: "Intermediate" },
    ],
    tools: ["Figma", "FigJam", "Miro", "Canva", "Notion"],
    companies: ["Apple", "Google", "Adobe", "Figma", "Airbnb"],
    prerequisites: ["Visual curiosity", "Empathy for users"],
  },
};

/**
 * Generate career path based on quiz answers (fallback version without Gemini)
 */
async function generateCareerPath(
  quizAnswers,
  userInterests,
  preferredCareerSlug,
) {
  try {
    // Determine best career path from quiz answers
    const careerSlug =
      preferredCareerSlug && careerTemplates[preferredCareerSlug]
        ? preferredCareerSlug
        : determineCareerFromAnswers(quizAnswers);
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
    "Software Engineer": [
      {
        phase: 1,
        title: "Foundation",
        duration: "2-3 months",
        topics: [
          "Programming Basics",
          "Git & Version Control",
          "Data Structures",
          "Debugging Fundamentals",
        ],
      },
      {
        phase: 2,
        title: "Build Core Products",
        duration: "3-4 months",
        topics: [
          "APIs & REST",
          "Databases",
          "Authentication",
          "Testing Basics",
        ],
      },
      {
        phase: 3,
        title: "Systems & Scale",
        duration: "3-4 months",
        topics: [
          "System Design",
          "Performance Optimization",
          "Deployment",
          "Observability",
        ],
      },
      {
        phase: 4,
        title: "Production Engineering",
        duration: "Ongoing",
        topics: ["Code Reviews", "CI/CD", "Security Basics", "Architecture"],
      },
    ],
    "Cybersecurity Analyst": [
      {
        phase: 1,
        title: "Security Foundations",
        duration: "2-3 months",
        topics: [
          "Networking Basics",
          "Linux Fundamentals",
          "Security Principles",
          "Threat Landscape",
        ],
      },
      {
        phase: 2,
        title: "Detection & Analysis",
        duration: "3-4 months",
        topics: [
          "Log Analysis",
          "SIEM Tools",
          "Vulnerability Scanning",
          "Threat Detection",
        ],
      },
      {
        phase: 3,
        title: "Incident Response",
        duration: "3 months",
        topics: [
          "Triage & Containment",
          "Forensics Basics",
          "Hardening Systems",
          "Policy & Compliance",
        ],
      },
      {
        phase: 4,
        title: "Advanced Security",
        duration: "Ongoing",
        topics: [
          "Cloud Security",
          "Automation",
          "Red Team / Blue Team",
          "Risk Management",
        ],
      },
    ],
    "Cloud Architect": [
      {
        phase: 1,
        title: "Cloud Foundations",
        duration: "2-3 months",
        topics: [
          "Cloud Service Models",
          "Networking Fundamentals",
          "Identity & Access",
          "Compute & Storage",
        ],
      },
      {
        phase: 2,
        title: "Infrastructure Design",
        duration: "3-4 months",
        topics: [
          "Virtual Networks",
          "Load Balancing",
          "Autoscaling",
          "Infrastructure as Code",
        ],
      },
      {
        phase: 3,
        title: "Reliability & Security",
        duration: "3 months",
        topics: [
          "High Availability",
          "Disaster Recovery",
          "Cloud Security",
          "Monitoring",
        ],
      },
      {
        phase: 4,
        title: "Scaling Organizations",
        duration: "Ongoing",
        topics: [
          "Cost Governance",
          "Platform Engineering",
          "Multi-cloud Strategy",
          "Performance Tuning",
        ],
      },
    ],
    "UX/UI Designer": [
      {
        phase: 1,
        title: "Design Foundations",
        duration: "2 months",
        topics: [
          "Design Principles",
          "Color & Typography",
          "UX Basics",
          "Accessibility Basics",
        ],
      },
      {
        phase: 2,
        title: "Research & Ideation",
        duration: "2-3 months",
        topics: [
          "User Interviews",
          "Personas & Journeys",
          "Problem Framing",
          "Information Architecture",
        ],
      },
      {
        phase: 3,
        title: "Prototyping",
        duration: "3 months",
        topics: [
          "Wireframes",
          "Interactive Prototypes",
          "Usability Testing",
          "Iteration",
        ],
      },
      {
        phase: 4,
        title: "Design Systems & Delivery",
        duration: "Ongoing",
        topics: [
          "Components & Tokens",
          "Handoff to Engineering",
          "Design Critique",
          "Portfolio Building",
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
  const careerScores = {};

  const getWeightEntries = (weights) => {
    if (!weights) return [];
    if (weights instanceof Map) return Array.from(weights.entries());
    if (Array.isArray(weights)) return weights;
    if (typeof weights === "object") return Object.entries(weights);
    return [];
  };

  const addScore = (career, weight) => {
    if (!career) return;
    const numericWeight = Number(weight) || 0;
    careerScores[career] = (careerScores[career] || 0) + numericWeight;
  };

  const answers = Array.isArray(quizAnswers) ? quizAnswers : [];
  let hasStructuredWeights = false;

  for (const answer of answers) {
    const weights =
      answer?.careerWeights || answer?.selectedOption?.careerWeights || null;
    const entries = getWeightEntries(weights);

    if (entries.length > 0) {
      hasStructuredWeights = true;
      entries.forEach(([career, weight]) => addScore(career, weight));
    }
  }

  if (hasStructuredWeights) {
    const ranked = Object.entries(careerScores).sort(([, a], [, b]) => b - a);
    return ranked[0]?.[0] || "software-engineer";
  }

  const answerText = answers
    .map((a) => (a.selectedOption?.text || a.selectedText || "").toLowerCase())
    .join(" ");

  const keywordWeights = [
    [
      "cybersecurity-analyst",
      [
        "security",
        "threat",
        "incident",
        "risk",
        "vulnerability",
        "protect",
        "defend",
      ],
    ],
    [
      "cloud-architect",
      [
        "cloud",
        "infrastructure",
        "deploy",
        "automation",
        "reliability",
        "scalable",
        "terraform",
      ],
    ],
    [
      "software-engineer",
      [
        "build",
        "code",
        "app",
        "api",
        "backend",
        "frontend",
        "feature",
        "software",
      ],
    ],
    [
      "ux-ui-designer",
      [
        "design",
        "user",
        "ux",
        "ui",
        "prototype",
        "wireframe",
        "experience",
        "interface",
      ],
    ],
    [
      "data-scientist",
      [
        "data",
        "analysis",
        "visualization",
        "dashboard",
        "insight",
        "statistics",
      ],
    ],
    ["ml-engineer", ["ml", "machine learning", "model", "pipeline", "deploy"]],
    ["nlp-engineer", ["language", "nlp", "chatbot", "text", "llm"]],
    ["cv-engineer", ["vision", "image", "visual", "camera", "recognition"]],
    [
      "ai-product-manager",
      ["strategy", "communication", "roadmap", "lead", "product"],
    ],
  ];

  for (const [career, keywords] of keywordWeights) {
    for (const keyword of keywords) {
      if (answerText.includes(keyword)) {
        addScore(career, career === "data-scientist" ? 2 : 3);
        break;
      }
    }
  }

  const ranked = Object.entries(careerScores).sort(([, a], [, b]) => b - a);
  return ranked[0]?.[0] || "software-engineer";
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
