import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  title: string
  language: string
  code: string
  explanation: string
}

export function CodeBlock({ title, language, code, explanation }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-gray-900/50">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-sm font-medium text-gray-300">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-mono uppercase">{language}</span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="font-mono text-gray-300">{code}</code>
      </pre>
      <div className="px-4 py-3 bg-indigo-500/5 border-t border-white/5">
        <p className="text-xs text-gray-400">
          <span className="text-indigo-400 font-medium">💡 </span>
          {explanation}
        </p>
      </div>
    </div>
  )
}
