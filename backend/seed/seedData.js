const CareerPath = require("../models/CareerPath");
const Resource = require("../models/Resource");
const Quiz = require("../models/Quiz");

const careerData = [
  {
    title: "Machine Learning Engineer",
    slug: "ml-engineer",
    description:
      "Design and build ML systems that learn from data. You'll develop algorithms, train models, and deploy them into production to solve real-world problems at scale.",
    icon: "FaBrain",
    color: "#6C63FF",
    salaryRange: { min: 110000, max: 200000 },
    demandLevel: "Very High",
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "TensorFlow / PyTorch", level: "Advanced" },
      { name: "Mathematics & Statistics", level: "Advanced" },
      { name: "Data Preprocessing", level: "Intermediate" },
      { name: "MLOps & Deployment", level: "Intermediate" },
      { name: "SQL & Databases", level: "Intermediate" },
    ],
    roadmap: [
      {
        phase: 1,
        title: "Foundation",
        duration: "3-4 months",
        topics: [
          "Python programming",
          "Linear Algebra & Calculus",
          "Probability & Statistics",
          "Data Structures & Algorithms",
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
          "Model Evaluation",
        ],
      },
      {
        phase: 3,
        title: "Advanced Topics",
        duration: "3-4 months",
        topics: [
          "Deep Learning",
          "Computer Vision",
          "NLP Fundamentals",
          "Reinforcement Learning",
        ],
      },
      {
        phase: 4,
        title: "Production & Scale",
        duration: "2-3 months",
        topics: [
          "MLOps",
          "Model Deployment",
          "A/B Testing",
          "Cloud Platforms (AWS/GCP)",
          "Docker & Kubernetes",
        ],
      },
    ],
    tools: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Jupyter",
      "Docker",
      "AWS SageMaker",
      "MLflow",
    ],
    companies: [
      "Google",
      "Meta",
      "OpenAI",
      "NVIDIA",
      "Amazon",
      "Microsoft",
      "Apple",
      "Netflix",
    ],
    prerequisites: [
      "Strong programming skills",
      "Mathematics background",
      "Analytical thinking",
    ],
  },
  {
    title: "Data Scientist",
    slug: "data-scientist",
    description:
      "Extract meaningful insights from complex data sets. Combine statistics, programming, and domain expertise to help organizations make data-driven decisions.",
    icon: "FaChartBar",
    color: "#FF6584",
    salaryRange: { min: 95000, max: 175000 },
    demandLevel: "Very High",
    skills: [
      { name: "Python / R", level: "Advanced" },
      { name: "Statistics & Probability", level: "Advanced" },
      { name: "Data Visualization", level: "Advanced" },
      { name: "SQL", level: "Advanced" },
      { name: "Machine Learning", level: "Intermediate" },
      { name: "Communication", level: "Advanced" },
    ],
    roadmap: [
      {
        phase: 1,
        title: "Foundation",
        duration: "2-3 months",
        topics: [
          "Python & R",
          "Statistics Fundamentals",
          "SQL & Databases",
          "Excel & Spreadsheets",
        ],
      },
      {
        phase: 2,
        title: "Analysis & Visualization",
        duration: "3-4 months",
        topics: [
          "Pandas & NumPy",
          "Data Cleaning",
          "Matplotlib & Seaborn",
          "Tableau / Power BI",
          "Exploratory Data Analysis",
        ],
      },
      {
        phase: 3,
        title: "Machine Learning",
        duration: "3-4 months",
        topics: [
          "Regression & Classification",
          "Clustering",
          "Time Series Analysis",
          "A/B Testing",
        ],
      },
      {
        phase: 4,
        title: "Specialization",
        duration: "2-3 months",
        topics: [
          "Deep Learning Basics",
          "Big Data Tools",
          "Cloud Analytics",
          "Storytelling with Data",
        ],
      },
    ],
    tools: [
      "Python",
      "R",
      "Tableau",
      "Power BI",
      "Jupyter",
      "Apache Spark",
      "SQL",
      "Excel",
    ],
    companies: [
      "Google",
      "Meta",
      "Airbnb",
      "Uber",
      "Spotify",
      "LinkedIn",
      "Twitter",
      "Stripe",
    ],
    prerequisites: [
      "Analytical mindset",
      "Basic programming",
      "Curiosity about data",
    ],
  },
  {
    title: "AI Research Scientist",
    slug: "ai-researcher",
    description:
      "Push the boundaries of what AI can do. Publish papers, develop novel architectures, and contribute to foundational breakthroughs in artificial intelligence.",
    icon: "FaFlask",
    color: "#43E97B",
    salaryRange: { min: 130000, max: 250000 },
    demandLevel: "High",
    skills: [
      { name: "Advanced Mathematics", level: "Advanced" },
      { name: "Deep Learning Theory", level: "Advanced" },
      { name: "Research Methodology", level: "Advanced" },
      { name: "Python & C++", level: "Advanced" },
      { name: "Paper Writing", level: "Advanced" },
      { name: "Experimental Design", level: "Advanced" },
    ],
    roadmap: [
      {
        phase: 1,
        title: "Academic Foundation",
        duration: "6-12 months",
        topics: [
          "Linear Algebra & Calculus",
          "Optimization Theory",
          "Probability Theory",
          "Information Theory",
        ],
      },
      {
        phase: 2,
        title: "Deep Learning Mastery",
        duration: "6-8 months",
        topics: [
          "Neural Network Architectures",
          "Transformers & Attention",
          "GANs & VAEs",
          "Reinforcement Learning",
        ],
      },
      {
        phase: 3,
        title: "Research Skills",
        duration: "6-12 months",
        topics: [
          "Reading & Reproducing Papers",
          "Experiment Design",
          "LaTeX & Academic Writing",
          "Open Source Contributions",
        ],
      },
      {
        phase: 4,
        title: "Specialize & Publish",
        duration: "Ongoing",
        topics: [
          "Choose Research Focus",
          "Submit to Conferences (NeurIPS, ICML)",
          "Collaborate with Labs",
          "PhD or Research Position",
        ],
      },
    ],
    tools: [
      "PyTorch",
      "JAX",
      "LaTeX",
      "Weights & Biases",
      "Git",
      "HPC Clusters",
      "ArXiv",
      "Overleaf",
    ],
    companies: [
      "DeepMind",
      "OpenAI",
      "Google Brain",
      "Meta FAIR",
      "Anthropic",
      "Microsoft Research",
      "MIT",
      "Stanford",
    ],
    prerequisites: [
      "Strong math background",
      "PhD preferred",
      "Passion for discovery",
    ],
  },
  {
    title: "NLP Engineer",
    slug: "nlp-engineer",
    description:
      "Build systems that understand and generate human language. Work on chatbots, translation, sentiment analysis, and the cutting-edge of large language models.",
    icon: "FaComments",
    color: "#F9A826",
    salaryRange: { min: 120000, max: 210000 },
    demandLevel: "Extreme",
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "Transformer Architectures", level: "Advanced" },
      { name: "NLP Libraries (HuggingFace)", level: "Advanced" },
      { name: "Linguistics Basics", level: "Intermediate" },
      { name: "Fine-tuning & RLHF", level: "Advanced" },
      { name: "Prompt Engineering", level: "Intermediate" },
    ],
    roadmap: [
      {
        phase: 1,
        title: "Foundations",
        duration: "3-4 months",
        topics: [
          "Python & Data Processing",
          "Regex & Text Processing",
          "Basic Linguistics",
          "Statistics",
        ],
      },
      {
        phase: 2,
        title: "Core NLP",
        duration: "4-5 months",
        topics: [
          "Word Embeddings (Word2Vec, GloVe)",
          "RNNs & LSTMs",
          "Sequence-to-Sequence Models",
          "Named Entity Recognition",
        ],
      },
      {
        phase: 3,
        title: "Modern NLP",
        duration: "4-5 months",
        topics: [
          "Transformers & BERT",
          "GPT Architecture",
          "HuggingFace Ecosystem",
          "Fine-tuning LLMs",
        ],
      },
      {
        phase: 4,
        title: "Advanced & Applied",
        duration: "3-4 months",
        topics: [
          "RLHF & Alignment",
          "RAG Systems",
          "Prompt Engineering",
          "Production NLP Pipelines",
        ],
      },
    ],
    tools: [
      "HuggingFace",
      "spaCy",
      "NLTK",
      "LangChain",
      "OpenAI API",
      "PyTorch",
      "Elasticsearch",
      "FastAPI",
    ],
    companies: [
      "OpenAI",
      "Anthropic",
      "Google",
      "Meta",
      "Cohere",
      "Amazon (Alexa)",
      "Microsoft",
      "Grammarly",
    ],
    prerequisites: [
      "Python proficiency",
      "Interest in language",
      "ML basics helpful",
    ],
  },
  {
    title: "Computer Vision Engineer",
    slug: "cv-engineer",
    description:
      "Teach machines to see and understand visual data. Work on image recognition, object detection, autonomous vehicles, medical imaging, and augmented reality.",
    icon: "FaEye",
    color: "#00C9FF",
    salaryRange: { min: 115000, max: 195000 },
    demandLevel: "Very High",
    skills: [
      { name: "Python & C++", level: "Advanced" },
      { name: "CNNs & Vision Transformers", level: "Advanced" },
      { name: "OpenCV", level: "Advanced" },
      { name: "Image Processing", level: "Advanced" },
      { name: "3D Vision", level: "Intermediate" },
      { name: "Edge Deployment", level: "Intermediate" },
    ],
    roadmap: [
      {
        phase: 1,
        title: "Foundations",
        duration: "3-4 months",
        topics: [
          "Python & NumPy",
          "Linear Algebra",
          "Image Processing Basics",
          "OpenCV Fundamentals",
        ],
      },
      {
        phase: 2,
        title: "Deep Learning for Vision",
        duration: "4-5 months",
        topics: [
          "CNNs (ResNet, VGG, EfficientNet)",
          "Object Detection (YOLO, SSD)",
          "Image Segmentation",
          "Transfer Learning",
        ],
      },
      {
        phase: 3,
        title: "Advanced Vision",
        duration: "3-4 months",
        topics: [
          "Vision Transformers (ViT)",
          "GANs for Image Generation",
          "3D Computer Vision",
          "Video Analysis",
        ],
      },
      {
        phase: 4,
        title: "Applications",
        duration: "2-3 months",
        topics: [
          "Autonomous Driving",
          "Medical Imaging",
          "AR/VR Applications",
          "Edge Deployment (TensorRT, ONNX)",
        ],
      },
    ],
    tools: [
      "OpenCV",
      "PyTorch",
      "TensorFlow",
      "CUDA",
      "TensorRT",
      "Detectron2",
      "ONNX",
      "Roboflow",
    ],
    companies: [
      "Tesla",
      "Waymo",
      "NVIDIA",
      "Apple",
      "Meta (Reality Labs)",
      "Amazon Go",
      "Snap",
      "Scale AI",
    ],
    prerequisites: [
      "Linear algebra",
      "Python skills",
      "Interest in visual computing",
    ],
  },
  {
    title: "AI/ML Product Manager",
    slug: "ai-product-manager",
    description:
      "Bridge the gap between AI technology and business value. Define product strategy, work with engineering teams, and bring AI-powered products to market.",
    icon: "FaRocket",
    color: "#FF4B5C",
    salaryRange: { min: 130000, max: 220000 },
    demandLevel: "High",
    skills: [
      { name: "Product Strategy", level: "Advanced" },
      { name: "ML/AI Understanding", level: "Intermediate" },
      { name: "Data Analysis", level: "Intermediate" },
      { name: "Stakeholder Management", level: "Advanced" },
      { name: "Agile/Scrum", level: "Advanced" },
      { name: "Technical Communication", level: "Advanced" },
    ],
    roadmap: [
      {
        phase: 1,
        title: "PM Fundamentals",
        duration: "2-3 months",
        topics: [
          "Product Management Basics",
          "User Research",
          "Roadmapping",
          "Agile Methodologies",
        ],
      },
      {
        phase: 2,
        title: "AI/ML Literacy",
        duration: "3-4 months",
        topics: [
          "ML Concepts Overview",
          "Data Pipelines",
          "Model Evaluation Metrics",
          "AI Ethics & Bias",
        ],
      },
      {
        phase: 3,
        title: "AI Product Skills",
        duration: "3-4 months",
        topics: [
          "AI Product Design Patterns",
          "Data Strategy",
          "ML System Requirements",
          "Human-AI Interaction",
        ],
      },
      {
        phase: 4,
        title: "Leadership",
        duration: "Ongoing",
        topics: [
          "AI Strategy & Vision",
          "Cross-functional Leadership",
          "Industry Networking",
          "Thought Leadership & Writing",
        ],
      },
    ],
    tools: [
      "Jira",
      "Figma",
      "Mixpanel",
      "Amplitude",
      "SQL",
      "Python Basics",
      "Miro",
      "Notion",
    ],
    companies: [
      "Google",
      "Microsoft",
      "Amazon",
      "OpenAI",
      "Anthropic",
      "Salesforce",
      "Adobe",
      "Spotify",
    ],
    prerequisites: [
      "Product management experience",
      "Technical curiosity",
      "Strong communication",
    ],
  },
];

