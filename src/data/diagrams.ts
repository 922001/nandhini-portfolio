// Architecture diagrams for the case studies.
// Each box (node) has a position on a 1000-unit-wide canvas, a label, who
// owned it, and a short note shown when it is clicked. Arrows (edges) connect
// boxes by id. Facts come only from Nandhini's confirmed project notes.

export type Owner = 'me' | 'team' | 'external'

export type DiagramNode = {
  id: string
  label: string
  sub?: string // small second line under the label
  x: number
  y: number
  w: number
  owner: Owner // me = I built it, team = another team owned it, external = a source system
  note: string
}

export type DiagramEdge = { from: string; to: string }

export type Diagram = {
  height: number // canvas height (width is always 1000)
  nodes: DiagramNode[]
  edges: DiagramEdge[]
}

export const NODE_HEIGHT = 58

// ── Project 1 · Enterprise Multi-Agent RAG Assistant ──────────────────────
export const multiAgentDiagram: Diagram = {
  height: 760,
  nodes: [
    { id: 'ui', label: 'React chat UI', sub: 'question · project · answer with sources', x: 330, y: 0, w: 340, owner: 'me',
      note: 'The user picks a project and asks in plain language. The UI sends the question with the project context and shows the answer with its sources and data timestamps.' },
    { id: 'voice', label: 'Voice input', sub: 'speech → text', x: 760, y: 0, w: 240, owner: 'me',
      note: 'Users can speak the question instead of typing it. The recording is transcribed to text before it reaches the API. Replies are text.' },
    { id: 'api', label: 'FastAPI', sub: 'auth · project access · query understanding', x: 300, y: 110, w: 400, owner: 'me',
      note: 'Checks who the user is and which projects they can see, then works out the project, intent and time period of the question before handing it to the supervisor.' },
    { id: 'sup', label: 'LangGraph supervisor', sub: 'conditional routing · parallel agents', x: 300, y: 220, w: 400, owner: 'me',
      note: 'Decides which specialist agent should answer. A question that spans systems (progress and labour cost, say) goes to more than one agent in parallel, and their evidence is merged for the same project and period.' },
    { id: 'pm', label: 'Project agent', sub: 'status · RFIs · schedules', x: 0, y: 340, w: 230, owner: 'me',
      note: 'Answers construction-operations questions from the project-management system: project status, drawings, RFIs, site issues and schedules.' },
    { id: 'erp', label: 'ERP agent', sub: 'labour · invoices · budgets', x: 255, y: 340, w: 230, owner: 'me',
      note: 'Answers finance and operations questions from the ERP: labour hours and costs, invoices, vendors and budgets.' },
    { id: 'docs', label: 'Documents agent', sub: 'MCP client', x: 510, y: 340, w: 230, owner: 'me',
      note: 'Answers document questions. It calls tools on the MCP server instead of reaching into the repository directly, so the documents stay where they are.' },
    { id: 'web', label: 'Web search agent', sub: 'public information', x: 765, y: 340, w: 235, owner: 'me',
      note: 'Handles questions that need public information from the web rather than company data.' },
    { id: 'fresh', label: 'Freshness check', sub: 'synced data or live API?', x: 60, y: 455, w: 365, owner: 'me',
      note: 'Synced data is up to about 12 hours old. If the question needs data newer than the last successful sync, retrieval calls the live system API instead of the synced tables.' },
    { id: 'mcp', label: 'MCP server', sub: 'hosted on Bedrock AgentCore', x: 510, y: 455, w: 230, owner: 'me',
      note: 'A reusable Model Context Protocol server with tools for document Q&A, hybrid search and version comparison. Every tool checks the user’s access before returning anything.' },
    { id: 'delta', label: 'Synced tables', sub: 'Databricks SQL · ~12 h sync', x: 0, y: 570, w: 230, owner: 'team',
      note: 'A data engineering team syncs the project-management and ERP data into governed Databricks tables about every 12 hours. I queried them with Databricks SQL; the sync pipeline itself was theirs.' },
    { id: 'live', label: 'Live system APIs', sub: 'source systems', x: 255, y: 570, w: 230, owner: 'external',
      note: 'The source systems’ own APIs, used only when the question needs data fresher than the last sync.' },
    { id: 'search', label: 'Hybrid + graph retrieval', sub: 'keyword · vector · Neo4j', x: 510, y: 570, w: 230, owner: 'me',
      note: 'Keyword and vector search find relevant passages; Neo4j then follows relationships (a drawing to its RFIs, change orders and vendors) to pull in linked records that similarity search alone would miss.' },
    { id: 'index', label: 'Document indexing', sub: 'chunking · Titan embeddings', x: 765, y: 570, w: 235, owner: 'me',
      note: 'Documents are chunked by their structure, keeping sections, identifiers and HTML tables together so an RFI number never gets split from its context, then embedded with Titan for vector search.' },
    { id: 'answer', label: 'Grounded answer', sub: 'merge · dedup · rerank · Claude with citations', x: 230, y: 690, w: 540, owner: 'me',
      note: 'Evidence from every agent is merged, deduplicated and reranked, then Claude answers only from that evidence, with citations. Sums and counts come from SQL or Python, never from the model. If the evidence is not enough, it says so.' },
  ],
  edges: [
    { from: 'voice', to: 'ui' },
    { from: 'ui', to: 'api' },
    { from: 'api', to: 'sup' },
    { from: 'sup', to: 'pm' },
    { from: 'sup', to: 'erp' },
    { from: 'sup', to: 'docs' },
    { from: 'sup', to: 'web' },
    { from: 'pm', to: 'fresh' },
    { from: 'erp', to: 'fresh' },
    { from: 'docs', to: 'mcp' },
    { from: 'fresh', to: 'delta' },
    { from: 'fresh', to: 'live' },
    { from: 'mcp', to: 'search' },
    { from: 'index', to: 'search' },
    { from: 'delta', to: 'answer' },
    { from: 'live', to: 'answer' },
    { from: 'search', to: 'answer' },
  ],
}

