export const profile = {
  name: "Mokshit Surana",
  role: "ML / AI Engineer",
  location: "Chicago, USA",
  status: "Open to ML / AI roles",
  tagline:
    "I care about making LLMs trustworthy: evaluating their fairness and reliability, putting them to work in healthcare, and understanding the algorithms underneath.",
  email: "mokshitsurana3110@gmail.com",
  phone: "+1 (331) 269-4898",
  links: {
    email: "mailto:mokshitsurana3110@gmail.com",
    linkedin: "https://www.linkedin.com/in/MokshitSurana/",
    github: "https://github.com/MokshitSurana",
    scholar: "https://scholar.google.com/citations?user=ezgttgcAAAAJ&hl=en",
  },
};

export const about = {
  lead: "I recently finished my M.S. in Computer Science at the University of Illinois Chicago, where I worked across the whole ML stack.",
  body: "During my MS I wrote my thesis on the structural robustness of transformer models for clinical text summarization, built ECI, a multi-agent system that emits traceable Graph-RAG evidence, and shipped Keya, a conversational real estate assistant. Lately I've been implementing neural networks from scratch to really understand the algorithms underneath.",
  interests:
    "My core interests are LLM evaluation (how outputs hold up on fairness, bias, and misinformation), applying LLMs in healthcare to improve clinical workflows, and the core ML behind it all, like attention and transformers.",
  facts: [
    { label: "Interests", value: "LLM evaluation, healthcare AI, core ML" },
    { label: "Currently", value: "Implementing neural nets from scratch" },
    { label: "Research", value: "Thesis under review at EMNLP 2026 · IEEE CAI 2026" },
    { label: "Based in", value: "Chicago, USA" },
  ],
};

export type Experience = {
  role: string;
  org: string;
  location: string;
  period: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "Graduate Teaching Assistant",
    org: "University of Illinois Chicago",
    location: "Chicago, USA",
    period: "Jan 2025 – May 2026",
    points: [
      "Co-authored a research paper on LLM-generated metadata enrichment for RAG systems, accepted at IEEE CAI 2026; led experimental validation and benchmarking.",
      "Designed and deployed RAG infrastructure for student research teams: Graph-RAG pipelines on Neo4j, production vector stores (ChromaDB, FAISS), and clinical NLP workflows using ClinicalBERT for ICU readmission prediction.",
      "Mentored 9+ graduate project groups on production vector search, retrieval evaluation, and multi-agent LLM design patterns.",
    ],
  },
  {
    role: "Machine Learning Engineer",
    org: "SimPPL",
    location: "Remote",
    period: "Feb 2023 – Jun 2024",
    points: [
      "Built a scalable cross-platform data pipeline processing 80M+ comments and 500K+ videos from YouTube and Truth Social, using chunked Pandas processing and batched GPU inference under tight memory constraints.",
      "Engineered an automated LLM evaluation harness scoring LLaMA and Mistral 7B across 6 toxicity dimensions via the Google Perspective API, benchmarking behavior against human baselines from 460K+ messages.",
      "Developed a labeled taxonomy of 40 adversarial prompt patterns (jailbreak and persuasion techniques) to systematically stress-test open-source LLM safety and reproducibility.",
      "Conducted the research in collaboration with Prof. Deb Donig (UC Berkeley).",
    ],
  },
  {
    role: "Technology Intern",
    org: "Deutsche Bank",
    location: "Pune, India",
    period: "Jun 2023 – Jul 2023",
    points: [
      "Cut manual processing time by 96.7% by replacing a manual workflow with an automated CSV validation engine built on Spring Boot and Oracle DB.",
      "Built a Spring Boot PDF-generation microservice using iText, applying OOP design principles within an Agile delivery team.",
    ],
  },
];

export type Project = {
  title: string;
  blurb: string;
  description: string;
  stack: string[];
  href?: string;
  status?: string;
};

