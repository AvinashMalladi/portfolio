export const profile = {
  name: 'Avinash Malladi',
  firstName: 'Avinash',
  monogram: 'AM',
  roles: [
    'Software Engineer',
    'Backend Developer',
    'Full-Stack Developer',
    'AI / ML Developer',
  ],
  tagline:
    'I build reliable, scalable software — from REST APIs and real-time dashboards to agentic AI systems — and ship it to the cloud.',
  summary:
    'B.Tech Computer Science student with hands-on experience building web applications, backend systems, REST APIs, and database-driven solutions using Python, JavaScript, SQL, Flask, MySQL, and SQLite. Experienced with Git, Docker, GitHub Actions, AWS, CI/CD, testing, and technical documentation, with projects spanning API-driven applications, real-time dashboards, debugging tools, and AI-powered software. Focused on software engineering, backend development, full-stack technologies, cloud platforms, and building reliable, scalable applications.',
  email: 'malladiavinash3@gmail.com',
  emailHref: 'mailto:malladiavinash3@gmail.com',
  phone: '+91 62818 55895',
  phoneHref: 'tel:+916281855895',
  location: 'Warangal, Telangana, India',
  university: 'SR University, Warangal',
  resume: 'resume.pdf',
  links: {
    linkedin: 'https://www.linkedin.com/in/malladi-avinash-ba8727286',
    github: 'https://github.com/AvinashMalladi',
    credly: 'https://www.credly.com/users/malladi-avinash',
  },
  stats: [
    { value: '4+', label: 'Projects Built' },
    { value: '4', label: 'Certifications' },
    { value: '1', label: 'IEEE Research Paper' },
    { value: '8.6', label: 'B.Tech CGPA' },
  ],
}

export const skills = [
  {
    category: 'Programming Languages',
    icon: 'code',
    accent: 'from-indigo-500 to-violet-500',
    items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'C'],
  },
  {
    category: 'Backend & APIs',
    icon: 'server',
    accent: 'from-violet-500 to-purple-500',
    items: ['Node.js', 'Express.js', 'Flask', 'REST APIs', 'API Design', 'OOP'],
  },
  {
    category: 'Frontend',
    icon: 'layout',
    accent: 'from-sky-500 to-cyan-400',
    items: ['React.js', 'HTML', 'CSS', 'JavaScript', 'Leaflet.js', 'Chart.js'],
  },
  {
    category: 'Databases & Web',
    icon: 'database',
    accent: 'from-emerald-500 to-teal-400',
    items: ['MySQL', 'SQLite'],
  },
  {
    category: 'Software Engineering',
    icon: 'git-branch',
    accent: 'from-amber-500 to-orange-400',
    items: [
      'Data Structures & Algorithms',
      'Git',
      'GitHub',
      'Unit Testing',
      'Integration Testing',
      'Debugging',
      'Code Analysis',
      'Technical Documentation',
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: 'cloud',
    accent: 'from-blue-500 to-indigo-400',
    items: ['AWS', 'Docker', 'GitHub Actions', 'CI/CD'],
  },
  {
    category: 'Generative AI',
    icon: 'sparkles',
    accent: 'from-fuchsia-500 to-pink-500',
    items: [
      'RAG',
      'LLM Applications',
      'BM25',
      'Information Retrieval',
      'Agentic Workflows',
      'Prompt Engineering',
      'LangChain',
      'SHAP',
      'LIME',
      'PDP',
      'ICE',
    ],
  },
  {
    category: 'Machine Learning',
    icon: 'brain',
    accent: 'from-rose-500 to-red-400',
    items: [
      'Scikit-learn',
      'TensorFlow',
      'XGBoost',
      'Feature Engineering',
      'Model Evaluation',
      'SMOTE',
    ],
  },
]