// ── Project 2 · Intelligent Document Processing Platform ──────────────────
export const idpDiagram: Diagram = {
  height: 760,
  nodes: [
    { id: 'upload', label: 'Document upload', sub: 'S3 · cloud infrastructure', x: 0, y: 0, w: 220, owner: 'team',
      note: 'Referral documents land in S3. The cloud team set up the AWS infrastructure; I deployed the services onto it.' },
    { id: 'eb', label: 'EventBridge rule', sub: 'fires on each new upload', x: 260, y: 0, w: 220, owner: 'me',
      note: 'Each new document triggers an event, so processing starts on its own. Nothing polls for new files.' },
    { id: 'sqs', label: 'SQS queue', sub: 'buffer · retries', x: 520, y: 0, w: 220, owner: 'me',
      note: 'The queue absorbs bursts of uploads so workers process at their own pace. A message that fails is delivered again and retried.' },
    { id: 'dlq', label: 'Dead-letter queue', sub: 'after max retries', x: 780, y: 0, w: 220, owner: 'me',
      note: 'A document that keeps failing moves to the DLQ instead of blocking the queue or being lost, so it can be inspected and reprocessed.' },
    { id: 'worker', label: 'Python worker', sub: 'one message at a time', x: 330, y: 120, w: 340, owner: 'me',
      note: 'Picks up a message from the queue and runs the document through every step below.' },
    { id: 'ocr', label: 'Textract OCR', sub: 'text · tables · layout', x: 160, y: 240, w: 300, owner: 'me',
      note: 'Textract reads the text, tables and layout first. It is cheaper and faster on clean documents, so the vision model is kept for the pages Textract struggles with.' },
    { id: 'vision', label: 'Claude vision fallback', sub: 'when Textract confidence is low', x: 540, y: 240, w: 300, owner: 'me',
      note: 'When Textract is not confident about what it read, the page image goes to Claude’s vision model on Bedrock instead.' },
    { id: 'classify', label: 'Classification', sub: 'Titan embeddings · pgvector · Claude decides', x: 250, y: 360, w: 500, owner: 'me',
      note: 'The document is embedded with Titan, pgvector returns the closest known example documents, and Claude picks the type from those matches. If the similarity is below a threshold, the document goes to a person instead of being guessed.' },
    { id: 'extract', label: 'Claude extraction', sub: 'JSON per document type · per-field confidence', x: 250, y: 470, w: 500, owner: 'me',
      note: 'A prompt written for that document type asks Claude for structured JSON, with a confidence for every field.' },
    { id: 'validate', label: 'Schema validation', sub: 'retry when the JSON is invalid', x: 250, y: 580, w: 500, owner: 'me',
      note: 'The JSON is checked against the schema for that document type. If it is invalid, extraction is retried before the result moves on.' },
    { id: 'store', label: 'Structured output', sub: 'JSON · Salesforce and APIs', x: 80, y: 700, w: 340, owner: 'me',
      note: 'Confident and reviewed fields are sent on as JSON to Salesforce and other systems through APIs.' },
    { id: 'review', label: 'Review screen', sub: 'React · human-in-the-loop', x: 580, y: 700, w: 340, owner: 'me',
      note: 'Low-confidence fields go to a person, who checks and corrects them on a React screen. Only the uncertain fields need review, not the whole document.' },
  ],
  edges: [
    { from: 'upload', to: 'eb' },
    { from: 'eb', to: 'sqs' },
    { from: 'sqs', to: 'dlq' },
    { from: 'sqs', to: 'worker' },
    { from: 'worker', to: 'ocr' },
    { from: 'ocr', to: 'vision' },
    { from: 'ocr', to: 'classify' },
    { from: 'vision', to: 'classify' },
    { from: 'classify', to: 'extract' },
    { from: 'extract', to: 'validate' },
    { from: 'validate', to: 'store' },
    { from: 'validate', to: 'review' },
    { from: 'review', to: 'store' },
  ],
}
