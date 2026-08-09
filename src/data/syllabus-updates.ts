import type { SyllabusUpdate } from './types'
import manualUpdates from './updates/manual.json'
import autoUpdates from './updates/auto.json'

function sortByDateDesc(updates: SyllabusUpdate[]): SyllabusUpdate[] {
  return [...updates].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
}

export const syllabusUpdates: SyllabusUpdate[] = sortByDateDesc([
  ...(autoUpdates as SyllabusUpdate[]),
  ...(manualUpdates as SyllabusUpdate[]),
])

export const latestUpdate = syllabusUpdates[0] ?? null