export const projects: Project[] = [
  {
    title: "Ecosystem Change Intelligence",
    blurb: "Multi-agent monitoring with traceable evidence.",
    description:
      "Five specialized agents orchestrated by a LangGraph supervisor monitor 10+ feeds and emit evidence backed action tickets. A DeltaRAG layer fuses dense vector search with a NetworkX knowledge graph via Reciprocal Rank Fusion, reaching 0.93 MRR and 88% P@1 on a 100 query benchmark.",
    stack: ["LangGraph", "LangChain", "ChromaDB", "pgvector", "Next.js"],
    href: "https://github.com/MokshitSurana/ECI-Pipeline",
  },
  {
    title: "FairGuard",
    blurb: "Investigative journalism agent for revolving door lobbying.",
    description:
      "Built for the Northwestern GAIN challenge, an agentic system of 9 composable skills analyzes 1M+ federal lobbying records to surface structural conflicts of interest. It pairs high accuracy entity resolution (F1 0.963) and §207 cooling off analysis with an interactive force directed conflict graph in a Next.js reporter UI.",
    stack: ["Python", "DuckDB", "Polars", "NetworkX", "D3.js", "Next.js"],
    href: "https://github.com/MokshitSurana/northwestern-challenge",
  },
  {
    title: "Keya · Real Estate AI Assistant",
    blurb: "Conversational property search built during my MS at UIC.",
    description:
      "A conversational platform for property search by zip code, market trends, and neighborhood insights, using hybrid LLM and regex intent extraction. Full stack build with a Next.js frontend and Flask backend, multilingual real time translation, and location aware responses over Zillow, SerpAPI, and GreatSchools data.",
    stack: ["Next.js", "Flask", "Azure OpenAI", "LangChain", "TypeScript"],
    href: "https://github.com/Archit1706/Keya-Agentic-AI-assistant-for-Real-Estate",
  },
  {
    title: "Neural Networks from Scratch",
    blurb: "Building the fundamentals by hand. No autograd, no shortcuts.",
    description:
      "Implementing the core deep learning building blocks from first principles: forward and backward passes, manual backpropagation, and optimizers, without relying on autograd frameworks. A deliberate exercise to internalize the math behind modern architectures. Repo coming soon.",
    stack: ["Python", "NumPy", "Backprop", "Optimizers"],
    status: "In progress",
  },
  {
    title: "UIC Labor Docs RAG Chatbot",
    blurb: "Hybrid vector and graph QA with a RAGAS eval harness.",
    description:
      "Retrieval augmented QA over UIC labor documents using a hybrid pipeline (Neo4j knowledge graph plus ChromaDB semantic search), with a RAGAS evaluation harness measuring faithfulness, answer relevance, and context precision. Shipped as a Streamlit web app.",
    stack: ["Python", "Streamlit", "Neo4j", "LangChain", "RAGAS"],
    href: "https://github.com/MokshitSurana/LaborDocs-MetaRAG",
  },
];

export type Publication = {
  title: string;
  venue: string;
  year: string;
  note?: string;
  url?: string;
};

export const publications: Publication[] = [
  {
    title:
      "Structural Robustness of Transformer Models for Clinical Text Summarization",
    venue: "EMNLP",
    year: "2026",
    note: "Under review · M.S. Thesis",
  },
  {
    title:
      "A Systematic Framework for Enterprise Knowledge Retrieval: Leveraging LLM-Generated Metadata to Enhance RAG Systems",
    venue: "IEEE Conference on Artificial Intelligence (IEEE CAI)",
    year: "2026",
    url: "https://arxiv.org/abs/2512.05411",
  },
  {
    title: "Multi-Agent Simulators for Social Networks",
    venue: "Multi-Agent Security Workshop, NeurIPS",
    year: "2023",
    url: "https://arxiv.org/abs/2311.14712",
  },
  {
    title: "Examining the Implications of Deepfakes for Election Integrity",
    venue: "AI for Credible Elections Workshop, AAAI",
    year: "2024",
    url: "https://arxiv.org/abs/2406.14290",
  },
  {
    title:
      "Leveraging CNNs and Ensemble Learning for Automated Disaster Image Classification",
    venue: "Springer ICSISCET",
    year: "2023",
    url: "https://arxiv.org/abs/2311.13531",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "Java", "SQL", "C++"] },
  {
    group: "ML / AI",
    items: ["PyTorch", "TensorFlow", "HuggingFace", "Scikit-Learn", "Pandas", "NumPy"],
  },
  {
    group: "LLM / Agents / RAG",
    items: ["LangChain", "LangGraph", "Graph-RAG", "Multi-Agent Systems", "RAGAS"],
  },
  {
    group: "Vector & Graph DBs",
    items: ["ChromaDB", "pgvector", "FAISS", "Qdrant", "Pinecone", "Neo4j", "NetworkX"],
  },
  {
    group: "Cloud & MLOps",
    items: ["GCP (Vertex AI, BigQuery)", "AWS (Lambda, EC2, S3)", "Docker", "Git"],
  },
  {
    group: "Backend & Frontend",
    items: ["FastAPI", "Spring Boot", "Next.js", "React", "REST APIs", "Streamlit"],
  },
];

export type Education = {
  school: string;
  detail: string;
  degree: string;
  period: string;
  score: string;
};

export const education: Education[] = [
  {
    school: "University of Illinois Chicago",
    detail: "",
    degree: "M.S. in Computer Science (Thesis)",
    period: "Aug 2024 – May 2026",
    score: "GPA 3.73 / 4",
  },
  {
    school: "University of Mumbai",
    detail: "Thadomal Shahani Engineering College",
    degree: "B.E. in Information Technology",
    period: "Aug 2020 – Jun 2024",
    score: "CGPA 9.43 / 10",
  },
];

export const awards = [
  "LeetCode Knight Badge, top 5% in contests",
  "1st place at TSEC Weekly Coding Challenges '23",
  "Won 5 hackathons",
  "Core Team Member, Google Developer Student Club",
  "Student Mentor",
];