const resourceData = [
  {
    title: "Machine Learning Specialization by Andrew Ng",
    type: "Course",
    description:
      "Comprehensive course covering supervised learning, unsupervised learning, and neural networks",
    url: "https://www.coursera.org/specializations/machine-learning-introduction",
    careerPath: "ml-engineer",
    difficulty: "Beginner",
    free: false,
    rating: 4.9,
  },
  {
    title: "Fast.ai Practical Deep Learning for Coders",
    type: "Course",
    description:
      "Free top-down approach to learning deep learning — practical and accessible",
    url: "https://course.fast.ai/",
    careerPath: "ml-engineer",
    difficulty: "Intermediate",
    free: true,
    rating: 4.8,
  },
  {
    title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow",
    type: "Book",
    description:
      "Aurélien Géron's bestseller covering ML fundamentals to deployment",
    url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/",
    careerPath: "ml-engineer",
    difficulty: "Intermediate",
    free: false,
    rating: 4.8,
  },
  {
    title: "Python for Data Analysis by Wes McKinney",
    type: "Book",
    description:
      "Essential guide to Pandas, NumPy, and data manipulation in Python",
    url: "https://www.oreilly.com/library/view/python-for-data/9781098104023/",
    careerPath: "data-scientist",
    difficulty: "Beginner",
    free: false,
    rating: 4.7,
  },
  {
    title: "Kaggle: Your Home for Data Science",
    type: "Community",
    description:
      "Practice ML with real datasets, competitions, and community projects",
    url: "https://www.kaggle.com/",
    careerPath: "data-scientist",
    difficulty: "Beginner",
    free: true,
    rating: 4.7,
  },
  {
    title: "CS231n: Convolutional Neural Networks for Visual Recognition",
    type: "Course",
    description:
      "Stanford's legendary course on CNNs and computer vision — free lecture notes and videos",
    url: "http://cs231n.stanford.edu/",
    careerPath: "cv-engineer",
    difficulty: "Advanced",
    free: true,
    rating: 4.9,
  },
  {
    title: "HuggingFace Course: Natural Language Processing",
    type: "Course",
    description:
      "Free comprehensive course on modern NLP with transformers and hugging face",
    url: "https://huggingface.co/course/chapter1/1",
    careerPath: "nlp-engineer",
    difficulty: "Intermediate",
    free: true,
    rating: 4.8,
  },
  {
    title: "Attention Is All You Need - The Transformer Paper",
    type: "Tutorial",
    description:
      "The foundational paper that revolutionized NLP and deep learning",
    url: "https://arxiv.org/abs/1706.03762",
    careerPath: "ai-researcher",
    difficulty: "Advanced",
    free: true,
    rating: 5.0,
  },
  {
    title: "Full Stack Deep Learning - Production ML Systems",
    type: "Course",
    description:
      "Learn to build end-to-end ML systems from experimentation to production deployment",
    url: "https://fullstackdeeplearning.com/",
    careerPath: "ml-engineer",
    difficulty: "Advanced",
    free: true,
    rating: 4.7,
  },
  {
    title: "Made With ML - End-to-End ML with MLOps",
    type: "Tutorial",
    description:
      "Practical guide to building ML products with best practices for production",
    url: "https://madewithml.com/",
    careerPath: "ml-engineer",
    difficulty: "Intermediate",
    free: true,
    rating: 4.8,
  },
  {
    title: "Google AI Product Management Certificate",
    type: "Course",
    description:
      "Learn AI PM skills, strategy, and leadership from Google professionals",
    url: "https://www.coursera.org/learn/ai-for-everyone",
    careerPath: "ai-product-manager",
    difficulty: "Intermediate",
    free: false,
    rating: 4.6,
  },
  {
    title: "3Blue1Brown: Neural Networks Visually Explained",
    type: "Tutorial",
    description:
      "Beautiful visual explanations of neural networks and deep learning concepts",
    url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
    careerPath: "ml-engineer",
    difficulty: "Beginner",
    free: true,
    rating: 4.9,
  },
  {
    title: "Stanford CS224N: NLP with Deep Learning",
    type: "Course",
    description:
      "Stanford's comprehensive NLP course with transformers, word embeddings, and language models",
    url: "http://web.stanford.edu/class/cs224n/",
    careerPath: "nlp-engineer",
    difficulty: "Advanced",
    free: true,
    rating: 4.8,
  },
  {
    title: "DeepLearning.AI - Deep Learning Specialization",
    type: "Course",
    description:
      "Andrew Ng's complete specialization on deep learning fundamentals",
    url: "https://www.deeplearning.ai/",
    careerPath: "ml-engineer",
    difficulty: "Intermediate",
    free: false,
    rating: 4.8,
  },
  {
    title: "Udacity Data Science Nanodegree",
    type: "Course",
    description:
      "Project-based learning for data science with real-world applications",
    url: "https://www.udacity.com/course/data-scientist-nanodegree--nd025",
    careerPath: "data-scientist",
    difficulty: "Intermediate",
    free: false,
    rating: 4.6,
  },
  {
    title: "PyTorch Official Tutorials",
    type: "Tutorial",
    description:
      "Official PyTorch documentation and tutorials for deep learning",
    url: "https://pytorch.org/tutorials/",
    careerPath: "ml-engineer",
    difficulty: "Intermediate",
    free: true,
    rating: 4.7,
  },
  {
    title: "TensorFlow Keras Documentation",
    type: "Tutorial",
    description: "Comprehensive guides and examples for TensorFlow and Keras",
    url: "https://www.tensorflow.org/guide",
    careerPath: "ml-engineer",
    difficulty: "Intermediate",
    free: true,
    rating: 4.7,
  },
  {
    title: "arXiv - AI Research Papers",
    type: "Community",
    description:
      "Archive of AI and machine learning research papers from top researchers",
    url: "https://arxiv.org/list/cs.AI/recent",
    careerPath: "ai-researcher",
    difficulty: "Advanced",
    free: true,
    rating: 4.8,
  },
  {
    title: "Reinforcement Learning: An Introduction by Sutton & Barto",
    type: "Book",
    description:
      "The definitive textbook on reinforcement learning theory and practice",
    url: "http://incompleteideas.net/book/the-book.html",
    careerPath: "ai-researcher",
    difficulty: "Advanced",
    free: true,
    rating: 4.9,
  },
  {
    title: "Towards Data Science - Medium Publication",
    type: "Community",
    description:
      "Community-driven articles on data science, machine learning, and AI",
    url: "https://towardsdatascience.com/",
    careerPath: "data-scientist",
    difficulty: "Intermediate",
    free: true,
    rating: 4.5,
  },
];

