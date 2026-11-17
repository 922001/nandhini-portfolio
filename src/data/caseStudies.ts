// All case-study content lives here, the same way profile.ts holds the rest
// of the site's text. Facts come only from Nandhini's confirmed project notes.
// Never put client names here: this file is public on GitHub.

import type { Diagram } from './diagrams'
import { idpDiagram, multiAgentDiagram } from './diagrams'

export type Decision = {
  title: string // the choice that was made
  why: string // the reason for it
  tradeoff: string // what it cost, or the condition it depends on
}

export type Challenge = { title: string; body: string }

export type CaseStudy = {
  slug: string // used in the URL: /work/<slug>
  title: string
  kind: 'production' | 'independent' // production = client work, independent = personal project
  status: 'live' | 'in-progress' // in-progress = listed on the homepage, no page yet
  industry: string
  employer?: string // the ? means optional: independent projects have no employer
  tagline: string
  problem: string
  stack: string[]
  diagram?: Diagram // the interactive architecture (in-progress projects have none yet)
  decisions?: Decision[]
  challenges?: Challenge[]
  contributions?: { mine: string[]; others: string[] } // what I built vs what others owned
  results?: string[] // confirmed outcomes only; never invented numbers
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'enterprise-multi-agent-rag',
    title: 'Enterprise Multi-Agent RAG Assistant',
    kind: 'production',
    status: 'live',
    industry: 'Construction · enterprise knowledge',
    employer: 'zeb',
    tagline:
      'One conversational assistant over three enterprise systems, routed by a LangGraph supervisor to the right specialist agents.',
    problem:
      'Project status, labour costs and documents lived in three separate systems: a project-management platform, an ERP and a document repository. Getting a simple answer meant opening several applications or asking the technical team.',
    stack: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'Amazon Bedrock', 'Neo4j', 'MCP', 'Databricks', 'React'],
    diagram: multiAgentDiagram,
    decisions: [
      {
        title: 'A supervisor with one specialist agent per system',
        why: 'Each system has its own data and vocabulary, so a focused agent per system keeps tools and prompts small. A question that spans systems runs the agents in parallel, and their evidence is merged for the same project and period.',
        tradeoff: 'More orchestration and an extra model call for routing, so the supervisor should not call agents a question does not need.',
      },
      {
        title: 'Synced tables first, live APIs only when fresher data is needed',
        why: 'Synced Databricks tables are fast and governed for most questions. When a question needs data newer than the last sync, retrieval calls the source system’s live API instead.',
        tradeoff: 'Synced data can be up to about 12 hours old, so every answer carries its data timestamp, and live APIs bring rate limits and access scopes.',
      },
      {
        title: 'Documents through an MCP server, not copied into the platform',
        why: 'Documents stay in their repository. One reusable tool interface serves document Q&A, hybrid search and version comparison, and each tool checks the user’s access before returning anything.',
        tradeoff: 'The tools need their own authorization, network access and timeouts, and search depends on indexes being kept up to date.',
      },
      {
        title: 'Hybrid search plus graph expansion',
        why: 'Keyword search catches exact identifiers like RFI numbers, vector search catches meaning, and Neo4j follows links between drawings, RFIs, change orders and vendors that similarity search alone misses.',
        tradeoff: 'Keyword, vector and graph indexes all have to be kept in sync with the source documents.',
      },
      {
        title: 'Numbers come from SQL or Python, never from the model',
        why: 'Sums and counts over costs and hours must be exact, so they are computed in code and the model only explains them.',
        tradeoff: 'Each kind of numeric question needs a structured query behind it rather than free-form generation.',
      },
    ],
    challenges: [
      {
        title: 'Outdated answers that looked like hallucination',
        body: 'After go-live, users reported that some answers were out of date. Instead of assuming the model was making things up, I traced one answer step by step: what the source returned, what the API passed on, what retrieval picked and what the model wrote. The model was answering faithfully from what it received; the records themselves were stale. We worked with the document platform’s support team so current records were kept updated and old ones marked inactive. The lesson: debug the data and retrieval before blaming the model.',
      },
    ],
    contributions: {
      mine: [
        'Led the build from requirements to production, across the React app, Python CRUD APIs and the AI layer',
        'LangGraph supervisor and the specialist agents, with cited Claude Sonnet answers',
        'Reusable MCP server for document Q&A, hybrid search and version comparison, with user-level authorization, hosted on Bedrock AgentCore',
        'Retrieval combining keyword, vector (Titan embeddings) and Neo4j graph search',
        'Freshness-aware retrieval over synced tables with live-API fallback',
        'Structure-aware chunking that keeps tables and identifiers intact',
        'Voice input, a web search agent, and invoice extraction with Bedrock Data Automation',
      ],
      others: [
        'The data sync from the project-management system and ERP into Databricks, run by a data engineering team',
        'The source systems themselves and their APIs',
      ],
    },
    results: [
      'Went to production, giving users one place to ask about project status, costs and documents',
      'Answers carry citations and data timestamps, so users can check where each answer came from',
    ],
  },
  {
    slug: 'intelligent-document-processing',
    title: 'Intelligent Document Processing Platform',
    kind: 'production',
    status: 'live',
    industry: 'Healthcare · document automation',
    employer: 'Avasoft',
    tagline:
      'Referral documents in, validated structured data out, with a person reviewing only the fields the model is unsure about.',
    problem:
      'Healthcare referral documents arrived in many formats, and staff were reading each one and typing in the details by hand. That was slow and error-prone.',
    stack: ['Python', 'FastAPI', 'Textract', 'Amazon Bedrock', 'Titan Embeddings', 'pgvector', 'EventBridge', 'SQS', 'React'],
    diagram: idpDiagram,
    decisions: [
      {
        title: 'Event-driven processing through a queue',
        why: 'An EventBridge rule starts processing on every upload, and SQS sits between intake and the workers. Bursts are absorbed, failed messages are retried, and documents that keep failing land in a dead-letter queue instead of being lost.',
        tradeoff: 'More moving parts to deploy and watch, including keeping an eye on the dead-letter queue.',
      },
      {
        title: 'Textract first, Claude vision only as a fallback',
        why: 'Textract is cheaper and faster on clean documents. Only pages where its confidence is low go to the vision model.',
        tradeoff: 'Two reading paths to maintain, and a rule for deciding when Textract is not good enough.',
      },
      {
        title: 'Retrieval-based classification instead of asking the model directly',
        why: 'Comparing a document with real example documents grounds the decision in known types, and the similarity score gives a measurable signal: weak matches go to a person instead of being guessed.',
        tradeoff: 'Quality depends on the example set, and the threshold is a balance: higher means more human review but fewer wrong classifications.',
      },
      {
        title: 'Per-field confidence and review of only the uncertain fields',
        why: 'People check just the fields the model is unsure about, not the whole document.',
        tradeoff: 'Model confidence is a practical routing signal, not a calibrated probability, which is exactly why a person makes the final call on those fields.',
      },
      {
        title: 'Schema validation with retries',
        why: 'Every extraction is checked against the schema for its document type, and invalid JSON is retried before it moves on, so downstream systems only receive well-formed data.',
        tradeoff: 'Retries add time and model cost for the documents that need them.',
      },
    ],
    challenges: [
      {
        title: 'Documents classified as the wrong type',
        body: 'A wrong type means the wrong extraction prompt and wrong fields. I improved it in three ways: more and better example documents, a similarity threshold that sends weak matches to review, and Claude double-checking the top matches instead of simply taking the nearest one.',
      },
      {
        title: 'Slow processing as volume grew',
        body: 'Because SQS separates intake from processing, the fix was to add more workers so documents were processed in parallel.',
      },
    ],
    contributions: {
      mine: [
        'Primary developer of the Python / FastAPI AI pipeline',
        'EventBridge trigger, SQS workers with retries and a dead-letter queue',
        'Textract OCR with the Claude vision fallback on Bedrock',
        'Retrieval-based classification with Titan embeddings and pgvector',
        'Claude extraction prompts per document type, returning JSON with per-field confidence, plus schema validation and retries',
        'React screens, including the human review screen',
        'JSON output to Salesforce and other systems through APIs',
        'Deployment, MLflow and manual evaluation, and regression testing before releases',
      ],
      others: [
        'AWS infrastructure, set up by the cloud team',
        'Go CRUD APIs, built together with the team',
        'Document intake channels and the rest of the wider product',
      ],
    },
    results: [
      'In production, processing about 20,000 documents a month',
      'Used by about 100 people a day',
      'Staff review only low-confidence fields instead of keying in every document by hand',
    ],
  },
  {
    slug: 'ai-incident-investigator',
    title: 'AI Incident Investigator',
    kind: 'independent',
    status: 'in-progress',
    industry: 'Agentic AI · incident response',
    tagline:
      'An agent that investigates simulated application incidents from logs and system data, proposes root causes and fixes, and asks a person before acting.',
    problem: '',
    stack: ['Python', 'LangGraph', 'FastAPI', 'React'],
  },
]

// Look up one case study by its URL slug (returns undefined if there is none).
export const findCaseStudy = (slug: string | undefined) => caseStudies.find((c) => c.slug === slug)

// The live case studies, in order, for "next project" links.
export const liveCaseStudies = caseStudies.filter((c) => c.status === 'live')