export const projects = [
  {
    title: 'Smart Disaster Relief System',
    tagline: 'Intelligent resource allocation for disaster response.',
    description:
      'A disaster management web platform that connects reports, relief camps, and victims through backend-driven workflows — turning chaos into coordinated, resource-aware relief.',
    bullets: [
      'Built a Flask + SQLite web application managing disaster reports, relief camps, resources, and victim allocation through backend-driven workflows.',
      'Implemented risk classification, geolocation, resource-aware allocation, and nearest-camp detection using OpenStreetMap Nominatim with rule-based decision logic.',
      'Created a real-time monitoring dashboard with JavaScript, Leaflet.js, Chart.js, and heatmaps — periodic backend polling, risk alerts, geolocation, and map-based routing.',
    ],
    tech: ['Flask', 'SQLite', 'JavaScript', 'Leaflet.js', 'Chart.js', 'OpenStreetMap'],
    impact: [
      'Real-time disaster monitoring & routing',
      'Rule-based risk classification',
      'Resource-aware victim allocation',
    ],
    icon: 'life-buoy',
    accent: 'from-sky-500 to-indigo-500',
    links: [],
  },
  {
    title: 'AI Code Debugger',
    tagline: 'ML + NLP powered debugging assistant for Python.',
    description:
      'An AI-assisted debugging application that reads Python source code and pinpoints syntax, runtime, and logical errors — with plain-English explanations and fixes.',
    bullets: [
      'Developed an AI-assisted Python debugging application that analyzes source code to identify syntax, runtime, and logical errors.',
      'Implemented automated error classification, explanations, and debugging suggestions using Python code parsing, machine learning, and NLP techniques.',
    ],
    tech: ['Python', 'Code Parsing', 'Machine Learning', 'NLP'],
    impact: ['Automated error classification', 'Actionable fix suggestions', 'Plain-English explanations'],
    icon: 'bug',
    accent: 'from-emerald-500 to-teal-400',
    links: [],
  },
  {
    title: 'SR University AI Assistant — Agentic RAG Chatbot',
    featured: true,
    tagline: 'University Q&A assistant with citations you can trust.',
    description:
      'A production-minded, agentic RAG chatbot answering university policy and academic queries — with page-level citations, custom retrieval, and CI/CD-ready evaluation baked in.',
    bullets: [
      'Developed an AI-powered web app for university policy and academic queries using RAG with page-level source citations.',
      'Implemented a custom BM25 retrieval pipeline with document routing, chunking, stemming, phrase matching, and reranking for retrieval relevance.',
      'Built an agentic tool workflow for handbook search, safe arithmetic, and optional web search, with fallback handling for tool and LLM failures.',
      'Created a golden Q&A evaluation framework measuring Hit Rate and MRR; containerized with Docker for CI/CD-ready automated evaluation.',
    ],
    tech: ['RAG', 'BM25', 'LangChain', 'Agentic AI', 'Python', 'Docker', 'CI/CD'],
    impact: ['98% efficient retrieval via BM25 pipeline', 'Page-level citations', 'Hit Rate & MRR evaluation'],
    icon: 'bot',
    accent: 'from-violet-500 to-fuchsia-500',
    links: [],
  },
  {
    title: 'Explainable AI Lung Cancer Prediction',
    tagline: 'IEEE ICICCS 2026 research paper — co-authored & presented.',
    description:
      'A multi-model explainable ML study for lung cancer prediction, benchmarked across classifiers with 98% accuracy and interpreted with SHAP, LIME, PDP, and ICE.',
    bullets: [
      'Co-authored and presented a research paper at the IEEE ICICCS 2026 International Conference on explainable machine learning for lung cancer prediction.',
      'Evaluated multiple ML models achieving 98% accuracy using XGBoost; applied SHAP, LIME, PDP, and ICE for model interpretation.',
    ],
    tech: ['Python', 'XGBoost', 'Scikit-learn', 'SHAP', 'LIME', 'PDP', 'ICE'],
    impact: ['98% accuracy (XGBoost)', 'IEEE conference presentation', 'Full model explainability'],
    icon: 'brain-circuit',
    accent: 'from-rose-500 to-orange-400',
    links: [
      {
        label: 'Research Paper',
        href: 'https://drive.google.com/file/d/1-uIzxGHp5sOhgfYWnbXDwoCXhJJeLFyf/view?usp=sharing',
      },
    ],
  },
]

export const experience = [
  {
    type: 'Education',
    items: [
      {
        title: 'B.Tech in Computer Science & Engineering',
        org: 'SR University, Warangal',
        period: 'Aug 2023 — Present',
        points: [
          'CGPA: 8.6 / 10',
          'Focus: software engineering, backend systems, cloud & AI',
        ],
        icon: 'graduation-cap',
      },
      {
        title: 'Intermediate (Class 11 & 12)',
        org: 'Narayana Junior College, Hyderabad',
        period: 'Aug 2021 — May 2023',
        points: ['Score: 92.9%', 'MPC stream'],
        icon: 'book-open',
      },
      {
        title: 'High School',
        org: 'Krishnaveni Talent School, Mancherial',
        period: '2020',
        points: ['CGPA: 10 / 10'],
        icon: 'school',
      },
    ],
  },
  {
    type: 'Research',
    items: [
      {
        title: 'Research Paper — IEEE ICICCS 2026',
        org: 'International Conference',
        period: 'Presented',
        points: [
          'Explainable AI-powered lung cancer prediction — multi-model ML study',
          'XGBoost at 98% accuracy; interpreted with SHAP, LIME, PDP & ICE',
        ],
        icon: 'flask-conical',
        link: 'https://drive.google.com/file/d/1-uIzxGHp5sOhgfYWnbXDwoCXhJJeLFyf/view?usp=sharing',
      },
    ],
  },
]

export const certifications = [
  {
    title: 'Amazon Certified Cloud Practitioner',
    issuer: 'Amazon Skill Builder',
    date: 'May 2026',
    verify: 'https://drive.google.com/file/d/1nKLioaQHcaSvBPXY4yATe7Gv0fUjQHA9/view?usp=sharing',
    icon: 'cloud',
    accent: 'from-orange-500 to-amber-400',
  },
  {
    title: 'Microsoft Azure AI Fundamentals (AI-900)',
    issuer: 'Microsoft',
    date: 'Aug 2025',
    verify: 'https://www.credly.com/badges/4f39d969-5fd7-4ffd-9d44-4778f1463fdf/public_url',
    icon: 'cpu',
    accent: 'from-sky-500 to-blue-500',
  },
  {
    title: 'AWS Academy Data Engineering',
    issuer: 'AWS',
    date: 'Feb 2025',
    verify: 'https://www.credly.com/badges/0f0eebac-1d80-4c5f-b5b8-7c811ea01d26',
    icon: 'database',
    accent: 'from-blue-500 to-indigo-400',
  },
  {
    title: 'Python Full Stack',
    issuer: 'EduSkills',
    date: 'Dec 2024',
    verify: 'https://drive.google.com/file/d/1hqBzRAA99ltZJ3XD7LeaMrjWMAYumpxU/view?usp=drive_link',
    icon: 'code-2',
    accent: 'from-indigo-500 to-violet-500',
  },
]