const quizData = [
  {
    question: "What excites you most about AI?",
    category: "Interest",
    options: [
      {
        text: "Building systems that learn from data",
        careerWeights: { "ml-engineer": 3, "data-scientist": 1 },
      },
      {
        text: "Understanding hidden patterns in data",
        careerWeights: { "data-scientist": 3, "ml-engineer": 1 },
      },
      {
        text: "Pushing boundaries of what machines can do",
        careerWeights: { "ai-researcher": 3, "nlp-engineer": 1 },
      },
      {
        text: "Making machines understand language",
        careerWeights: { "nlp-engineer": 3, "ai-researcher": 1 },
      },
    ],
  },
  {
    question: "How do you feel about mathematics?",
    category: "Skills",
    options: [
      {
        text: "I love advanced math — the more abstract the better",
        careerWeights: { "ai-researcher": 3, "ml-engineer": 2 },
      },
      {
        text: "I enjoy applied math for problem solving",
        careerWeights: { "ml-engineer": 3, "data-scientist": 2 },
      },
      {
        text: "I can handle the basics but prefer practical work",
        careerWeights: {
          "nlp-engineer": 2,
          "cv-engineer": 2,
          "data-scientist": 1,
        },
      },
      {
        text: "I prefer strategy and communication",
        careerWeights: { "ai-product-manager": 3, "data-scientist": 1 },
      },
    ],
  },
  {
    question: "What's your preferred work style?",
    category: "Preference",
    options: [
      {
        text: "Writing code and building production systems",
        careerWeights: {
          "ml-engineer": 3,
          "cv-engineer": 2,
          "nlp-engineer": 2,
        },
      },
      {
        text: "Analyzing data and creating visualizations",
        careerWeights: { "data-scientist": 3, "ai-product-manager": 1 },
      },
      {
        text: "Reading papers and running experiments",
        careerWeights: { "ai-researcher": 3, "nlp-engineer": 1 },
      },
      {
        text: "Leading teams and defining product direction",
        careerWeights: { "ai-product-manager": 3, "data-scientist": 1 },
      },
    ],
  },
  {
    question: "Which project sounds most interesting?",
    category: "Projects",
    options: [
      {
        text: "Building a recommendation engine for millions of users",
        careerWeights: { "ml-engineer": 3, "data-scientist": 2 },
      },
      {
        text: "Creating a chatbot that truly understands context",
        careerWeights: { "nlp-engineer": 3, "ai-researcher": 2 },
      },
      {
        text: "Developing self-driving car perception systems",
        careerWeights: { "cv-engineer": 3, "ml-engineer": 1 },
      },
      {
        text: "Defining the AI strategy for a Fortune 500 company",
        careerWeights: { "ai-product-manager": 3, "data-scientist": 1 },
      },
    ],
  },
  {
    question: "What's your educational background closest to?",
    category: "Background",
    options: [
      {
        text: "Computer Science / Software Engineering",
        careerWeights: {
          "ml-engineer": 2,
          "cv-engineer": 2,
          "nlp-engineer": 2,
        },
      },
      {
        text: "Mathematics / Statistics / Physics",
        careerWeights: { "ai-researcher": 3, "data-scientist": 2 },
      },
      {
        text: "Business / Economics / MBA",
        careerWeights: { "ai-product-manager": 3, "data-scientist": 2 },
      },
      {
        text: "Linguistics / Psychology / Cognitive Science",
        careerWeights: { "nlp-engineer": 3, "ai-researcher": 1 },
      },
    ],
  },
  {
    question: "Where do you see yourself in 5 years?",
    category: "Goals",
    options: [
      {
        text: "Leading an ML engineering team at a tech giant",
        careerWeights: { "ml-engineer": 3, "cv-engineer": 1 },
      },
      {
        text: "Publishing influential research at top conferences",
        careerWeights: { "ai-researcher": 3, "nlp-engineer": 1 },
      },
      {
        text: "Being the go-to data expert in my organization",
        careerWeights: { "data-scientist": 3, "ml-engineer": 1 },
      },
      {
        text: "Shaping AI products used by millions",
        careerWeights: { "ai-product-manager": 3, "nlp-engineer": 1 },
      },
    ],
  },
  {
    question: "Which skill would you most like to master?",
    category: "SkillGoals",
    options: [
      {
        text: "Building & deploying ML pipelines at scale",
        careerWeights: { "ml-engineer": 3, "data-scientist": 1 },
      },
      {
        text: "Creating photorealistic images with AI",
        careerWeights: { "cv-engineer": 3, "ai-researcher": 2 },
      },
      {
        text: "Understanding how large language models work inside",
        careerWeights: { "nlp-engineer": 3, "ai-researcher": 2 },
      },
      {
        text: "Turning complex AI concepts into business value",
        careerWeights: { "ai-product-manager": 3, "data-scientist": 1 },
      },
    ],
  },
];

async function seedCareers() {
  await CareerPath.deleteMany({});
  await CareerPath.insertMany(careerData);
  console.log("Career paths seeded!");
}

async function seedResources() {
  await Resource.deleteMany({});
  await Resource.insertMany(resourceData);
  console.log("Resources seeded!");
}

async function seedQuiz() {
  await Quiz.deleteMany({});
  for (const q of quizData) {
    const quiz = new Quiz({
      question: q.question,
      category: q.category,
      options: q.options.map((opt) => ({
        text: opt.text,
        careerWeights: new Map(Object.entries(opt.careerWeights)),
      })),
    });
    await quiz.save();
  }
  console.log("Quiz questions seeded!");
}

module.exports = { seedCareers, seedResources, seedQuiz };
