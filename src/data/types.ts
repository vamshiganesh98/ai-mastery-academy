export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface KeyConcept {
  title: string
  description: string
  analogy?: string
}

export interface CodeExample {
  title: string
  language: string
  code: string
  explanation: string
}

export interface Resource {
  title: string
  url: string
  type: 'article' | 'video' | 'docs' | 'tool'
}

export interface SyllabusUpdate {
  id: string
  date: string
  title: string
  summary: string
  type: 'new-lesson' | 'lesson-update' | 'industry-news' | 'resource' | 'morning-brief'
  affectedLessons?: number[]
  highlights: string[]
  sources: { title: string; url: string }[]
  teacherNote: string
}

export interface Lesson {
  day: number
  title: string
  subtitle: string
  week: number
  weekTitle: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  isProject: boolean
  image: string
  videoId: string
  videoTitle: string
  description: string
  objectives: string[]
  keyConcepts: KeyConcept[]
  deepDive: string
  codeExamples?: CodeExample[]
  quiz: QuizQuestion[]
  resources: Resource[]
  proTips: string[]
  commonMistakes: string[]
}

export interface WeekInfo {
  week: number
  title: string
  subtitle: string
  color: string
  icon: string
}

export const weeks: WeekInfo[] = [
  { week: 1, title: 'Foundations', subtitle: 'What AI Actually Is', color: 'from-indigo-500 to-violet-600', icon: '🧠' },
  { week: 2, title: 'Building with LLMs', subtitle: 'Practical AI Applications', color: 'from-violet-500 to-purple-600', icon: '⚡' },
  { week: 3, title: 'Agents', subtitle: 'Autonomous AI Systems', color: 'from-cyan-500 to-blue-600', icon: '🤖' },
  { week: 4, title: 'Production & Mastery', subtitle: 'Ship Like a Pro', color: 'from-emerald-500 to-teal-600', icon: '🚀' },
  { week: 5, title: 'Living Syllabus', subtitle: 'Updated as the field evolves', color: 'from-rose-500 to-orange-600', icon: '📡' },
]

export const skills = [
  { name: 'LLM Fundamentals', category: 'Core' },
  { name: 'Prompt Engineering', category: 'Core' },
  { name: 'Context Engineering', category: 'Core' },
  { name: 'RAG Pipelines', category: 'Building' },
  { name: 'Vector Databases', category: 'Building' },
  { name: 'Function Calling', category: 'Agents' },
  { name: 'Agent Architecture', category: 'Agents' },
  { name: 'Harness Engineering', category: 'Agents' },
  { name: 'Loop Engineering', category: 'Agents' },
  { name: 'LangChain / LangGraph', category: 'Frameworks' },
  { name: 'MCP Protocol', category: 'Frameworks' },
  { name: 'Evaluation & Testing', category: 'Production' },
  { name: 'Deployment', category: 'Production' },
  { name: 'Fine-tuning', category: 'Advanced' },
  { name: 'Multimodal AI', category: 'Advanced' },
]
