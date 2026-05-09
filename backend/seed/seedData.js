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
    title: "MLOps Engineer",
    slug: "mlops-engineer",
    description:
      "Build the infrastructure that lets AI models ship safely and scale reliably. Focus on deployment pipelines, monitoring, reproducibility, and model lifecycle management.",
    icon: "FaCogs",
    color: "#7A5CFA",
    salaryRange: { min: 125000, max: 215000 },
    demandLevel: "Very High",
    skills: [
      { name: "Docker & Kubernetes", level: "Advanced" },
      { name: "CI/CD", level: "Advanced" },
      { name: "Python", level: "Advanced" },
      { name: "Cloud Platforms", level: "Advanced" },
      { name: "Monitoring & Observability", level: "Intermediate" },
      { name: "ML Model Deployment", level: "Advanced" },
    ],
    roadmap: [
      {
        phase: 1,
        title: "Core Infrastructure",
        duration: "2-3 months",
        topics: [
          "Linux & Shell Basics",
          "Docker Fundamentals",
          "Git & Version Control",
          "Python Packaging",
        ],
      },
      {
        phase: 2,
        title: "Deployment Pipelines",
        duration: "3-4 months",
        topics: [
          "CI/CD for ML",
          "Model Serving APIs",
          "Kubernetes Basics",
          "Feature Stores",
        ],
      },
      {
        phase: 3,
        title: "Operations & Monitoring",
        duration: "3 months",
        topics: [
          "Model Monitoring",
          "Drift Detection",
          "Logging & Alerting",
          "A/B Testing",
        ],
      },
      {
        phase: 4,
        title: "Scaling Systems",
        duration: "Ongoing",
        topics: [
          "Cloud Cost Optimization",
          "Infrastructure as Code",
          "Security Best Practices",
          "Multi-model Serving",
        ],
      },
    ],
    tools: [
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "MLflow",
      "AWS",
      "GCP",
      "Prometheus",
      "Grafana",
    ],
    companies: [
      "Google",
      "Amazon",
      "Netflix",
      "Spotify",
      "Databricks",
      "OpenAI",
      "Meta",
      "Uber",
    ],
    prerequisites: [
      "Programming fundamentals",
      "Cloud exposure",
      "Interest in deployment and reliability",
    ],
  },
  {
    title: "AI Ethics Specialist",
    slug: "ai-ethics-specialist",
    description:
      "Shape responsible AI systems that are fair, transparent, and safe. Work with policy, product, and engineering teams to evaluate risk and reduce harm.",
    icon: "FaShieldAlt",
    color: "#1FB6A6",
    salaryRange: { min: 115000, max: 200000 },
    demandLevel: "High",
    skills: [
      { name: "AI Governance", level: "Advanced" },
      { name: "Risk Assessment", level: "Advanced" },
      { name: "Policy Analysis", level: "Advanced" },
      { name: "Data Privacy", level: "Intermediate" },
      { name: "Research & Writing", level: "Advanced" },
      { name: "Stakeholder Communication", level: "Advanced" },
    ],
    roadmap: [
      {
        phase: 1,
        title: "AI Fundamentals",
        duration: "2-3 months",
        topics: [
          "How AI Models Work",
          "Training Data Bias",
          "Evaluation Metrics",
          "Basic Statistics",
        ],
      },
      {
        phase: 2,
        title: "Responsible AI",
        duration: "3-4 months",
        topics: [
          "Fairness Techniques",
          "Transparency & Explainability",
          "Privacy Preservation",
          "Safety Testing",
        ],
      },
      {
        phase: 3,
        title: "Policy & Governance",
        duration: "3 months",
        topics: [
          "AI Regulations",
          "Model Auditing",
          "Documentation Standards",
          "Risk Frameworks",
        ],
      },
      {
        phase: 4,
        title: "Applied Practice",
        duration: "Ongoing",
        topics: [
          "Ethics Review Process",
          "Red Teaming",
          "Incident Response",
          "Governance Playbooks",
        ],
      },
    ],
    tools: [
      "Jupyter",
      "Python",
      "Notion",
      "Excel",
      "Policy Templates",
      "Figma",
      "Miro",
      "Docs",
    ],
    companies: [
      "OpenAI",
      "Anthropic",
      "Google",
      "Microsoft",
      "Meta",
      "Partnership on AI",
      "OECD",
      "UNESCO",
    ],
    prerequisites: [
      "Ethics or policy interest",
      "Clear writing skills",
      "Ability to work across teams",
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
  {
    title: "Software Engineer",
    slug: "software-engineer",
    description:
      "Build products, APIs, and systems that power everyday digital experiences. Focus on clean code, scalable architecture, and shipping features users love.",
    icon: "FaCode",
    color: "#4B9FFF",
    salaryRange: { min: 105000, max: 190000 },
    demandLevel: "Very High",
    skills: [
      { name: "Programming Fundamentals", level: "Advanced" },
      { name: "Data Structures & Algorithms", level: "Advanced" },
      { name: "System Design", level: "Intermediate" },
      { name: "Databases", level: "Intermediate" },
      { name: "Testing & Debugging", level: "Advanced" },
      { name: "APIs", level: "Advanced" },
    ],
    roadmap: [
      {
        phase: 1,
        title: "Programming Foundation",
        duration: "2-3 months",
        topics: [
          "Choose a Language",
          "Variables & Control Flow",
          "Functions & Modules",
          "Git Basics",
        ],
      },
      {
        phase: 2,
        title: "Core CS Skills",
        duration: "3-4 months",
        topics: [
          "Data Structures",
          "Algorithms",
          "Databases & SQL",
          "HTTP & APIs",
        ],
      },
      {
        phase: 3,
        title: "Building Products",
        duration: "3-4 months",
        topics: [
          "Frontend Basics",
          "Backend Basics",
          "Authentication",
          "Testing",
        ],
      },
      {
        phase: 4,
        title: "Engineering at Scale",
        duration: "Ongoing",
        topics: [
          "System Design",
          "Performance Optimization",
          "Cloud Deployment",
          "Observability",
        ],
      },
    ],
    tools: [
      "VS Code",
      "Git",
      "Docker",
      "Postman",
      "Node.js",
      "React",
      "PostgreSQL",
      "Jest",
    ],
    companies: [
      "Google",
      "Microsoft",
      "Amazon",
      "Meta",
      "Apple",
      "Stripe",
      "Shopify",
      "Atlassian",
    ],
    prerequisites: [
      "Logical thinking",
      "Coding interest",
      "Problem-solving mindset",
    ],
  },
  {
    title: "Cybersecurity Analyst",
    slug: "cybersecurity-analyst",
    description:
      "Defend systems, detect threats, and investigate suspicious activity. Help organizations protect users, data, and infrastructure from evolving attacks.",
    icon: "FaShieldAlt",
    color: "#FF7A59",
    salaryRange: { min: 110000, max: 205000 },
    demandLevel: "Very High",
    skills: [
      { name: "Security Fundamentals", level: "Advanced" },
      { name: "Networking", level: "Advanced" },
      { name: "Threat Detection", level: "Advanced" },
      { name: "Incident Response", level: "Intermediate" },
      { name: "Scripting", level: "Intermediate" },
      { name: "Risk Analysis", level: "Advanced" },
    ],
    roadmap: [
      {
        phase: 1,
        title: "Security Foundations",
        duration: "2-3 months",
        topics: [
          "Networking Basics",
          "Operating Systems Security",
          "Security Principles",
          "Threat Landscape",
        ],
      },
      {
        phase: 2,
        title: "Defensive Skills",
        duration: "3-4 months",
        topics: [
          "SIEM Tools",
          "Vulnerability Scanning",
          "Log Analysis",
          "Endpoint Security",
        ],
      },
      {
        phase: 3,
        title: "Incident Response",
        duration: "3 months",
        topics: [
          "Phishing Analysis",
          "Malware Basics",
          "Digital Forensics",
          "Incident Playbooks",
        ],
      },
      {
        phase: 4,
        title: "Security Operations",
        duration: "Ongoing",
        topics: [
          "Cloud Security",
          "Policy & Compliance",
          "Risk Management",
          "Security Automation",
        ],
      },
    ],
    tools: [
      "Wireshark",
      "Splunk",
      "Nmap",
      "Burp Suite",
      "Kali Linux",
      "Python",
      "SIEM",
      "Git",
    ],
    companies: [
      "CrowdStrike",
      "Palo Alto Networks",
      "Microsoft",
      "Google",
      "Cisco",
      "Cloudflare",
      "Okta",
      "Zscaler",
    ],
    prerequisites: [
      "Networking basics",
      "Attention to detail",
      "Interest in defense and risk",
    ],
  },
  {
    title: "Cloud Architect",
    slug: "cloud-architect",
    description:
      "Design scalable cloud systems and the infrastructure behind modern products. Balance cost, reliability, security, and performance across deployments.",
    icon: "FaCloud",
    color: "#36C2FF",
    salaryRange: { min: 125000, max: 220000 },
    demandLevel: "Very High",
    skills: [
      { name: "Cloud Platforms", level: "Advanced" },
      { name: "Networking", level: "Advanced" },
      { name: "Infrastructure as Code", level: "Advanced" },
      { name: "Security", level: "Intermediate" },
      { name: "Cost Optimization", level: "Intermediate" },
      { name: "Reliability Engineering", level: "Advanced" },
    ],
    roadmap: [
      {
        phase: 1,
        title: "Cloud Basics",
        duration: "2-3 months",
        topics: [
          "Cloud Service Models",
          "Networking Fundamentals",
          "Identity & Access",
          "Compute and Storage",
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
    tools: [
      "AWS",
      "Azure",
      "GCP",
      "Terraform",
      "Kubernetes",
      "Docker",
      "Prometheus",
      "Grafana",
    ],
    companies: [
      "Amazon",
      "Microsoft",
      "Google",
      "Netflix",
      "Salesforce",
      "Capital One",
      "Datadog",
      "Snowflake",
    ],
    prerequisites: [
      "Cloud basics",
      "Networking knowledge",
      "Interest in infrastructure",
    ],
  },
  {
    title: "UX/UI Designer",
    slug: "ux-ui-designer",
    description:
      "Craft intuitive digital experiences that people enjoy using. Work across research, wireframes, prototypes, and visual design to solve real user problems.",
    icon: "FaPalette",
    color: "#FF9F1C",
    salaryRange: { min: 90000, max: 170000 },
    demandLevel: "High",
    skills: [
      { name: "User Research", level: "Advanced" },
      { name: "Wireframing & Prototyping", level: "Advanced" },
      { name: "Visual Design", level: "Advanced" },
      { name: "Accessibility", level: "Intermediate" },
      { name: "Design Systems", level: "Intermediate" },
      { name: "Communication", level: "Advanced" },
    ],
    roadmap: [
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
    tools: [
      "Figma",
      "FigJam",
      "Adobe XD",
      "Miro",
      "Notion",
      "Maze",
      "Canva",
      "Lottie",
    ],
    companies: [
      "Apple",
      "Google",
      "Adobe",
      "Figma",
      "Airbnb",
      "Canva",
      "Shopify",
      "Spotify",
    ],
    prerequisites: [
      "Visual curiosity",
      "Empathy for users",
      "Storytelling skills",
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
    question: "What kind of work gives you the most energy?",
    category: "Interest",
    options: [
      {
        text: "Building useful products and features",
        careerWeights: { "software-engineer": 3, "cloud-architect": 1 },
      },
      {
        text: "Finding patterns in data and making decisions from them",
        careerWeights: { "data-scientist": 3, "ai-product-manager": 1 },
      },
      {
        text: "Protecting systems and reducing risk",
        careerWeights: {
          "cybersecurity-analyst": 3,
          "cloud-architect": 1,
        },
      },
      {
        text: "Designing experiences people enjoy using",
        careerWeights: { "ux-ui-designer": 3, "ai-product-manager": 1 },
      },
    ],
  },
  {
    question: "Which project would you choose first?",
    category: "Projects",
    options: [
      {
        text: "A full-stack app that solves a real user problem",
        careerWeights: { "software-engineer": 3, "cloud-architect": 1 },
      },
      {
        text: "A dashboard that helps teams understand data",
        careerWeights: { "data-scientist": 3, "ai-product-manager": 1 },
      },
      {
        text: "A security audit that finds hidden vulnerabilities",
        careerWeights: {
          "cybersecurity-analyst": 3,
          "cloud-architect": 1,
        },
      },
      {
        text: "A polished prototype that improves the user journey",
        careerWeights: {
          "ux-ui-designer": 3,
          "software-engineer": 1,
        },
      },
    ],
  },
  {
    question: "How do you prefer to solve problems?",
    category: "Preference",
    options: [
      {
        text: "With code, debugging, and shipping features",
        careerWeights: {
          "software-engineer": 3,
          "cloud-architect": 2,
        },
      },
      {
        text: "With data, dashboards, and trend analysis",
        careerWeights: { "data-scientist": 3, "ai-product-manager": 1 },
      },
      {
        text: "With research, experimentation, and model testing",
        careerWeights: { "ai-researcher": 3, "ml-engineer": 1 },
      },
      {
        text: "With collaboration, strategy, and design thinking",
        careerWeights: {
          "ai-product-manager": 3,
          "ux-ui-designer": 2,
          "cybersecurity-analyst": 1,
        },
      },
    ],
  },
  {
    question: "What kind of environment suits you best?",
    category: "Environment",
    options: [
      {
        text: "A fast-moving team shipping products every week",
        careerWeights: {
          "software-engineer": 3,
          "ai-product-manager": 1,
        },
      },
      {
        text: "A reliability-focused team managing systems at scale",
        careerWeights: { "cloud-architect": 3, "software-engineer": 1 },
      },
      {
        text: "A research-heavy team testing ideas and hypotheses",
        careerWeights: { "ai-researcher": 3, "ml-engineer": 1 },
      },
      {
        text: "A collaborative product team focused on user needs",
        careerWeights: { "ux-ui-designer": 3, "ai-product-manager": 1 },
      },
    ],
  },
  {
    question: "Which skill would you most like to build?",
    category: "SkillGoals",
    options: [
      {
        text: "Software development and architecture",
        careerWeights: {
          "software-engineer": 3,
          "cloud-architect": 2,
        },
      },
      {
        text: "Data analysis and decision-making",
        careerWeights: { "data-scientist": 3, "ai-product-manager": 1 },
      },
      {
        text: "Security analysis and threat detection",
        careerWeights: {
          "cybersecurity-analyst": 3,
          "cloud-architect": 1,
        },
      },
      {
        text: "Design systems and user experiences",
        careerWeights: { "ux-ui-designer": 3, "ai-product-manager": 1 },
      },
    ],
  },
  {
    question: "What kind of impact motivates you most?",
    category: "Goals",
    options: [
      {
        text: "Helping people use products more easily",
        careerWeights: { "ux-ui-designer": 3, "software-engineer": 1 },
      },
      {
        text: "Keeping systems safe, stable, and reliable",
        careerWeights: { "cybersecurity-analyst": 3, "cloud-architect": 1 },
      },
      {
        text: "Turning data into decisions",
        careerWeights: { "data-scientist": 3, "ai-product-manager": 1 },
      },
      {
        text: "Building intelligent systems that improve over time",
        careerWeights: { "ml-engineer": 3, "ai-researcher": 2 },
      },
    ],
  },
  {
    question: "How would you like to spend your learning time?",
    category: "Learning Style",
    options: [
      {
        text: "Building apps, APIs, and features end to end",
        careerWeights: { "software-engineer": 3, "cloud-architect": 1 },
      },
      {
        text: "Learning cloud platforms, deployment, and automation",
        careerWeights: { "cloud-architect": 3, "software-engineer": 1 },
      },
      {
        text: "Practicing security tools and incident response",
        careerWeights: { "cybersecurity-analyst": 3, "cloud-architect": 1 },
      },
      {
        text: "Testing prototypes, user flows, and visual design",
        careerWeights: {
          "ux-ui-designer": 3,
          "ai-product-manager": 1,
        },
      },
    ],
  },
  {
    question: "Which non-AI path sounds most like your ideal workday?",
    category: "Direction",
    options: [
      {
        text: "Building apps, APIs, and backend systems",
        careerWeights: { "software-engineer": 3, "cloud-architect": 1 },
      },
      {
        text: "Protecting systems and investigating threats",
        careerWeights: { "cybersecurity-analyst": 3, "cloud-architect": 1 },
      },
      {
        text: "Designing intuitive, polished digital experiences",
        careerWeights: { "ux-ui-designer": 3, "software-engineer": 1 },
      },
      {
        text: "Designing scalable cloud platforms and automation",
        careerWeights: { "cloud-architect": 3, "software-engineer": 1 },
      },
    ],
  },
  {
    question: "Which kind of challenge sounds most rewarding?",
    category: "Challenge",
    options: [
      {
        text: "Solving tricky coding and system bugs",
        careerWeights: {
          "software-engineer": 3,
          "cloud-architect": 1,
        },
      },
      {
        text: "Stopping attacks and investigating suspicious activity",
        careerWeights: {
          "cybersecurity-analyst": 3,
          "software-engineer": 1,
        },
      },
      {
        text: "Turning user feedback into a simpler interface",
        careerWeights: {
          "ux-ui-designer": 3,
          "software-engineer": 1,
        },
      },
      {
        text: "Improving uptime, deployment, and infrastructure quality",
        careerWeights: {
          "cloud-architect": 3,
          "software-engineer": 1,
        },
      },
    ],
  },
  {
    question: "What would you most like to build?",
    category: "Build",
    options: [
      {
        text: "A scalable app or service users rely on daily",
        careerWeights: {
          "software-engineer": 3,
          "cloud-architect": 1,
        },
      },
      {
        text: "A secure environment that protects data and systems",
        careerWeights: {
          "cybersecurity-analyst": 3,
          "cloud-architect": 1,
        },
      },
      {
        text: "A seamless digital experience that feels effortless",
        careerWeights: {
          "ux-ui-designer": 3,
          "software-engineer": 1,
        },
      },
      {
        text: "A cloud platform that scales reliably under load",
        careerWeights: {
          "cloud-architect": 3,
          "software-engineer": 1,
        },
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

module.exports = { seedCareers, seedResources, seedQuiz, quizData };
