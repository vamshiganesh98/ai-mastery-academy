import type { Lesson } from './types'

export const week4Lessons: Lesson[] = [
  {
    day: 22,
    title: 'Deploying AI Applications',
    subtitle: 'APIs, Docker, Serverless & Production',
    week: 4,
    weekTitle: 'Production & Mastery',
    duration: '60 min',
    difficulty: 'Advanced',
    isProject: false,
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=600&fit=crop',
    videoId: '7t2ALDpA5DE',
    videoTitle: 'Deploying LLM Applications',
    description: 'Your AI app works locally — now make it available to the world. Today you\'ll deploy with FastAPI, Docker, and cloud platforms. Learn the production architecture patterns used by real AI companies.',
    objectives: [
      'Build a FastAPI wrapper around your AI app',
      'Containerize with Docker for consistent deployment',
      'Deploy to cloud platforms (Railway, Fly.io, Vercel)',
      'Handle async requests and background jobs',
      'Set up environment variables and secrets management',
    ],
    keyConcepts: [
      {
        title: 'API Layer',
        description: 'Wrap your AI logic in a REST API. FastAPI is the standard for Python AI apps. Endpoints for chat, upload, search, etc.',
      },
      {
        title: 'Docker',
        description: 'Package your app + dependencies into a container. Runs identically everywhere. Essential for production deployment.',
      },
      {
        title: 'Async Processing',
        description: 'LLM calls take seconds. Use background tasks or queues (Celery, BullMQ) for long-running operations. Return job IDs, poll for results.',
      },
    ],
    deepDive: `**Production architecture:**

\`\`\`
Client → Load Balancer → API Server (FastAPI)
                              ↓
                         Queue (Redis)
                              ↓
                         Worker (AI processing)
                              ↓
                         Vector DB + LLM API
\`\`\`

**Deployment options:**
- Railway / Fly.io: Easy, good for MVPs ($5-20/month)
- AWS/GCP: Full control, scales to millions ($50-500/month)
- Vercel: Great for Next.js frontends
- Modal / Replicate: GPU workloads`,
    codeExamples: [
      {
        title: 'FastAPI AI Endpoint',
        language: 'python',
        code: `from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI

app = FastAPI(title="AI Mastery API")
client = OpenAI()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful AI tutor."},
            {"role": "user", "content": request.message},
        ],
    )
    return ChatResponse(
        response=response.choices[0].message.content
    )

@app.get("/health")
async def health():
    return {"status": "healthy"}`,
        explanation: 'Every production AI app needs an API layer. FastAPI + Pydantic gives you type-safe endpoints.',
      },
    ],
    quiz: [
      {
        question: 'Why use background queues for AI processing?',
        options: [
          'LLM calls are faster in queues',
          'LLM calls take seconds — users shouldn\'t wait on a synchronous HTTP request',
          'Queues are required by OpenAI',
          'It reduces API costs',
        ],
        correctIndex: 1,
        explanation: 'LLM inference takes 2-30 seconds. Background processing prevents HTTP timeouts and improves UX.',
      },
    ],
    resources: [
      { title: 'FastAPI Docs', url: 'https://fastapi.tiangolo.com/', type: 'docs' },
      { title: 'Railway Deployment', url: 'https://railway.app/', type: 'tool' },
    ],
    proTips: [
      'Start with Railway or Fly.io — deploy in minutes.',
      'Always have a /health endpoint for monitoring.',
      'Use environment variables for ALL secrets.',
    ],
    commonMistakes: [
      'Synchronous LLM calls in API endpoints (timeouts!).',
      'Hardcoding API keys in Docker images.',
      'No health checks or monitoring.',
    ],
  },
  {
    day: 23,
    title: 'Fine-tuning vs Prompting',
    subtitle: 'When to Train Your Own Model',
    week: 4,
    weekTitle: 'Production & Mastery',
    duration: '55 min',
    difficulty: 'Advanced',
    isProject: false,
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop',
    videoId: '0Jo2pYn4xTQ',
    videoTitle: 'Fine-tuning LLMs Explained',
    description: 'Should you fine-tune or just write better prompts? Today you\'ll learn when fine-tuning makes sense, how to prepare training data, and the tools that make fine-tuning accessible.',
    objectives: [
      'Know when to fine-tune vs prompt vs RAG',
      'Prepare training datasets for fine-tuning',
      'Fine-tune with OpenAI, Together AI, or Hugging Face',
      'Evaluate fine-tuned models against baselines',
      'Understand LoRA and efficient fine-tuning',
    ],
    keyConcepts: [
      {
        title: 'Decision Framework',
        description: 'Prompt engineering first (free). Then RAG (for knowledge). Then fine-tuning (for behavior/style). Fine-tuning is the last resort, not the first choice.',
      },
      {
        title: 'LoRA',
        description: 'Low-Rank Adaptation — fine-tune only a small subset of parameters. 100x cheaper than full fine-tuning. Standard approach for open-source models.',
      },
      {
        title: 'Training Data',
        description: 'Need 50-1000 high-quality examples. Format: instruction → response pairs. Quality matters more than quantity.',
      },
    ],
    deepDive: `**When to use what:**

| Approach | Use When | Cost | Effort |
|----------|----------|------|--------|
| Prompt Engineering | Most tasks | $0 | Low |
| RAG | Need external knowledge | Low | Medium |
| Fine-tuning | Consistent style/format, domain language | Medium | High |
| Train from scratch | Never (unless you're OpenAI) | $$$$ | Extreme |

**Fine-tuning use cases that work:**
- Customer support tone and format
- Code generation in your company's style
- Classification with specific categories
- JSON extraction with your schema`,
    quiz: [
      {
        question: 'What should you try BEFORE fine-tuning?',
        options: [
          'Training from scratch',
          'Better prompt engineering and RAG',
          'Buying a bigger model',
          'Hiring more engineers',
        ],
        correctIndex: 1,
        explanation: 'Always exhaust prompt engineering and RAG options before investing in fine-tuning.',
      },
    ],
    resources: [
      { title: 'OpenAI Fine-tuning Guide', url: 'https://platform.openai.com/docs/guides/fine-tuning', type: 'docs' },
      { title: 'Hugging Face PEFT (LoRA)', url: 'https://huggingface.co/docs/peft', type: 'docs' },
    ],
    proTips: [
      '90% of tasks don\'t need fine-tuning.',
      'When you do fine-tune, start with 50 perfect examples.',
      'Always A/B test fine-tuned vs base model.',
    ],
    commonMistakes: [
      'Fine-tuning when better prompts would work.',
      'Low-quality training data.',
      'Not evaluating against the base model.',
    ],
  },
  {
    day: 24,
    title: 'Multimodal AI',
    subtitle: 'Vision, Audio, Images & Beyond Text',
    week: 4,
    weekTitle: 'Production & Mastery',
    duration: '50 min',
    difficulty: 'Advanced',
    isProject: false,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
    videoId: 'kCc8FmEb1nY',
    videoTitle: 'Multimodal AI — Vision and Language',
    description: 'AI isn\'t just text anymore. GPT-4o sees images, Whisper hears audio, DALL-E creates pictures. Today you\'ll explore multimodal AI and build apps that see, hear, and create.',
    objectives: [
      'Use vision models to analyze images',
      'Transcribe audio with Whisper',
      'Generate images with DALL-E and Stable Diffusion',
      'Build multimodal applications',
      'Understand the multimodal AI landscape',
    ],
    keyConcepts: [
      {
        title: 'Vision Models',
        description: 'GPT-4o, Claude 3, and Gemini can analyze images. Send an image + text prompt. Use cases: document OCR, chart analysis, visual QA, code screenshot debugging.',
      },
      {
        title: 'Speech-to-Text',
        description: 'Whisper (OpenAI) transcribes audio with near-human accuracy. 100+ languages. Use for meeting notes, podcast transcription, voice interfaces.',
      },
      {
        title: 'Image Generation',
        description: 'DALL-E 3, Midjourney, Stable Diffusion create images from text. Use for marketing, prototyping, creative tools.',
      },
    ],
    deepDive: `**Multimodal API example flow:**

1. User uploads a photo of a receipt
2. Vision model extracts: vendor, items, prices, total
3. Structured output → JSON → database
4. Text model generates expense report summary

**This pattern (vision → structure → action) is incredibly powerful and underused.**`,
    codeExamples: [
      {
        title: 'Image Analysis with GPT-4o',
        language: 'python',
        code: `import base64
from openai import OpenAI

client = OpenAI()

def analyze_image(image_path: str, question: str) -> str:
    with open(image_path, "rb") as f:
        base64_image = base64.b64encode(f.read()).decode()
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": question},
                {"type": "image_url", "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}"
                }},
            ],
        }],
    )
    return response.choices[0].message.content`,
        explanation: 'Send images alongside text prompts. The model can see and reason about visual content.',
      },
    ],
    quiz: [
      {
        question: 'Which model is best for transcribing audio?',
        options: ['GPT-4', 'Whisper', 'DALL-E', 'Embeddings'],
        correctIndex: 1,
        explanation: 'Whisper is OpenAI\'s dedicated speech-to-text model, supporting 100+ languages.',
      },
    ],
    resources: [
      { title: 'OpenAI Vision Guide', url: 'https://platform.openai.com/docs/guides/vision', type: 'docs' },
      { title: 'Whisper API', url: 'https://platform.openai.com/docs/guides/speech-to-text', type: 'docs' },
    ],
    proTips: [
      'Vision models are underused — huge opportunity for innovative apps.',
      'Combine vision + structured outputs for document processing.',
      'Whisper is incredibly cheap — $0.006 per minute of audio.',
    ],
    commonMistakes: [
      'Sending huge images — resize to 1024px max before sending.',
      'Not specifying what you want extracted from images.',
    ],
  },
  {
    day: 25,
    title: 'Reading AI-Generated Code',
    subtitle: 'Understand, Review & Trust AI Code',
    week: 4,
    weekTitle: 'Production & Mastery',
    duration: '55 min',
    difficulty: 'Intermediate',
    isProject: false,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
    videoId: 'jfMHA8SqUL4',
    videoTitle: 'How to Review AI-Generated Code',
    description: 'AI writes code fast, but not always correctly. Today you\'ll learn to read, review, and debug AI-generated code like a senior engineer. This skill separates good AI engineers from code copy-pasters.',
    objectives: [
      'Systematically review AI-generated code',
      'Identify common AI code mistakes and anti-patterns',
      'Verify security, error handling, and edge cases',
      'Understand code without running it (reading comprehension)',
      'Build a mental checklist for code review',
    ],
    keyConcepts: [
      {
        title: 'AI Code Patterns',
        description: 'AI tends to: over-explain in comments, miss error handling, use outdated APIs, hardcode values, skip edge cases, and create unnecessary abstractions.',
      },
      {
        title: 'Review Checklist',
        description: 'Security (injection, secrets), Error handling (try/except), Edge cases (empty input, null), Performance (N+1 queries), Correctness (does it actually work?).',
      },
      {
        title: 'Reading Code',
        description: 'Top-down: understand the entry point, follow the main flow, identify data transformations, check error paths. Don\'t get lost in implementation details first.',
      },
    ],
    deepDive: `**Common AI code mistakes:**

1. **Hardcoded secrets** — API keys in source code
2. **Missing error handling** — assumes everything works
3. **Hallucinated APIs** — calls functions that don't exist
4. **Over-engineering** — 5 classes when 1 function suffices
5. **No input validation** — trusts all user input
6. **Sync in async** — blocks event loop
7. **Memory leaks** — doesn't close files/connections

**The review process:**
1. Read the imports — what libraries are used?
2. Find the entry point — where does execution start?
3. Trace the happy path — what happens with valid input?
4. Check error paths — what happens when things fail?
5. Look for security issues — secrets, injection, permissions
6. Run it — does it actually work?`,
    quiz: [
      {
        question: 'What is the most common security issue in AI-generated code?',
        options: [
          'Using the wrong programming language',
          'Hardcoded API keys and secrets',
          'Code that runs too slowly',
          'Too many comments',
        ],
        correctIndex: 1,
        explanation: 'AI frequently hardcodes API keys and credentials directly in source code — always check for this.',
      },
    ],
    resources: [
      { title: 'OWASP Secure Coding', url: 'https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/', type: 'article' },
    ],
    proTips: [
      'Never deploy AI code without reading it first.',
      'Ask AI to explain its own code — great learning exercise.',
      'Run security linters (bandit for Python, eslint for JS).',
    ],
    commonMistakes: [
      'Copy-pasting AI code without understanding it.',
      'Trusting that code works because it looks correct.',
      'Not testing edge cases.',
    ],
  },
  {
    day: 26,
    title: 'Testing AI Systems',
    subtitle: 'Quality Assurance for Non-Deterministic Apps',
    week: 4,
    weekTitle: 'Production & Mastery',
    duration: '50 min',
    difficulty: 'Advanced',
    isProject: false,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
    videoId: 'tY78q6DrsGk',
    videoTitle: 'Testing LLM Applications',
    description: 'Traditional tests check exact outputs. AI outputs vary. Today you\'ll build a comprehensive testing strategy for AI apps — unit tests for components, integration tests for pipelines, and eval suites for quality.',
    objectives: [
      'Test deterministic parts (parsers, validators) with unit tests',
      'Test AI pipelines with evaluation suites',
      'Implement regression testing for prompts',
      'Use property-based testing for AI outputs',
      'Set up CI/CD for AI applications',
    ],
    keyConcepts: [
      {
        title: 'Test Pyramid for AI',
        description: 'Bottom: unit tests for non-AI code (parsers, validators, formatters). Middle: integration tests for pipelines. Top: evaluation suites for AI quality.',
      },
      {
        title: 'Regression Testing',
        description: 'Save prompt + input + output snapshots. When you change a prompt, re-run all snapshots and check for regressions. Like Jest snapshots but for AI.',
      },
    ],
    deepDive: `**What to test deterministically:**
- Input validation and sanitization
- Token counting and chunking logic
- Embedding storage and retrieval
- API error handling and retries
- Response parsing and formatting

**What to test probabilistically:**
- Answer quality (eval suite)
- Retrieval relevance (RAG metrics)
- Tool selection accuracy
- Overall user satisfaction`,
    quiz: [
      {
        question: 'What should you unit test in an AI application?',
        options: [
          'The LLM\'s response quality',
          'Deterministic code like parsers, validators, and formatters',
          'The model\'s training data',
          'User satisfaction scores',
        ],
        correctIndex: 1,
        explanation: 'Unit tests are for deterministic code. AI quality is tested with evaluation suites, not unit tests.',
      },
    ],
    resources: [
      { title: 'pytest Documentation', url: 'https://docs.pytest.org/', type: 'docs' },
      { title: 'DeepEval Framework', url: 'https://docs.confident-ai.com/', type: 'tool' },
    ],
    proTips: [
      'Test the plumbing, evaluate the AI.',
      'Run eval suites in CI on every prompt change.',
      'Keep a "red team" dataset of adversarial inputs.',
    ],
    commonMistakes: [
      'No tests at all because "AI is non-deterministic".',
      'Only testing happy paths.',
    ],
  },
  {
    day: 27,
    title: 'Architecture Patterns',
    subtitle: 'How Real AI Products Are Built',
    week: 4,
    weekTitle: 'Production & Mastery',
    duration: '60 min',
    difficulty: 'Advanced',
    isProject: false,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
    videoId: 'aIrJy25XcHU',
    videoTitle: 'AI Application Architecture',
    description: 'Learn the architecture patterns used by successful AI products. Copilot, ChatGPT, Perplexity, and Harvey each use different patterns. Today you\'ll understand them all and know which to use when.',
    objectives: [
      'Understand 5 core AI architecture patterns',
      'Map patterns to real products (ChatGPT, Copilot, Perplexity)',
      'Design architecture for your own AI product',
      'Make build vs buy decisions for AI components',
      'Plan for scale from day one',
    ],
    keyConcepts: [
      {
        title: 'Pattern 1: Chat Interface',
        description: 'Simple chat UI → API → LLM. ChatGPT, Claude. Easiest pattern. Good for general-purpose assistants.',
      },
      {
        title: 'Pattern 2: RAG Knowledge Base',
        description: 'Chat + document retrieval. Perplexity, company knowledge bases. Most common enterprise pattern.',
      },
      {
        title: 'Pattern 3: Copilot / Inline',
        description: 'AI embedded in existing workflows. GitHub Copilot, Notion AI. Context-aware suggestions in real-time.',
      },
      {
        title: 'Pattern 4: Agent Platform',
        description: 'Autonomous agents with tools. Devin, multi-agent research systems. Most complex, most powerful.',
      },
      {
        title: 'Pattern 5: AI Pipeline',
        description: 'Automated processing without user interaction. Document processing, data extraction, content moderation.',
      },
    ],
    deepDive: `**Choosing your architecture:**

Ask these questions:
1. Does the user need to interact in real-time? → Chat or Copilot
2. Does the app need specific knowledge? → Add RAG
3. Are tasks multi-step and autonomous? → Agent
4. Is it batch processing? → Pipeline
5. What's the budget? → Simpler patterns cost less

**Most successful AI products combine patterns:**
Perplexity = Chat + RAG + Web Search (agent-lite)
GitHub Copilot = Copilot + RAG (codebase context)`,
    quiz: [
      {
        question: 'Which pattern does Perplexity primarily use?',
        options: [
          'Simple chat interface',
          'Chat + RAG + web search',
          'Batch processing pipeline',
          'Image generation',
        ],
        correctIndex: 1,
        explanation: 'Perplexity combines chat, retrieval from web sources, and search — a RAG-plus-search pattern.',
      },
    ],
    resources: [
      { title: 'a16z AI Canon', url: 'https://a16z.com/ai-canon/', type: 'article' },
    ],
    proTips: [
      'Start with the simplest pattern that solves the problem.',
      'Study existing products — their architecture is your best teacher.',
      'Most "agent" products are actually RAG + function calling.',
    ],
    commonMistakes: [
      'Over-architecting for day one.',
      'Choosing agents when simple RAG would work.',
    ],
  },
  {
    day: 28,
    title: 'Capstone Project',
    subtitle: 'Build Your Dream AI Agent',
    week: 4,
    weekTitle: 'Production & Mastery',
    duration: '180 min',
    difficulty: 'Advanced',
    isProject: true,
    image: 'https://images.unsplash.com/photo-1531489875319-5c4e4a4c4c4c?w=1200&h=600&fit=crop',
    videoId: 'u5Vcrisnp0Q',
    videoTitle: 'Build Your AI Agent — Capstone Guide',
    description: 'This is it — your final project. Build a complete AI agent of your choice that showcases everything you\'ve learned. This goes in your portfolio and proves you\'re a real AI engineer.',
    objectives: [
      'Design and build a complete AI agent from scratch',
      'Combine RAG, tools, agents, and deployment',
      'Create a polished UI',
      'Write documentation and README',
      'Deploy to production',
    ],
    keyConcepts: [
      {
        title: 'Project Ideas',
        description: 'Choose one: 1) Personal AI tutor 2) Code review agent 3) Customer support bot 4) Research assistant 5) Data analysis agent 6) Your own idea!',
      },
    ],
    deepDive: `**Capstone requirements:**

✅ Uses LLM API with proper error handling
✅ Has at least 2 tools or RAG knowledge base
✅ Multi-step agent workflow (not single prompt)
✅ Web UI (Gradio, Streamlit, or custom)
✅ Deployed and accessible via URL
✅ README with setup instructions
✅ Evaluation results documented

**Grading criteria:**
- Functionality (40%)
- Code quality (20%)
- UI/UX (15%)
- Documentation (15%)
- Innovation (10%)`,
    quiz: [
      {
        question: 'What is the minimum number of tools/RAG a capstone project should have?',
        options: ['0', '1', '2', '10'],
        correctIndex: 2,
        explanation: 'At least 2 tools or a RAG knowledge base demonstrates multi-capability agent design.',
      },
    ],
    resources: [
      { title: 'Gradio Gallery', url: 'https://gradio.app/docs/', type: 'docs' },
      { title: 'Streamlit Gallery', url: 'https://streamlit.io/gallery', type: 'tool' },
    ],
    proTips: [
      'Pick a project you\'re passionate about — you\'ll spend hours on it.',
      'Deploy early, iterate often.',
      'This project is your portfolio piece — make it shine.',
    ],
    commonMistakes: [
      'Scope too large — start small, add features.',
      'No deployment — local-only projects don\'t impress.',
      'Skipping documentation.',
    ],
  },
  {
    day: 29,
    title: 'Career & Portfolio',
    subtitle: 'Land Your First AI Engineering Role',
    week: 4,
    weekTitle: 'Production & Mastery',
    duration: '45 min',
    difficulty: 'Beginner',
    isProject: false,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop',
    videoId: '5q3jKjG4P7A',
    videoTitle: 'Breaking into AI Engineering',
    description: 'You\'ve learned the skills — now land the job. Today covers portfolio building, resume tips, interview preparation, and the AI engineering job market.',
    objectives: [
      'Build a portfolio that showcases AI projects',
      'Write an AI engineer resume that stands out',
      'Prepare for AI engineering interviews',
      'Understand the job market and salary ranges',
      'Plan your continued learning path',
    ],
    keyConcepts: [
      {
        title: 'Portfolio Projects',
        description: '3 projects that show range: 1 RAG app, 1 agent, 1 deployed full-stack AI product. Each with GitHub repo, live demo, and README.',
      },
      {
        title: 'Interview Topics',
        description: 'Expect: system design for AI apps, prompt engineering scenarios, RAG architecture questions, coding (Python), and "build this live" challenges.',
      },
    ],
    deepDive: `**AI Engineer resume highlights:**
- Projects with live demos (not just GitHub)
- Specific technologies: LangChain, RAG, vector DBs, OpenAI API
- Metrics: "Reduced query cost by 60% with semantic caching"
- Open source contributions to AI tools

**Salary ranges (2025-2026):**
- Junior AI Engineer: $100K-$150K
- Mid-level: $150K-$220K
- Senior: $220K-$350K+
- Staff/Principal: $350K-$500K+`,
    quiz: [
      {
        question: 'What matters most in an AI engineering portfolio?',
        options: [
          'Number of GitHub stars',
          'Live deployed projects with documented architecture',
          'Certificates and courses completed',
          'Years of experience',
        ],
        correctIndex: 1,
        explanation: 'Hiring managers want to see working, deployed projects with clear documentation of your architectural decisions.',
      },
    ],
    resources: [
      { title: 'AI Engineer Roadmap', url: 'https://roadmap.sh/ai-engineer', type: 'article' },
    ],
    proTips: [
      'Share your projects on LinkedIn and Twitter — visibility matters.',
      'Contribute to open source AI projects.',
      'Network at AI meetups and conferences.',
    ],
    commonMistakes: [
      'Portfolio with only tutorial projects.',
      'No live demos — deploy everything.',
      'Not documenting your architectural decisions.',
    ],
  },
  {
    day: 30,
    title: 'Graduation Day',
    subtitle: 'Review, Reflect & Your Path Forward',
    week: 4,
    weekTitle: 'Production & Mastery',
    duration: '60 min',
    difficulty: 'Beginner',
    isProject: false,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop',
    videoId: '5sLYAQS9sEQ',
    videoTitle: 'Your AI Engineering Journey Continues',
    description: 'Congratulations! You\'ve completed the 30-day AI Mastery Academy. Today we review everything you\'ve learned, identify gaps, and chart your path to becoming a world-class AI engineer.',
    objectives: [
      'Review all 30 days of learning',
      'Self-assess your skills across all areas',
      'Identify knowledge gaps to fill',
      'Create a 90-day continued learning plan',
      'Join the AI engineering community',
    ],
    keyConcepts: [
      {
        title: 'What You\'ve Mastered',
        description: 'LLM fundamentals, prompt engineering, RAG, vector databases, function calling, agents, MCP, deployment, evaluation, and production patterns.',
      },
      {
        title: 'What\'s Next',
        description: 'Specialize: AI agents, RAG systems, AI infrastructure, or AI product engineering. Build in public. Stay current — the field moves fast.',
      },
    ],
    deepDive: `**Your 90-day continued learning plan:**

**Month 2: Deepen**
- Build 2 more portfolio projects
- Contribute to an open source AI project
- Read 3 AI papers (attention, RAG, agents)

**Month 3: Specialize**
- Pick your niche (agents, RAG, infra, products)
- Build a signature project in that niche
- Start writing/blogging about what you learn

**Month 4: Launch**
- Apply for AI engineering roles
- Or launch your own AI product
- Mentor others starting their journey

**You are now an AI Engineer. Go build the future. 🚀**`,
    quiz: [
      {
        question: 'What is the most important thing to do after completing this course?',
        options: [
          'Take another course',
          'Keep building projects and stay current with the field',
          'Memorize all the API documentation',
          'Wait for the technology to stabilize',
        ],
        correctIndex: 1,
        explanation: 'AI engineering is learned by building. Keep creating projects, and stay current — the field evolves weekly.',
      },
    ],
    resources: [
      { title: 'Hugging Face Community', url: 'https://huggingface.co/', type: 'tool' },
      { title: 'Latent Space Podcast', url: 'https://www.latent.space/', type: 'article' },
      { title: 'AI Engineer Newsletter', url: 'https://www.latent.space/', type: 'article' },
    ],
    proTips: [
      'The best AI engineers are perpetual learners.',
      'Build in public — share your journey.',
      'The field is young — you can still be a pioneer.',
    ],
    commonMistakes: [
      'Stopping learning after the course.',
      'Not building projects.',
      'Trying to learn everything instead of specializing.',
    ],
  },
]
