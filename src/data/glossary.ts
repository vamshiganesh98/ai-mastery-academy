export interface GlossaryTerm {
  term: string
  definition: string
  category: string
  relatedLesson?: number
}

export const glossary: GlossaryTerm[] = [
  { term: 'LLM', definition: 'Large Language Model — a neural network trained on vast text data to predict and generate language. Examples: GPT-4, Claude, Llama.', category: 'Core', relatedLesson: 1 },
  { term: 'Token', definition: 'The atomic unit LLMs process. Subword pieces of text. ~0.75 tokens per English word. You pay per token.', category: 'Core', relatedLesson: 4 },
  { term: 'Embedding', definition: 'A dense vector representation of text that captures semantic meaning. Similar texts have similar vectors.', category: 'Core', relatedLesson: 4 },
  { term: 'Prompt Engineering', definition: 'The practice of crafting inputs to LLMs to get desired outputs. Includes system prompts, few-shot examples, and chain-of-thought.', category: 'Core', relatedLesson: 5 },
  { term: 'System Prompt', definition: 'Instructions that define the AI\'s role, behavior, and constraints. Set once per conversation.', category: 'Core', relatedLesson: 5 },
  { term: 'Temperature', definition: 'Controls output randomness. 0 = deterministic, 1 = creative. Use 0 for factual tasks.', category: 'Core', relatedLesson: 5 },
  { term: 'Context Window', definition: 'Maximum tokens a model can process at once (input + output). GPT-4o: 128K tokens.', category: 'Core', relatedLesson: 4 },
  { term: 'Hallucination', definition: 'When an LLM generates plausible but factually incorrect information. LLMs predict text, not truth.', category: 'Core', relatedLesson: 8 },
  { term: 'RAG', definition: 'Retrieval-Augmented Generation — retrieve relevant documents and feed them as context to ground LLM responses.', category: 'Building', relatedLesson: 8 },
  { term: 'Chunking', definition: 'Splitting documents into smaller pieces (256-1024 tokens) for embedding and retrieval in RAG systems.', category: 'Building', relatedLesson: 8 },
  { term: 'Vector Database', definition: 'Database optimized for storing and searching embedding vectors by similarity. Examples: Chroma, Pinecone, pgvector.', category: 'Building', relatedLesson: 9 },
  { term: 'Cosine Similarity', definition: 'Measure of similarity between two vectors. Score of 1.0 = identical, 0.0 = unrelated. Standard for embedding comparison.', category: 'Building', relatedLesson: 4 },
  { term: 'Function Calling', definition: 'LLM capability to request execution of defined functions/tools. The foundation of AI agents.', category: 'Agents', relatedLesson: 10 },
  { term: 'Agent', definition: 'AI system that autonomously pursues goals using tools, reasoning, and iteration until the task is complete.', category: 'Agents', relatedLesson: 15 },
  { term: 'ReAct', definition: 'Reason + Act pattern. Agent thinks, takes action, observes result, repeats. Core agent loop.', category: 'Agents', relatedLesson: 15 },
  { term: 'MCP', definition: 'Model Context Protocol — open standard for connecting AI models to external tools and data sources.', category: 'Agents', relatedLesson: 18 },
  { term: 'LangChain', definition: 'Popular Python framework for building LLM applications. Provides chains, retrievers, tools, and agents.', category: 'Frameworks', relatedLesson: 16 },
  { term: 'LangGraph', definition: 'Graph-based agent framework. Models agents as state machines with nodes and edges.', category: 'Frameworks', relatedLesson: 16 },
  { term: 'Fine-tuning', definition: 'Training a pre-trained model on custom data to adapt its behavior. Use LoRA for efficient fine-tuning.', category: 'Advanced', relatedLesson: 23 },
  { term: 'RLHF', definition: 'Reinforcement Learning from Human Feedback — training technique that aligns models with human preferences.', category: 'Core', relatedLesson: 3 },
  { term: 'Transformer', definition: 'Neural network architecture using self-attention. Foundation of all modern LLMs. Paper: "Attention Is All You Need" (2017).', category: 'Core', relatedLesson: 1 },
  { term: 'Attention', definition: 'Mechanism allowing models to focus on relevant parts of input. Key innovation in Transformers.', category: 'Core', relatedLesson: 2 },
  { term: 'Pre-training', definition: 'Initial training on massive text corpora with next-token prediction objective. Creates base models.', category: 'Core', relatedLesson: 3 },
  { term: 'Few-shot Prompting', definition: 'Including 2-5 examples of desired input→output in your prompt to guide model behavior.', category: 'Core', relatedLesson: 5 },
  { term: 'Chain-of-Thought', definition: 'Prompting technique asking the model to think step by step. Dramatically improves reasoning.', category: 'Core', relatedLesson: 5 },
  { term: 'Structured Outputs', definition: 'API feature guaranteeing LLM output matches a JSON schema. Eliminates parsing errors.', category: 'Building', relatedLesson: 11 },
  { term: 'Semantic Caching', definition: 'Caching LLM responses by embedding similarity. Similar queries hit the same cache.', category: 'Production', relatedLesson: 13 },
  { term: 'LLM-as-Judge', definition: 'Using a strong LLM to evaluate outputs of your AI app. Automated quality assessment.', category: 'Production', relatedLesson: 12 },
  { term: 'Prompt Injection', definition: 'Attack where malicious instructions in user input override system prompt behavior.', category: 'Production', relatedLesson: 19 },
  { term: 'Guardrails', definition: 'Safety mechanisms filtering inputs and outputs. Prevent harmful, off-topic, or incorrect responses.', category: 'Production', relatedLesson: 19 },
  { term: 'LoRA', definition: 'Low-Rank Adaptation — efficient fine-tuning method adjusting only a small subset of model parameters.', category: 'Advanced', relatedLesson: 23 },
  { term: 'Whisper', definition: 'OpenAI\'s speech-to-text model. Transcribes audio in 100+ languages with high accuracy.', category: 'Advanced', relatedLesson: 24 },
  { term: 'Streaming', definition: 'Receiving LLM tokens as they\'re generated rather than waiting for the complete response. Essential for chat UX.', category: 'Building', relatedLesson: 6 },
  { term: 'HNSW', definition: 'Hierarchical Navigable Small World — approximate nearest neighbor algorithm used in vector databases.', category: 'Building', relatedLesson: 9 },
  { term: 'CrewAI', definition: 'Multi-agent framework where agents with roles and goals collaborate on tasks.', category: 'Frameworks', relatedLesson: 16 },
  { term: 'Harness Engineering', definition: 'Designing the execution environment around an AI model: sandbox, tools, verification loops, guardrails, and observability. Agent = Model + Harness.', category: 'Agents', relatedLesson: 31 },
  { term: 'Loop Engineering', definition: 'Designing when an agent continues, retries, escalates, or stops. Includes max iterations, cost budgets, and termination conditions.', category: 'Agents', relatedLesson: 31 },
  { term: 'Context Engineering', definition: 'Managing what information enters the LLM context window: retrieval, compaction, resets, static vs dynamic context. Critical for production agents.', category: 'Core', relatedLesson: 31 },
  { term: 'Trajectory Evaluation', definition: 'Testing an agent\'s full multi-step path (tools called, order, outcomes) rather than just the final output.', category: 'Production', relatedLesson: 31 },
]
