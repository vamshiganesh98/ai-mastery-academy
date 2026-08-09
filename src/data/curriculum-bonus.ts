import type { Lesson } from './types'

export const bonusLessons: Lesson[] = [
  {
    day: 31,
    title: 'The 10 Production Agent Concepts',
    subtitle: 'What Survives Contact with Production in 2027',
    week: 5,
    weekTitle: 'Living Syllabus',
    duration: '75 min',
    difficulty: 'Advanced',
    isProject: false,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop',
    videoId: 'sDIlA2VHrmM',
    videoTitle: 'AI Agents Explained — Production Perspective',
    description: 'Added August 9, 2026. The field has moved beyond prompt tricks. In 2026, the smartest teams stopped asking "which LLM?" and started asking "what did we build around it?" This bonus lesson covers the 10 concepts every agent engineer needs before 2027 — the knowledge that survives contact with production.',
    objectives: [
      'Understand the Agent = Model + Harness formula',
      'Master harness, loop, and context engineering as distinct disciplines',
      'Design tools, memory, and orchestration patterns for production',
      'Implement guardrails, evals, HITL, and observability for agents',
      'Use the 10-concept checklist to evaluate any agent system',
    ],
    keyConcepts: [
      {
        title: '1. Harness Engineering',
        description: 'Designing the environment your agent acts inside: sandbox, filesystem, runtime surface, verification loops, and feedback systems. The harness makes model intelligence useful and accountable.',
        analogy: 'The model is the driver. The harness is the car — seatbelts, brakes, GPS, and dashcam.',
      },
      {
        title: '2. Loop Engineering',
        description: 'Deciding when the agent runs again and when it stops. Max iterations, cost budgets, termination conditions, retry logic, and escalation paths. Without this, agents loop forever or burn your budget.',
        analogy: 'Like a thermostat — it knows when to keep adjusting and when the temperature is right.',
      },
      {
        title: '3. Context Engineering',
        description: 'Getting the right information into the window and keeping the wrong information out. Dynamic RAG, compaction, context resets, static vs dynamic context, and handoff artifacts. Bigger than prompt engineering for agents.',
        analogy: 'A surgeon doesn\'t need the entire medical library — just the right charts for this patient, right now.',
      },
      {
        title: '4. Tool Design',
        description: 'Your agent is only as capable as the tools you hand it, and only as safe as their worst edge case. Clear schemas, input validation, idempotent operations, and descriptive tool documentation.',
        analogy: 'Giving someone a Swiss Army knife vs a specialized surgical instrument set.',
      },
      {
        title: '5. Memory Architecture',
        description: 'What the agent remembers, for how long, and what it\'s allowed to forget. Short-term (session), long-term (persistent), episodic (past actions), semantic (facts). TTL and forgetting policies.',
      },
      {
        title: '6. Orchestration Patterns',
        description: 'One agent, a planner + workers, or a swarm — each fails differently. Single agent (simple, limited), planner-worker (scalable, complex), multi-agent swarm (powerful, hard to debug).',
      },
      {
        title: '7. Guardrails & Permissions',
        description: 'What happens when the agent tries something it shouldn\'t. Least privilege, allowlists, policy enforcement, moderation APIs. Principle: deny by default, allow explicitly.',
      },
      {
        title: '8. Evals for Agents',
        description: 'You can\'t test a trajectory the way you test a function. Evaluate: final outcome, tool selection accuracy, step efficiency, faithfulness, and safety. Use golden datasets + LLM-as-judge.',
      },
      {
        title: '9. Human-in-the-Loop Design',
        description: 'Knowing which decisions never get delegated. Payments, deletions, external communications, production deploys — always require human approval. Design pause/resume into your agent graph.',
      },
      {
        title: '10. Observability & Tracing',
        description: 'When it breaks at step 14 of 30, you need to see step 14. Log every think-act-observe cycle. Use LangSmith, OpenTelemetry, or similar. Tag traces with user/session IDs.',
      },
    ],
    deepDive: `**The 2026 Engineering Maturity Model:**

| Phase | Era | Focus | Question |
|-------|-----|-------|----------|
| 1 | 2023 | Prompt Engineering | "How do I phrase this?" |
| 2 | 2024-25 | Context Engineering | "What does the model see?" |
| 3 | 2026+ | Harness Engineering | "How is the model allowed to act?" |

**The formula every production team uses:**
\`\`\`
Agent = Model + Harness

Harness = Tools + Sandbox + Loop Control + Memory + Guardrails + Observability
\`\`\`

**Production harness has 5 layers:**
1. Tool orchestration — which tools, when, with what permissions
2. Verification loops — did the action succeed? validate before committing
3. Context & memory — what the agent sees and remembers
4. Guardrails — what the agent is NOT allowed to do
5. Observability — traces, logs, cost metering

**MCP 2026 Update (affects Day 18):**
The 2026-07-28 MCP spec made the protocol stateless by default. No more session IDs, no Redis for session storage. MCP is now just HTTP — scales on any load balancer. Long-running tasks use the new Tasks extension with explicit handles.

**Industry reality check:**
- Fewer than 1 in 8 agent initiatives reach production (2024-2025 data)
- Gartner: 40%+ of agentic AI projects may be cancelled by 2027
- Root causes: runaway costs, unclear value, missing risk controls
- The fix is NOT a better model — it's better engineering around the model

**Your production agent checklist:**
✅ Harness defined (sandbox, permissions, runtime)
✅ Loop has max iterations and cost budget
✅ Context is managed (not just dumped in)
✅ Tools are validated and documented
✅ Memory has TTL and scope limits
✅ Orchestration pattern chosen deliberately
✅ Guardrails on every sensitive action
✅ Eval suite with trajectory testing
✅ HITL on irreversible actions
✅ Full tracing on every run`,
    quiz: [
      {
        question: 'What is the Agent = Model + Harness formula saying?',
        options: [
          'You need two different AI models',
          'Reliability comes from the system around the model, not just the model itself',
          'Harnesses are only for coding agents',
          'The model is optional in production',
        ],
        correctIndex: 1,
        explanation: 'The harness (tools, loops, guardrails, observability) is where most production reliability lives — not in picking a slightly better model.',
      },
      {
        question: 'What changed in MCP 2026-07-28?',
        options: [
          'MCP was discontinued',
          'Protocol became stateless by default — no session IDs, scales on load balancers',
          'MCP only works with Claude now',
          'All MCP servers must use Redis',
        ],
        correctIndex: 1,
        explanation: 'The 2026 spec removed transport-level session management, making MCP stateless HTTP that scales without sticky sessions.',
      },
      {
        question: 'Why can\'t you test agents like regular functions?',
        options: [
          'Agents are written in Python',
          'Agents produce trajectories (multi-step paths), not single outputs',
          'Agents don\'t have inputs',
          'Unit tests don\'t work with AI',
        ],
        correctIndex: 1,
        explanation: 'Agent evaluation must assess entire trajectories — which tools were called, in what order, with what outcomes — not just the final answer.',
      },
      {
        question: 'Which is NOT a layer of a production harness?',
        options: [
          'Tool orchestration',
          'Verification loops',
          'Model pre-training',
          'Observability',
        ],
        correctIndex: 2,
        explanation: 'Pre-training is done by model providers. Harness engineering is about the execution environment around an already-trained model.',
      },
    ],
    resources: [
      { title: 'Harness Engineering — Faros AI', url: 'https://www.faros.ai/blog/harness-engineering', type: 'article' },
      { title: 'Agent Engineering Framework', url: 'https://github.com/vijayptiwari/agent-engineering-framework', type: 'tool' },
      { title: 'MCP Stateless Spec — Google', url: 'https://developers.googleblog.com/scaling-ai-agent-infrastructure-with-the-mcp-stateless-updates/', type: 'article' },
      { title: 'OWASP LLM Top 10', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', type: 'article' },
      { title: 'LangGraph Production Guide', url: 'https://langchain-ai.github.io/langgraph/', type: 'docs' },
    ],
    proTips: [
      'When an agent makes a mistake, fix the harness — not just the prompt.',
      'Score your agent on all 10 concepts using the readiness rubric in the Agent Engineering Framework.',
      'Start with a single-agent harness before going multi-agent.',
      'The gap between demo and production is almost entirely a harness gap.',
    ],
    commonMistakes: [
      'Spending 90% of effort on prompt tuning, 10% on harness design (should be reversed for agents).',
      'No termination conditions — agents run until they burn your API budget.',
      'Treating context engineering as "just write a better system prompt."',
      'Skipping trajectory evals and only checking final answers.',
    ],
  },
]
