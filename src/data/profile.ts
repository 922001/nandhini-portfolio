// All site text lives here. Facts come only from Nandhini's master resume
// and her confirmed skills list. Edit this file to update the site.

// Client names are never stored here: this file is public on GitHub and in the
// site bundle. Use industry labels only (same rule as her LinkedIn).

export const profile = {
  name: 'Nandhini S',
  title: 'Full-Stack AI Engineer',
  location: 'Chennai, India · open to remote',
  availability: 'Open to AI Engineer roles · immediate joiner',
  // Hero headline: `accent` is set in violet italic after `lead`.
  headline: {
    lead: 'I build AI systems end to end, from the React screen to the',
    accent: 'agent that answers.',
  },
  intro:
    'Three years building production software: React and TypeScript front ends, Python / FastAPI on PostgreSQL, and underneath them multi-agent systems, RAG pipelines and document AI with LangGraph and Claude on Amazon Bedrock.',
  email: 'nandhinisubramanis9@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nandhini-subramani09',
  github: 'https://github.com/922001', // link is hidden if this is empty
  resume: '/Nandhini_S_Resume.pdf',
}

export const stats = [
  { value: '3+', label: 'years building production software' },
  { value: '~20K', label: 'documents a month through IDP pipelines I built' },
  { value: '~300', label: 'internal users in an agentic platform beta' },
  { value: '7', label: 'client and internal projects delivered' },
]

export const about = {
  paragraphs: [
    'I started as a full-stack developer, building React and TypeScript applications with Node.js, Golang and PostgreSQL back ends — booking modules, a Salesforce-to-PostgreSQL sync, and an Azure application with Microsoft Entra ID sign-in and embedded Power BI reports.',
    'Then I built my first AI product on my own: a RAG document Q&A chatbot with chunking, Titan embeddings, pgvector search, cited Claude answers on Amazon Bedrock, web search and voice input. From there I moved into intelligent document processing for healthcare referrals, and then into multi-agent systems.',
    'Today my work sits where both worlds meet. I design the LangGraph supervisor and the specialist agents, build the retrieval and the MCP tools, and I also ship the React app and the APIs around them — from the first client call to production.',
  ],
  focus: [
    'Multi-agent orchestration with LangGraph',
    'RAG and hybrid retrieval with citations',
    'Intelligent document processing (IDP)',
    'Full-stack delivery: React, FastAPI, PostgreSQL',
  ],
  education: 'MCA, B.S. Abdur Rahman Crescent Institute of Science and Technology — CGPA 9.73',
}

export type Role = {
  company: string
  title: string
  period: string
  place: string
  projects: { name: string; client: string; stack: string[]; points: string[] }[]
}

