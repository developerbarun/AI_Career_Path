import {
  FaBrain,
  FaChartBar,
  FaFlask,
  FaComments,
  FaEye,
  FaRocket,
} from "react-icons/fa";

export const iconMap = {
  FaBrain,
  FaChartBar,
  FaFlask,
  FaComments,
  FaEye,
  FaRocket,
};

export const careerNames = {
  "ml-engineer": "Machine Learning Engineer",
  "data-scientist": "Data Scientist",
  "ai-researcher": "AI Research Scientist",
  "nlp-engineer": "NLP Engineer",
  "cv-engineer": "Computer Vision Engineer",
  "ai-product-manager": "AI/ML Product Manager",
};

export const fallbackCareers = [
  {
    _id: "1",
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
    _id: "2",
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
    _id: "3",
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
    _id: "4",
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
          "Word Embeddings",
          "RNNs & LSTMs",
          "Seq-to-Seq Models",
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
    _id: "5",
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
          "CNNs (ResNet, VGG)",
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
          "Edge Deployment (TensorRT)",
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
    _id: "6",
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
          "Thought Leadership",
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

export const fallbackQuiz = [
  {
    _id: "q1",
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
    _id: "q2",
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
    _id: "q3",
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
    _id: "q4",
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
    _id: "q5",
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
    _id: "q6",
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
    _id: "q7",
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

export const fallbackResources = [
  { _id: "r1", title: "Deep Learning Specialization", type: "Course", description: "Andrew Ng's comprehensive deep learning courses on Coursera", url: "https://www.coursera.org/specializations/deep-learning", careerPath: "ml-engineer", difficulty: "Intermediate", free: false, rating: 4.9 },
  { _id: "r2", title: "Fast.ai Practical Deep Learning", type: "Course", description: "Top-down approach to learning deep learning", url: "https://course.fast.ai/", careerPath: "ml-engineer", difficulty: "Intermediate", free: true, rating: 4.8 },
  { _id: "r3", title: "Hands-On Machine Learning", type: "Book", description: "Aurélien Géron's bestseller — from basics to deployment", url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/", careerPath: "ml-engineer", difficulty: "Intermediate", free: false, rating: 4.8 },
  { _id: "r4", title: "Kaggle Competitions", type: "Community", description: "Practice ML with real datasets and compete globally", url: "https://www.kaggle.com/competitions", careerPath: "data-scientist", difficulty: "Beginner", free: true, rating: 4.7 },
  { _id: "r5", title: "Python for Data Analysis", type: "Book", description: "Wes McKinney's essential guide to Pandas", url: "https://wesmckinney.com/book/", careerPath: "data-scientist", difficulty: "Beginner", free: false, rating: 4.6 },
  { _id: "r6", title: "CS231n Stanford Computer Vision", type: "Course", description: "Stanford's legendary course on CNNs", url: "https://cs231n.stanford.edu/", careerPath: "cv-engineer", difficulty: "Advanced", free: true, rating: 4.9 },
  { _id: "r7", title: "HuggingFace NLP Course", type: "Course", description: "Free comprehensive course on modern NLP", url: "https://huggingface.co/learn/nlp-course", careerPath: "nlp-engineer", difficulty: "Intermediate", free: true, rating: 4.8 },
  { _id: "r8", title: "Attention Is All You Need", type: "Tutorial", description: "The foundational transformer paper", url: "https://arxiv.org/abs/1706.03762", careerPath: "ai-researcher", difficulty: "Advanced", free: true, rating: 5.0 },
  { _id: "r9", title: "3Blue1Brown Neural Networks", type: "Tutorial", description: "Beautiful visual explanations of neural networks", url: "https://www.3blue1brown.com/topics/neural-networks", careerPath: "ml-engineer", difficulty: "Beginner", free: true, rating: 4.9 },
  { _id: "r10", title: "Full Stack Deep Learning", type: "Course", description: "Production ML systems from experiment to deployment", url: "https://fullstackdeeplearning.com/", careerPath: "ml-engineer", difficulty: "Advanced", free: true, rating: 4.7 },
  { _id: "r11", title: "Google AI PM Course", type: "Course", description: "Learn AI PM skills from Google professionals", url: "https://www.coursera.org/learn/ai-product-management-duke", careerPath: "ai-product-manager", difficulty: "Intermediate", free: false, rating: 4.5 },
  { _id: "r12", title: "Made With ML", type: "Tutorial", description: "End-to-end ML project with MLOps best practices", url: "https://madewithml.com/", careerPath: "ml-engineer", difficulty: "Intermediate", free: true, rating: 4.7 },
];

export const fallbackTopicQuizzes = {
  "ml-engineer": [
    { _id: "tq-ml-1", question: "What is the primary purpose of a loss function in machine learning?", options: [{ text: "To visualize data distributions", correct: false }, { text: "To measure how far predictions are from actual values", correct: true }, { text: "To normalize input features", correct: false }, { text: "To split data into training and test sets", correct: false }], explanation: "A loss function quantifies the error between predicted and actual values, guiding the optimization process during training." },
    { _id: "tq-ml-2", question: "Which technique helps prevent overfitting in neural networks?", options: [{ text: "Increasing the learning rate", correct: false }, { text: "Adding more layers", correct: false }, { text: "Dropout regularization", correct: true }, { text: "Removing validation data", correct: false }], explanation: "Dropout randomly deactivates neurons during training, forcing the network to learn more robust features and reducing overfitting." },
    { _id: "tq-ml-3", question: "What does the bias-variance tradeoff describe?", options: [{ text: "The tradeoff between model complexity and generalization", correct: true }, { text: "The tradeoff between training speed and accuracy", correct: false }, { text: "The tradeoff between CPU and GPU usage", correct: false }, { text: "The tradeoff between supervised and unsupervised learning", correct: false }], explanation: "High bias means underfitting (too simple), high variance means overfitting (too complex). Good models balance both." },
    { _id: "tq-ml-4", question: "What is the purpose of cross-validation?", options: [{ text: "To increase the dataset size", correct: false }, { text: "To reliably estimate model performance on unseen data", correct: true }, { text: "To speed up training", correct: false }, { text: "To select the best loss function", correct: false }], explanation: "Cross-validation splits data into multiple folds, training and evaluating on different subsets to get a robust performance estimate." },
    { _id: "tq-ml-5", question: "What does gradient descent optimize?", options: [{ text: "The number of features", correct: false }, { text: "The dataset size", correct: false }, { text: "The model's parameters to minimize the loss", correct: true }, { text: "The learning rate schedule", correct: false }], explanation: "Gradient descent iteratively adjusts model parameters in the direction that reduces the loss function." },
  ],
  "data-scientist": [
    { _id: "tq-ds-1", question: "What is the difference between correlation and causation?", options: [{ text: "They mean the same thing", correct: false }, { text: "Correlation implies a relationship; causation proves one variable directly affects another", correct: true }, { text: "Causation is weaker than correlation", correct: false }, { text: "Correlation only applies to time series", correct: false }], explanation: "Correlation shows variables move together, but causation requires proof that one directly causes the change in another." },
    { _id: "tq-ds-2", question: "What does a p-value less than 0.05 typically indicate?", options: [{ text: "The result is practically significant", correct: false }, { text: "The null hypothesis is proven false", correct: false }, { text: "The observed result is unlikely under the null hypothesis", correct: true }, { text: "The sample size is too small", correct: false }], explanation: "A p-value < 0.05 means there is less than a 5% chance of observing the data if the null hypothesis were true — suggesting statistical significance." },
    { _id: "tq-ds-3", question: "Which visualization is best for showing the distribution of a single numeric variable?", options: [{ text: "Scatter plot", correct: false }, { text: "Histogram", correct: true }, { text: "Bar chart", correct: false }, { text: "Pie chart", correct: false }], explanation: "Histograms show the frequency distribution of a continuous variable by grouping values into bins." },
    { _id: "tq-ds-4", question: "What is feature engineering?", options: [{ text: "Removing all features from the dataset", correct: false }, { text: "Creating new informative features from existing data to improve model performance", correct: true }, { text: "Selecting the programming language for the project", correct: false }, { text: "Scaling features to the range [0, 100]", correct: false }], explanation: "Feature engineering transforms raw data into features that better represent the underlying patterns, often dramatically improving model accuracy." },
    { _id: "tq-ds-5", question: "What does SQL JOIN do?", options: [{ text: "Deletes rows from two tables", correct: false }, { text: "Combines rows from two or more tables based on a related column", correct: true }, { text: "Creates a new database", correct: false }, { text: "Sorts data alphabetically", correct: false }], explanation: "SQL JOINs combine rows from different tables where a specified condition is met, enabling queries across related data." },
  ],
  "ai-researcher": [
    { _id: "tq-ar-1", question: "What is the key innovation of the Transformer architecture?", options: [{ text: "Convolutional layers for text", correct: false }, { text: "Self-attention mechanism replacing recurrence", correct: true }, { text: "Larger training datasets", correct: false }, { text: "Faster GPUs", correct: false }], explanation: "Transformers use self-attention to process all positions in parallel, eliminating the sequential bottleneck of RNNs while capturing long-range dependencies." },
    { _id: "tq-ar-2", question: "What does the 'No Free Lunch' theorem state?", options: [{ text: "Deep learning always outperforms other methods", correct: false }, { text: "No single algorithm works best for every problem", correct: true }, { text: "Training is always computationally expensive", correct: false }, { text: "You should always use ensemble methods", correct: false }], explanation: "The theorem states that averaged over all possible problems, no algorithm outperforms another — algorithm choice must be tailored to the specific problem." },
    { _id: "tq-ar-3", question: "What is a GAN (Generative Adversarial Network)?", options: [{ text: "A single network that classifies images", correct: false }, { text: "Two networks (generator and discriminator) trained in competition", correct: true }, { text: "A type of recurrent neural network", correct: false }, { text: "A method for data cleaning", correct: false }], explanation: "GANs consist of a generator creating fake samples and a discriminator trying to distinguish real from fake, driving both to improve through adversarial training." },
    { _id: "tq-ar-4", question: "What is the vanishing gradient problem?", options: [{ text: "Gradients become infinitely large during training", correct: false }, { text: "Gradients approach zero in deep networks, stalling learning in early layers", correct: true }, { text: "The model runs out of memory", correct: false }, { text: "The learning rate is too high", correct: false }], explanation: "In deep networks, gradients can shrink exponentially as they propagate backward, making it impossible for early layers to learn. Solutions include ResNets and better activations." },
    { _id: "tq-ar-5", question: "What is the purpose of ablation studies in research?", options: [{ text: "To increase model accuracy", correct: false }, { text: "To systematically remove components to understand their individual contribution", correct: true }, { text: "To reduce training time", correct: false }, { text: "To generate synthetic data", correct: false }], explanation: "Ablation studies isolate the impact of each component by removing them one at a time, helping researchers understand what actually drives performance." },
  ],
  "nlp-engineer": [
    { _id: "tq-nlp-1", question: "What does tokenization do in NLP?", options: [{ text: "Translates text between languages", correct: false }, { text: "Breaks text into smaller units (tokens) for processing", correct: true }, { text: "Removes stop words", correct: false }, { text: "Generates text summaries", correct: false }], explanation: "Tokenization splits raw text into tokens (words, subwords, or characters) that can be converted to numerical representations for model input." },
    { _id: "tq-nlp-2", question: "What is the attention mechanism in Transformers?", options: [{ text: "A way to compress the input sequence", correct: false }, { text: "A method that allows each token to weigh the importance of every other token", correct: true }, { text: "A technique for removing irrelevant words", correct: false }, { text: "A method for generating text faster", correct: false }], explanation: "Attention computes relevance scores between all pairs of tokens, allowing the model to focus on the most relevant context regardless of distance." },
    { _id: "tq-nlp-3", question: "What does BERT stand for?", options: [{ text: "Basic Encoded Representation of Text", correct: false }, { text: "Bidirectional Encoder Representations from Transformers", correct: true }, { text: "Binary Entity Recognition Tool", correct: false }, { text: "Batch Encoded Recurrent Transformer", correct: false }], explanation: "BERT uses bidirectional training — reading text in both directions simultaneously — to build deep contextual word representations." },
    { _id: "tq-nlp-4", question: "What is RAG (Retrieval-Augmented Generation)?", options: [{ text: "A new type of neural network activation", correct: false }, { text: "A training technique for small datasets", correct: false }, { text: "Combining retrieved documents with LLM generation for grounded responses", correct: true }, { text: "A method for text classification", correct: false }], explanation: "RAG retrieves relevant documents from a knowledge base and feeds them to an LLM, producing responses grounded in actual data rather than just parametric memory." },
    { _id: "tq-nlp-5", question: "What is the purpose of fine-tuning a pre-trained language model?", options: [{ text: "To train it from scratch on new data", correct: false }, { text: "To adapt its learned representations to a specific task or domain", correct: true }, { text: "To reduce the model size", correct: false }, { text: "To convert it to a different programming language", correct: false }], explanation: "Fine-tuning updates a pre-trained model's weights on task-specific data, leveraging its general knowledge while adapting to the target domain." },
  ],
  "cv-engineer": [
    { _id: "tq-cv-1", question: "What is a convolutional neural network (CNN) best suited for?", options: [{ text: "Text generation", correct: false }, { text: "Processing grid-like data such as images", correct: true }, { text: "Time series forecasting only", correct: false }, { text: "Database queries", correct: false }], explanation: "CNNs use convolutional filters to detect spatial patterns like edges, textures, and shapes, making them ideal for image and video data." },
    { _id: "tq-cv-2", question: "What does object detection do compared to image classification?", options: [{ text: "They are exactly the same task", correct: false }, { text: "Detection locates and classifies multiple objects with bounding boxes", correct: true }, { text: "Detection only works on black-and-white images", correct: false }, { text: "Classification is more complex than detection", correct: false }], explanation: "Classification assigns one label to an entire image, while detection identifies multiple objects and their locations using bounding boxes." },
    { _id: "tq-cv-3", question: "What is transfer learning in computer vision?", options: [{ text: "Moving data between servers", correct: false }, { text: "Using a model pre-trained on a large dataset and adapting it to a new task", correct: true }, { text: "Transferring images between formats", correct: false }, { text: "A type of data compression", correct: false }], explanation: "Transfer learning reuses features learned from large datasets (like ImageNet) to solve new tasks with less data, dramatically reducing training time and data requirements." },
    { _id: "tq-cv-4", question: "What does image segmentation produce?", options: [{ text: "A single class label for the image", correct: false }, { text: "Bounding boxes around objects", correct: false }, { text: "A pixel-level mask classifying each pixel", correct: true }, { text: "A compressed version of the image", correct: false }], explanation: "Segmentation assigns a class label to every pixel in the image, creating precise outlines of objects rather than just bounding boxes." },
    { _id: "tq-cv-5", question: "What is YOLO known for in computer vision?", options: [{ text: "Image generation", correct: false }, { text: "Real-time object detection in a single pass", correct: true }, { text: "Text recognition only", correct: false }, { text: "Lossless image compression", correct: false }], explanation: "YOLO (You Only Look Once) processes the entire image in one forward pass, achieving real-time detection speeds while maintaining competitive accuracy." },
  ],
  "ai-product-manager": [
    { _id: "tq-pm-1", question: "What is the most important consideration when defining an AI product?", options: [{ text: "Using the most advanced model available", correct: false }, { text: "Clearly defining the problem and ensuring quality data exists", correct: true }, { text: "Hiring the largest engineering team possible", correct: false }, { text: "Choosing the trendiest technology stack", correct: false }], explanation: "Without a clear problem definition and quality data, even the most sophisticated AI model will fail. Problem-data fit is the foundation of any AI product." },
    { _id: "tq-pm-2", question: "What is an A/B test in product management?", options: [{ text: "Testing two different programming languages", correct: false }, { text: "Comparing two variants of a feature to measure which performs better", correct: true }, { text: "Testing on Android and iOS simultaneously", correct: false }, { text: "A type of security audit", correct: false }], explanation: "A/B testing randomly assigns users to different variants, measuring key metrics to make data-driven decisions about which version drives better outcomes." },
    { _id: "tq-pm-3", question: "What is 'model bias' and why should a PM care?", options: [{ text: "It only affects research papers", correct: false }, { text: "Systematic errors in AI outputs that can harm users and create legal/ethical risks", correct: true }, { text: "It makes models run slower", correct: false }, { text: "It is automatically fixed during deployment", correct: false }], explanation: "Model bias can lead to unfair outcomes for certain user groups, causing reputational damage, legal liability, and real harm. PMs must actively monitor and mitigate bias." },
    { _id: "tq-pm-4", question: "What is a key metric for evaluating an AI-powered recommendation system?", options: [{ text: "Lines of code", correct: false }, { text: "Server uptime", correct: false }, { text: "Click-through rate and user engagement", correct: true }, { text: "Number of engineers on the team", correct: false }], explanation: "Business metrics like CTR, conversion rate, and engagement measure the actual impact of recommendations on user behavior and business outcomes." },
    { _id: "tq-pm-5", question: "What is the 'cold start' problem in AI products?", options: [{ text: "The server takes too long to boot", correct: false }, { text: "The system struggles to make good predictions for new users or items with no history", correct: true }, { text: "A bug that occurs in winter", correct: false }, { text: "When the AI model needs retraining", correct: false }], explanation: "New users/items lack interaction history, making personalization difficult. Solutions include content-based approaches, onboarding surveys, and popularity-based defaults." },
  ],
};
