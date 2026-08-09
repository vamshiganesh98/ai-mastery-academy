import type { Lesson } from './types'

export const week2Lessons: Lesson[] = [
  {
    day: 8,
    title: 'RAG — Give Your AI a Brain',
    subtitle: 'Retrieval-Augmented Generation Explained',
    week: 2,
    weekTitle: 'Building with LLMs',
    duration: '60 min',
    difficulty: 'Intermediate',
    isProject: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
    videoId: 'T-D1OfcDW1M',
    videoTitle: 'RAG Explained — Retrieval Augmented Generation',
    description: 'LLMs hallucinate because they only know what was in their training data. RAG fixes this by retrieving relevant documents and feeding them as context. This is the #1 technique in production AI apps.',
    objectives: [
      'Understand why LLMs hallucinate and how RAG solves it',
      'Learn the RAG pipeline: ingest → chunk → embed → store → retrieve → generate',
      'Know chunking strategies and their tradeoffs',
      'Implement a basic RAG system from scratch',
      'Evaluate RAG quality systematically',
    ],
    keyConcepts: [
      {
        title: 'The Hallucination Problem',
        description: 'LLMs generate plausible-sounding but factually wrong answers. They predict text, not truth. RAG grounds responses in real documents.',
        analogy: 'Like an open-book exam vs a closed-book exam. RAG lets the AI "look up" answers instead of guessing.',
      },
      {
        title: 'The RAG Pipeline',
        description: '1) Ingest documents 2) Split into chunks 3) Create embeddings 4) Store in vector DB 5) On query: embed question, find similar chunks 6) Feed chunks + question to LLM 7) Generate grounded answer.',
      },
      {
        title: 'Chunking Strategies',
        description: 'Split documents into pieces (256-1024 tokens). Too small = lost context. Too large = irrelevant info dilutes retrieval. Overlap chunks by 10-20% to avoid cutting sentences.',
      },
      {
        title: 'Retrieval Quality',
        description: 'RAG is only as good as retrieval. If wrong chunks are retrieved, the LLM will confidently give wrong answers. Always evaluate retrieval separately from generation.',
      },
    ],
    deepDive: `**RAG architecture diagram:**

\`\`\`
Documents → Chunker → Embedder → Vector DB
                                      ↓
User Query → Embedder → Similarity Search → Top-K Chunks
                                      ↓
                    LLM (chunks + query) → Answer
\`\`\`

**When to use RAG vs fine-tuning:**
- RAG: Dynamic knowledge, frequently updated data, need citations
- Fine-tuning: Style/format changes, domain-specific language, consistent behavior
- Both: Best results for specialized applications

**Advanced RAG techniques (you'll learn later):**
- Hybrid search (keyword + semantic)
- Re-ranking retrieved chunks
- Query transformation / HyDE
- Parent-document retrieval
- Agentic RAG (multi-step retrieval)`,
    codeExamples: [
      {
        title: 'Minimal RAG Pipeline',
        language: 'python',
        code: `from openai import OpenAI

client = OpenAI()

documents = [
    "Python was created by Guido van Rossum in 1991.",
    "JavaScript was created by Brendan Eich in 1995.",
    "Rust was created by Graydon Hoare at Mozilla.",
]

# Step 1: Embed all documents
doc_embeddings = []
for doc in documents:
    emb = client.embeddings.create(
        model="text-embedding-3-small", input=doc
    ).data[0].embedding
    doc_embeddings.append(emb)

# Step 2: Query
query = "Who created Python?"
query_emb = client.embeddings.create(
    model="text-embedding-3-small", input=query
).data[0].embedding

# Step 3: Find most similar (cosine similarity)
import numpy as np
similarities = [np.dot(query_emb, d) for d in doc_embeddings]
best_idx = np.argmax(similarities)
context = documents[best_idx]

# Step 4: Generate with context
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{
        "role": "user",
        "content": f"Context: {context}\\n\\nQuestion: {query}"
    }]
)
print(response.choices[0].message.content)`,
        explanation: 'This is RAG in its simplest form. Production systems use vector databases and more sophisticated retrieval.',
      },
    ],
    quiz: [
      {
        question: 'What problem does RAG primarily solve?',
        options: [
          'Slow API response times',
          'LLM hallucination and outdated knowledge',
          'High API costs',
          'Model size limitations',
        ],
        correctIndex: 1,
        explanation: 'RAG grounds LLM responses in retrieved documents, reducing hallucination and enabling up-to-date information.',
      },
      {
        question: 'What is a good chunk size for RAG?',
        options: ['1-5 tokens', '256-1024 tokens', '10000+ tokens', 'Chunk size doesn\'t matter'],
        correctIndex: 1,
        explanation: '256-1024 tokens balances context preservation with retrieval precision.',
      },
    ],
    resources: [
      { title: 'LangChain RAG Tutorial', url: 'https://python.langchain.com/docs/tutorials/rag/', type: 'docs' },
      { title: 'Pinecone RAG Guide', url: 'https://www.pinecone.io/learn/retrieval-augmented-generation/', type: 'article' },
    ],
    proTips: [
      'Always evaluate retrieval quality separately — bad retrieval = bad answers, no matter how good your LLM is.',
      'Start with simple RAG before adding complexity.',
      'Include source citations in your prompt so users can verify answers.',
    ],
    commonMistakes: [
      'Chunks too large — retrieval returns irrelevant content.',
      'Not testing with questions that aren\'t in your documents.',
      'Assuming RAG eliminates all hallucinations — it reduces them significantly but doesn\'t eliminate them.',
    ],
  },
  {
    day: 9,
    title: 'Vector Databases',
    subtitle: 'Pinecone, Chroma, pgvector & More',
    week: 2,
    weekTitle: 'Building with LLMs',
    duration: '50 min',
    difficulty: 'Intermediate',
    isProject: false,
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=600&fit=crop',
    videoId: 'kl6K1R3G7mM',
    videoTitle: 'Vector Databases Explained',
    description: 'Embeddings need a home. Vector databases are purpose-built to store and search millions of embeddings at lightning speed. Today you\'ll compare the top options and build with ChromaDB.',
    objectives: [
      'Understand what vector databases do and why they\'re needed',
      'Compare Pinecone, Chroma, Weaviate, Qdrant, and pgvector',
      'Implement CRUD operations with a vector database',
      'Understand indexing algorithms (HNSW, IVF)',
      'Choose the right vector DB for your use case',
    ],
    keyConcepts: [
      {
        title: 'Why Not Regular Databases?',
        description: 'SQL databases search exact matches. Vector DBs search by similarity — "find documents most similar to this query." At scale (millions of vectors), specialized indexing is essential.',
      },
      {
        title: 'HNSW Index',
        description: 'Hierarchical Navigable Small World — the most popular approximate nearest neighbor algorithm. Trades perfect accuracy for 100x speed. Default in most vector DBs.',
      },
      {
        title: 'Metadata Filtering',
        description: 'Combine vector search with traditional filters: "find similar docs WHERE category=\'legal\' AND date > 2024". Essential for production RAG.',
      },
    ],
    deepDive: `**Vector DB comparison:**

| Database | Type | Best For | Pricing |
|----------|------|----------|---------|
| Chroma | Embedded/Server | Prototyping, local dev | Free |
| Pinecone | Managed Cloud | Production, scale | Free tier + paid |
| Weaviate | Self-hosted/Cloud | Hybrid search | Open source |
| Qdrant | Self-hosted/Cloud | Performance, filtering | Open source |
| pgvector | PostgreSQL extension | Existing Postgres users | Free |

**Recommendation for learning:** Start with Chroma (zero setup). Move to Pinecone or pgvector for production.`,
    codeExamples: [
      {
        title: 'ChromaDB Quick Start',
        language: 'python',
        code: `import chromadb

client = chromadb.Client()
collection = client.create_collection("my_docs")

collection.add(
    documents=[
        "Python is great for AI",
        "JavaScript powers the web",
        "Rust is fast and safe",
    ],
    ids=["doc1", "doc2", "doc3"],
    metadatas=[
        {"lang": "python"},
        {"lang": "javascript"},
        {"lang": "rust"},
    ]
)

results = collection.query(
    query_texts=["Which language is best for machine learning?"],
    n_results=1,
)
print(results["documents"])`,
        explanation: 'Chroma handles embedding automatically. Three lines to store, one line to search.',
      },
    ],
    quiz: [
      {
        question: 'What makes vector databases different from SQL databases?',
        options: [
          'They store more data',
          'They search by semantic similarity, not exact matches',
          'They are faster at everything',
          'They don\'t need indexes',
        ],
        correctIndex: 1,
        explanation: 'Vector DBs find the nearest neighbors in high-dimensional space — semantic similarity search.',
      },
    ],
    resources: [
      { title: 'ChromaDB Docs', url: 'https://docs.trychroma.com/', type: 'docs' },
      { title: 'Pinecone Docs', url: 'https://docs.pinecone.io/', type: 'docs' },
    ],
    proTips: [
      'Chroma for dev, Pinecone/pgvector for production.',
      'Always add metadata — you\'ll need filtering later.',
      'Benchmark retrieval quality before choosing a database.',
    ],
    commonMistakes: [
      'Over-engineering with a managed service for a prototype.',
      'Not considering metadata filtering needs upfront.',
    ],
  },
  {
    day: 10,
    title: 'Function Calling & Tools',
    subtitle: 'How Agents Use the Real World',
    week: 2,
    weekTitle: 'Building with LLMs',
    duration: '55 min',
    difficulty: 'Intermediate',
    isProject: false,
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&h=600&fit=crop',
    videoId: 'yMOmmnjy3sE',
    videoTitle: 'Function Calling with OpenAI API',
    description: 'The leap from chatbot to agent: giving LLMs the ability to call functions, search the web, run code, and interact with APIs. Function calling is the bridge between language and action.',
    objectives: [
      'Understand how function/tool calling works under the hood',
      'Define tools with JSON schemas for LLMs',
      'Implement a function calling loop (call → execute → respond)',
      'Build tools for web search, calculations, and API calls',
      'Know the difference between function calling and agents',
    ],
    keyConcepts: [
      {
        title: 'Tool Definitions',
        description: 'You describe functions as JSON schemas: name, description, parameters. The LLM decides WHEN to call them and WITH what arguments. You execute the function and return results.',
        analogy: 'Like giving a remote control to the AI. You define the buttons (functions), the AI decides which to press.',
      },
      {
        title: 'The Tool Loop',
        description: '1) User asks question 2) LLM decides to use a tool 3) Returns tool_call with arguments 4) You execute the function 5) Return result to LLM 6) LLM generates final answer. May repeat multiple times.',
      },
      {
        title: 'Parallel Tool Calls',
        description: 'Modern models can call multiple tools simultaneously. "What\'s the weather in NYC and the stock price of AAPL?" → two parallel tool calls.',
      },
    ],
    deepDive: `**Function calling is NOT magic.** The LLM doesn't execute code — it outputs structured JSON saying "I want to call function X with arguments Y." Your code executes it and feeds the result back.

**This is the foundation of ALL agents:**
- ChatGPT's web browsing? Function calling.
- Code interpreter? Function calling.
- Every MCP tool? Function calling pattern.

**Tool design principles:**
1. Clear, descriptive function names and descriptions
2. Detailed parameter descriptions (the LLM reads these!)
3. Return structured, parseable results
4. Handle errors gracefully — return error messages as tool results`,
    codeExamples: [
      {
        title: 'Weather Tool Example',
        language: 'python',
        code: `import json
from openai import OpenAI

client = OpenAI()

tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get current weather for a city",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "City name"},
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
            },
            "required": ["city"],
        },
    },
}]

def get_weather(city, unit="celsius"):
    return json.dumps({"city": city, "temp": 22, "unit": unit, "condition": "sunny"})

messages = [{"role": "user", "content": "What's the weather in Tokyo?"}]

response = client.chat.completions.create(
    model="gpt-4o-mini", messages=messages, tools=tools
)

tool_call = response.choices[0].message.tool_calls[0]
args = json.loads(tool_call.function.arguments)
result = get_weather(**args)

messages.append(response.choices[0].message)
messages.append({
    "role": "tool",
    "tool_call_id": tool_call.id,
    "content": result,
})

final = client.chat.completions.create(
    model="gpt-4o-mini", messages=messages, tools=tools
)
print(final.choices[0].message.content)`,
        explanation: 'The two-step pattern: LLM requests tool → you execute → LLM responds with result.',
      },
    ],
    quiz: [
      {
        question: 'Who executes the function when an LLM makes a tool call?',
        options: ['The LLM itself', 'Your application code', 'The API provider', 'The vector database'],
        correctIndex: 1,
        explanation: 'The LLM only decides WHICH function to call and with what arguments. Your code executes it.',
      },
    ],
    resources: [
      { title: 'OpenAI Function Calling', url: 'https://platform.openai.com/docs/guides/function-calling', type: 'docs' },
    ],
    proTips: [
      'Write tool descriptions as if explaining to a new employee — be very explicit.',
      'Always validate tool arguments before executing.',
      'Log every tool call for debugging.',
    ],
    commonMistakes: [
      'Vague tool descriptions leading to wrong function selection.',
      'Not handling the case where the LLM doesn\'t call any tool.',
      'Forgetting to append tool results back to the messages array.',
    ],
  },
  {
    day: 11,
    title: 'Structured Outputs',
    subtitle: 'JSON Mode, Pydantic & Reliable Parsing',
    week: 2,
    weekTitle: 'Building with LLMs',
    duration: '45 min',
    difficulty: 'Intermediate',
    isProject: false,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
    videoId: 'ewtQY_RJrzs',
    videoTitle: 'Structured Outputs with OpenAI',
    description: 'Free-form text is great for chat, but applications need structured data. Today you\'ll master JSON mode, Pydantic schemas, and techniques to get reliable, parseable outputs every time.',
    objectives: [
      'Use JSON mode and structured outputs APIs',
      'Define Pydantic models for LLM responses',
      'Handle parsing failures gracefully',
      'Extract structured data from unstructured text',
      'Build type-safe AI pipelines',
    ],
    keyConcepts: [
      {
        title: 'JSON Mode',
        description: 'Forces the LLM to output valid JSON. Set response_format={"type": "json_object"}. Still need to describe the schema in your prompt.',
      },
      {
        title: 'Structured Outputs',
        description: 'Newer API feature: provide a JSON Schema and the model GUARANTEES output matches it. No more parsing failures.',
      },
      {
        title: 'Pydantic Integration',
        description: 'Define Python classes, convert to JSON Schema, parse responses back to typed objects. Type safety for AI outputs.',
      },
    ],
    deepDive: `**When you need structured outputs:**
- Extracting entities from text (names, dates, amounts)
- Classification (sentiment, category, priority)
- Generating API-compatible data
- Multi-step pipelines where step N+1 needs step N's output

**Reliability hierarchy (best to worst):**
1. Structured Outputs API with JSON Schema (guaranteed)
2. JSON mode + Pydantic validation + retry
3. Prompt asking for JSON + regex parsing
4. Free-form text + hope for the best`,
    codeExamples: [
      {
        title: 'Structured Output with Pydantic',
        language: 'python',
        code: `from pydantic import BaseModel
from openai import OpenAI

class SentimentAnalysis(BaseModel):
    sentiment: str  # positive, negative, neutral
    confidence: float
    key_phrases: list[str]

client = OpenAI()

response = client.beta.chat.completions.parse(
    model="gpt-4o-mini",
    messages=[{
        "role": "user",
        "content": "Analyze: 'This product exceeded my expectations!'"
    }],
    response_format=SentimentAnalysis,
)

result = response.choices[0].message.parsed
print(f"Sentiment: {result.sentiment}")
print(f"Confidence: {result.confidence}")
print(f"Key phrases: {result.key_phrases}")`,
        explanation: 'Pydantic + structured outputs = type-safe AI pipelines. No manual JSON parsing needed.',
      },
    ],
    quiz: [
      {
        question: 'What advantage does Structured Outputs have over JSON mode?',
        options: [
          'It\'s faster',
          'It guarantees the output matches your schema',
          'It\'s cheaper',
          'It works with any model',
        ],
        correctIndex: 1,
        explanation: 'Structured Outputs enforces schema compliance at generation time, eliminating parse errors.',
      },
    ],
    resources: [
      { title: 'OpenAI Structured Outputs', url: 'https://platform.openai.com/docs/guides/structured-outputs', type: 'docs' },
    ],
    proTips: [
      'Always use structured outputs for production data extraction.',
      'Define Pydantic models first, then write prompts around them.',
      'Add retry logic as a safety net even with structured outputs.',
    ],
    commonMistakes: [
      'Parsing free-form text with regex when structured outputs exist.',
      'Not validating parsed data before using it downstream.',
    ],
  },
  {
    day: 12,
    title: 'Evaluation & Testing',
    subtitle: 'How to Know If Your AI App Is Good',
    week: 2,
    weekTitle: 'Building with LLMs',
    duration: '50 min',
    difficulty: 'Intermediate',
    isProject: false,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
    videoId: 'tY78q6DrsGk',
    videoTitle: 'Evaluating LLM Applications',
    description: 'AI apps are non-deterministic — the same input can produce different outputs. How do you test that? Today you\'ll learn evaluation frameworks, metrics, and the art of knowing when your AI is good enough.',
    objectives: [
      'Understand why traditional testing doesn\'t work for LLMs',
      'Build evaluation datasets with expected outputs',
      'Use LLM-as-judge for automated evaluation',
      'Track key metrics: accuracy, relevance, latency, cost',
      'Set up continuous evaluation pipelines',
    ],
    keyConcepts: [
      {
        title: 'LLM-as-Judge',
        description: 'Use a strong LLM (GPT-4) to evaluate outputs of your AI app. "Rate this answer 1-5 on accuracy, relevance, and helpfulness." Surprisingly reliable and scalable.',
      },
      {
        title: 'Golden Datasets',
        description: 'Curated sets of input → expected output pairs. Your benchmark. Run your app against them after every change to catch regressions.',
      },
      {
        title: 'RAG Evaluation',
        description: 'Evaluate separately: retrieval (did we find the right docs?) and generation (did the LLM answer correctly given the docs?). RAGAS framework automates this.',
      },
    ],
    deepDive: `**Evaluation metrics that matter:**

| Metric | What It Measures | How to Measure |
|--------|-----------------|----------------|
| Accuracy | Correct answers | Golden dataset comparison |
| Relevance | On-topic responses | LLM-as-judge |
| Faithfulness | Grounded in sources (RAG) | RAGAS framework |
| Latency | Response time | API timing |
| Cost | $ per query | Token counting |
| User satisfaction | Real-world quality | Thumbs up/down |

**The evaluation loop:**
1. Build golden dataset (50-100 examples)
2. Run app against dataset
3. Score with automated metrics + LLM-as-judge
4. Make improvements
5. Re-run to verify no regressions
6. Repeat forever`,
    quiz: [
      {
        question: 'Why can\'t you use traditional unit tests for LLM apps?',
        options: [
          'LLMs are too slow',
          'Outputs are non-deterministic — same input can give different outputs',
          'LLMs don\'t support testing frameworks',
          'Unit tests are deprecated',
        ],
        correctIndex: 1,
        explanation: 'LLM outputs vary between runs, so you need probabilistic evaluation rather than exact match testing.',
      },
    ],
    resources: [
      { title: 'RAGAS Framework', url: 'https://docs.ragas.io/', type: 'docs' },
      { title: 'LangSmith Evaluation', url: 'https://docs.smith.langchain.com/evaluation', type: 'docs' },
    ],
    proTips: [
      'Start evaluating from day 1 — don\'t wait until production.',
      '50 good evaluation examples beat 500 mediocre ones.',
      'Track metrics over time — a graph showing improvement is powerful.',
    ],
    commonMistakes: [
      'Only testing happy paths.',
      'Evaluating generation without evaluating retrieval (in RAG).',
      'Not re-running evals after prompt changes.',
    ],
  },
  {
    day: 13,
    title: 'Cost, Latency & Optimization',
    subtitle: 'Building Efficient AI Applications',
    week: 2,
    weekTitle: 'Building with LLMs',
    duration: '45 min',
    difficulty: 'Intermediate',
    isProject: false,
    image: 'https://images.unsplash.com/photo-1611974789855-9c8a1a1c0c1c?w=1200&h=600&fit=crop',
    videoId: 'LWiM-LuRe6w',
    videoTitle: 'Optimizing LLM Applications',
    description: 'A naive AI app can cost $10,000/month. An optimized one costs $100. Today you\'ll learn caching, model routing, prompt compression, and every trick to build fast, affordable AI products.',
    objectives: [
      'Calculate and project API costs accurately',
      'Implement semantic caching to reduce duplicate calls',
      'Use model routing: cheap models for easy tasks, expensive for hard ones',
      'Optimize prompts to reduce token usage',
      'Measure and improve latency',
    ],
    keyConcepts: [
      {
        title: 'Semantic Caching',
        description: 'Cache LLM responses by embedding similarity. "What\'s the weather?" and "How\'s the weather?" hit the same cache. Can reduce costs by 30-60%.',
      },
      {
        title: 'Model Routing',
        description: 'Use a classifier to route simple queries to cheap models (GPT-4o-mini) and complex ones to powerful models (GPT-4o). 80% of queries are simple.',
      },
      {
        title: 'Prompt Compression',
        description: 'Remove unnecessary words, use abbreviations in system prompts, summarize long contexts. Every token saved = money saved at scale.',
      },
    ],
    deepDive: `**Cost calculation example:**
- 10,000 queries/day × 2,000 tokens avg × $2.50/1M tokens = $50/day = $1,500/month
- With caching (40% hit rate): $900/month
- With model routing (80% to mini): $400/month
- With prompt optimization (30% fewer tokens): $280/month

**Optimization checklist:**
✅ Semantic caching
✅ Model routing (cheap → expensive)
✅ Shorter system prompts
✅ Smaller context windows where possible
✅ Batch API for non-real-time tasks (50% discount)
✅ Response streaming (perceived latency, not actual)`,
    quiz: [
      {
        question: 'What is semantic caching?',
        options: [
          'Caching based on exact string match',
          'Caching based on meaning similarity using embeddings',
          'Storing models in memory',
          'Compressing API responses',
        ],
        correctIndex: 1,
        explanation: 'Semantic caching matches similar (not identical) queries to cached responses using embedding similarity.',
      },
    ],
    resources: [
      { title: 'GPTCache', url: 'https://github.com/zilliztech/GPTCache', type: 'tool' },
      { title: 'OpenAI Batch API', url: 'https://platform.openai.com/docs/guides/batch', type: 'docs' },
    ],
    proTips: [
      'Track cost per query from day 1.',
      'GPT-4o-mini handles 80% of tasks at 10x lower cost.',
      'Cache aggressively — most user queries are repetitive.',
    ],
    commonMistakes: [
      'Using GPT-4 for everything.',
      'Not monitoring costs until the bill arrives.',
      'Sending entire documents when a summary would suffice.',
    ],
  },
  {
    day: 14,
    title: 'Document Q&A Bot',
    subtitle: 'Week 2 Capstone — Full RAG Application',
    week: 2,
    weekTitle: 'Building with LLMs',
    duration: '120 min',
    difficulty: 'Intermediate',
    isProject: true,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop',
    videoId: 'jkrNMKKVayQ',
    videoTitle: 'Build a RAG Application from Scratch',
    description: 'Your second major project: a complete document Q&A system. Upload PDFs, ask questions, get grounded answers with citations. This is the most common AI app in production.',
    objectives: [
      'Build a complete RAG pipeline from scratch',
      'Handle PDF ingestion and text extraction',
      'Implement chunking with overlap',
      'Store embeddings in ChromaDB',
      'Generate answers with source citations',
      'Create a simple web UI with Gradio',
    ],
    keyConcepts: [
      {
        title: 'End-to-End RAG',
        description: 'PDF → Text Extraction → Chunking → Embedding → Vector Store → Query → Retrieve → Generate → Cite Sources. The full production pipeline.',
      },
    ],
    deepDive: `**Project architecture:**

\`\`\`
┌─────────┐    ┌──────────┐    ┌──────────┐    ┌───────────┐
│  PDF    │ →  │  Chunker │ →  │ Embedder │ →  │  ChromaDB │
│ Upload  │    │          │    │          │    │           │
└─────────┘    └──────────┘    └──────────┘    └───────────┘
                                                     ↓
┌─────────┐    ┌──────────┐    ┌──────────┐    ┌───────────┐
│ Answer  │ ←  │   LLM    │ ←  │ Retriever│ ←  │   Query   │
│ + Cites │    │          │    │          │    │           │
└─────────┘    └──────────┘    └──────────┘    └───────────┘
\`\`\`

**Requirements:**
1. Upload and process PDF documents
2. Chunk with 512 tokens, 50 token overlap
3. Store in ChromaDB with metadata (source, page)
4. Answer questions with retrieved context
5. Show source citations
6. Gradio web UI`,
    codeExamples: [
      {
        title: 'RAG Q&A Core Logic',
        language: 'python',
        code: `import chromadb
from openai import OpenAI

client = OpenAI()
chroma = chromadb.Client()
collection = chroma.get_or_create_collection("docs")

def ask(question: str, n_results: int = 3) -> str:
    results = collection.query(query_texts=[question], n_results=n_results)
    context = "\\n\\n".join(results["documents"][0])
    sources = results["metadatas"][0]
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "system",
            "content": "Answer based ONLY on the provided context. Cite sources."
        }, {
            "role": "user",
            "content": f"Context:\\n{context}\\n\\nQuestion: {question}"
        }],
    )
    answer = response.choices[0].message.content
    citations = [s.get("source", "unknown") for s in sources]
    return f"{answer}\\n\\nSources: {', '.join(citations)}"`,
        explanation: 'The core Q&A logic. Wrap this in a Gradio UI and you have a production RAG app.',
      },
    ],
    quiz: [
      {
        question: 'Why include source citations in RAG answers?',
        options: [
          'It\'s required by law',
          'Users can verify answers and trust the system',
          'It improves retrieval quality',
          'It reduces API costs',
        ],
        correctIndex: 1,
        explanation: 'Citations let users verify information and build trust in AI-generated answers.',
      },
    ],
    resources: [
      { title: 'PyPDF for PDF extraction', url: 'https://pypi.org/project/pypdf/', type: 'tool' },
      { title: 'LangChain Document Loaders', url: 'https://python.langchain.com/docs/how_to/document_loader_pdf/', type: 'docs' },
    ],
    proTips: [
      'This project pattern is used by 90% of enterprise AI apps.',
      'Add a "I don\'t know" response when retrieval confidence is low.',
      'Test with questions NOT in your documents to verify it doesn\'t hallucinate.',
    ],
    commonMistakes: [
      'Not handling PDF extraction errors.',
      'Chunks too large or too small.',
      'Not showing citations to users.',
    ],
  },
]