export const experience: Role[] = [
  {
    company: 'zeb',
    title: 'AI Engineer',
    period: 'Feb 2026 – Aug 2026',
    place: 'Chennai',
    projects: [
      {
        name: 'Multi-Agent AI Assistant',
        client: 'a construction company',
        stack: ['LangGraph', 'MCP', 'Neo4j', 'Amazon Bedrock', 'React'],
        points: [
          'Led and built a full-stack multi-agent assistant across three enterprise systems, from requirements to production: the React app, Python CRUD APIs and a LangGraph supervisor routing questions to specialist agents, with cited Claude Sonnet answers.',
          'Built a reusable Model Context Protocol (MCP) server for document Q&A, hybrid search and version comparison, with user-level authorization, hosted on Amazon Bedrock AgentCore.',
          'Implemented retrieval combining keyword, vector (Titan embeddings) and Neo4j graph search, plus invoice extraction with Bedrock Data Automation.',
        ],
      },
      {
        name: 'AI Invoice Processing (IDP)',
        client: 'an e-commerce company',
        stack: ['Python', 'FastAPI', 'Amazon Bedrock', 'SQS', 'PostgreSQL'],
        points: [
          'Led the solution end to end: requirements, architecture, the FastAPI backend, the AI pipeline, API integration with the client system and code review for 1–2 developers.',
          'Designed a multi-model pipeline: Bedrock Data Automation reads the invoice, Claude Haiku identifies the retailer and Claude Sonnet extracts JSON with retailer-specific schemas, processed asynchronously by SQS workers.',
        ],
      },
      {
        name: 'Agentic Software-Development Platform',
        client: 'internal platform',
        stack: ['LangGraph', 'LangChain', 'Claude', 'Azure DevOps'],
        points: [
          'Implemented the core of a four-stage agentic workflow (supervisor, designer, developer, evaluator) turning sprint stories into scaffolded repos, initial code and AI code review.',
          'Co-built Human-in-the-Loop checkpoints with LangGraph checkpointing after a beta with ~300 internal users; led the Python workstream of 3 developers.',
        ],
      },
    ],
  },
  {
    company: 'Avasoft',
    title: 'AI Full Stack Developer',
    period: 'Jul 2023 – Feb 2026',
    place: 'Chennai',
    projects: [
      {
        name: 'Intelligent Document Processing Platform',
        client: 'a healthcare services company',
        stack: ['FastAPI', 'Textract', 'Amazon Bedrock', 'pgvector', 'SQS'],
        points: [
          'Primary developer of the Python / FastAPI pipeline for healthcare referral documents: Textract OCR with a Claude vision fallback, processed asynchronously by SQS workers.',
          'Implemented retrieval-based classification (Titan embeddings, pgvector) and Claude extraction to JSON with per-field confidence; built the React Human-in-the-Loop review screen.',
        ],
      },
      {
        name: 'Voice-Enabled RAG Assistant',
        client: 'a research organisation',
        stack: ['React', 'FastAPI', 'pgvector', 'Amazon Bedrock', 'Transcribe'],
        points: [
          'Built end to end as sole developer: React frontend, FastAPI APIs, chunking, Titan embeddings, pgvector search and Claude with citations, plus web search and voice input.',
        ],
      },
      {
        name: 'Full-Stack Applications',
        client: 'two enterprise clients',
        stack: ['React', 'TypeScript', 'Node.js', 'Golang', 'Azure', 'AWS ECS'],
        points: [
          'Sole full-stack developer of a React, Golang and MySQL application on Azure App Service with Microsoft Entra ID sign-in and embedded Power BI reports.',
          'Built three modules of a booking platform in React, TypeScript and Node.js / Express (BFF) on PostgreSQL with Salesforce SOQL; jointly built a Salesforce-to-PostgreSQL sync job on AWS ECS.',
        ],
      },
    ],
  },
]

// Projects and case studies now live in caseStudies.ts.

export const skills = [
  {
    group: 'Agentic AI',
    usedIn: 'Multi-agent assistant (supervisor, MCP server on AgentCore) · agentic dev platform (HITL checkpoints)',
    items: ['LangGraph', 'LangChain', 'Multi-agent systems', 'Supervisor routing', 'Tool calling', 'MCP', 'Human-in-the-Loop', 'Bedrock AgentCore'],
  },
  {
    group: 'Generative AI',
    usedIn: 'Healthcare IDP (OCR, vision fallback, extraction) · voice RAG assistant · invoice IDP',
    items: ['RAG', 'GraphRAG', 'Embeddings', 'Semantic search', 'Prompt engineering', 'IDP', 'OCR', 'Vision LLMs'],
  },
  {
    group: 'Backend',
    usedIn: 'FastAPI for both IDP pipelines and voice RAG · Node.js BFF for the booking platform · Golang on Azure',
    items: ['Python', 'FastAPI', 'Pydantic', 'SQLAlchemy', 'Node.js', 'Express', 'Golang', 'REST APIs', 'JWT'],
  },
  {
    group: 'Frontend',
    usedIn: 'Multi-agent assistant app · HITL review screen · voice RAG UI · booking platform · Power BI on Azure',
    items: ['React', 'TypeScript', 'JavaScript', 'Power BI Embedded'],
  },
  {
    group: 'Cloud & DevOps',
    usedIn: 'Bedrock across every AI project · SQS workers for both IDP pipelines · ECS sync job · Azure App Service',
    items: ['Amazon Bedrock', 'Bedrock Data Automation', 'Textract', 'Transcribe', 'Lambda', 'SQS', 'S3', 'ECS', 'Azure App Service', 'Azure DevOps', 'Docker', 'CI/CD'],
  },
  {
    group: 'Databases',
    usedIn: 'pgvector for healthcare IDP and voice RAG · Neo4j graph search · PostgreSQL + Salesforce SOQL for booking',
    items: ['PostgreSQL', 'pgvector', 'MySQL', 'Neo4j', 'Redis', 'Salesforce SOQL'],
  },
]

// Page order. Section numbers (01, 02…) and nav links are both generated from
// this list, so reordering here renumbers the whole site.
export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'demo', label: 'Live demo' },
  { id: 'contact', label: 'Contact' },
]
