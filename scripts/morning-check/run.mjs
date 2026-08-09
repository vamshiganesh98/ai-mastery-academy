#!/usr/bin/env node
/**
 * AI Mastery Academy — Morning Syllabus Check
 * Runs automatically via GitHub Actions (daily 6 AM UTC) or manually.
 * Zero human in the loop after initial setup.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '../..')
const STATE_PATH = join(__dirname, 'state.json')
const SOURCES_PATH = join(__dirname, 'sources.json')
const AUTO_UPDATES_PATH = join(ROOT, 'src/data/updates/auto.json')
const MANUAL_UPDATES_PATH = join(ROOT, 'src/data/updates/manual.json')

const HOURS_LOOKBACK = 36
const MAX_ITEMS_PER_BRIEF = 8
const MIN_ITEMS_FOR_BRIEF = 1

// ─── Utilities ───────────────────────────────────────────────────────────────

function loadJson(path, fallback) {
  if (!existsSync(path)) return fallback
  return JSON.parse(readFileSync(path, 'utf8'))
}

function saveJson(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n')
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function stripHtml(s) {
  return (s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function extractTag(xml, tag) {
  const cdata = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, 'i')
  const plain = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i')
  const m = xml.match(cdata) || xml.match(plain)
  return m ? stripHtml(m[1]) : ''
}

function parseRss(xml, sourceName) {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) || []
  return items.map(item => {
    const title = extractTag(item, 'title')
    const link = extractTag(item, 'link') || extractTag(item, 'guid')
    const pubDate = extractTag(item, 'pubDate') || extractTag(item, 'updated') || extractTag(item, 'published')
    const description = extractTag(item, 'description') || extractTag(item, 'summary') || extractTag(item, 'content')
    const id = `rss:${Buffer.from(link || title).toString('base64url').slice(0, 32)}`
    return { id, title, url: link, pubDate, description, source: sourceName, type: 'article' }
  }).filter(i => i.title && i.url)
}

function parseAtom(xml, sourceName) {
  const entries = xml.match(/<entry[\s\S]*?<\/entry>/gi) || []
  return entries.map(entry => {
    const title = extractTag(entry, 'title')
    const linkMatch = entry.match(/<link[^>]+href="([^"]+)"/i)
    const url = linkMatch ? linkMatch[1] : extractTag(entry, 'id')
    const pubDate = extractTag(entry, 'updated') || extractTag(entry, 'published')
    const description = extractTag(entry, 'summary') || extractTag(entry, 'content')
    const id = `atom:${Buffer.from(url || title).toString('base64url').slice(0, 32)}`
    return { id, title, url, pubDate, description, source: sourceName, type: 'article' }
  }).filter(i => i.title && i.url)
}

function isRecent(dateStr) {
  if (!dateStr) return true
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return true
  const cutoff = Date.now() - HOURS_LOOKBACK * 60 * 60 * 1000
  return d.getTime() >= cutoff
}

function isRelevant(item, keywords) {
  const text = `${item.title} ${item.description}`.toLowerCase()
  return keywords.some(kw => text.includes(kw.toLowerCase()))
}

function makeId(date) {
  return `${date}-morning-auto`
}

// ─── Fetchers ────────────────────────────────────────────────────────────────

async function fetchRss(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: { 'User-Agent': 'AI-Mastery-Academy-Morning-Bot/1.0' },
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const xml = await res.text()
    const parsed = xml.includes('<feed') ? parseAtom(xml, feed.name) : parseRss(xml, feed.name)
    return parsed.slice(0, 25)
  } catch (err) {
    console.warn(`  ⚠ RSS failed [${feed.name}]: ${err.message}`)
    return []
  }
}

async function fetchGitHubReleases(repoConfig) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repoConfig.repo}/releases?per_page=5`, {
      headers: {
        'User-Agent': 'AI-Mastery-Academy-Morning-Bot/1.0',
        Accept: 'application/vnd.github+json',
      },
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const releases = await res.json()
    return releases.map(r => ({
      id: `gh:${repoConfig.repo}:${r.id}`,
      title: `${repoConfig.name}: ${r.name || r.tag_name}`,
      url: r.html_url,
      pubDate: r.published_at,
      description: stripHtml(r.body || '').slice(0, 500),
      source: repoConfig.name,
      type: 'release',
    }))
  } catch (err) {
    console.warn(`  ⚠ GitHub failed [${repoConfig.repo}]: ${err.message}`)
    return []
  }
}

// ─── AI-enhanced brief (optional OPENAI_API_KEY) ─────────────────────────────

async function enhanceWithAI(items, date) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null

  const itemList = items.map((i, n) => `${n + 1}. [${i.source}] ${i.title}\n   ${i.url}\n   ${i.description?.slice(0, 200) || ''}`).join('\n')

  const prompt = `You are the AI teacher for AI Mastery Academy. Write a morning syllabus brief based on these ${items.length} new AI industry items from today (${date}).

Items:
${itemList}

Respond with ONLY valid JSON (no markdown):
{
  "title": "Morning Brief: <concise title>",
  "summary": "<2 sentences for students>",
  "highlights": ["<bullet 1>", "<bullet 2>", ... up to 6],
  "teacherNote": "<1-2 sentences of teaching advice>",
  "affectedLessons": [<day numbers 1-31 that students should review, or empty array>]
}`

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 800,
      }),
      signal: AbortSignal.timeout(30000),
    })
    if (!res.ok) throw new Error(`OpenAI HTTP ${res.status}`)
    const data = await res.json()
    const content = data.choices?.[0]?.message?.content || ''
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')
    return JSON.parse(jsonMatch[0])
  } catch (err) {
    console.warn(`  ⚠ AI enhancement failed: ${err.message} — using template`)
    return null
  }
}

function buildTemplateBrief(items, date) {
  const topItems = items.slice(0, MAX_ITEMS_PER_BRIEF)
  return {
    title: `Morning Brief: ${topItems.length} AI Update${topItems.length > 1 ? 's' : ''} — ${date}`,
    summary: `Automated scan found ${topItems.length} relevant AI engineering update${topItems.length > 1 ? 's' : ''} in the last ${HOURS_LOOKBACK} hours. Review the highlights and linked sources to stay current.`,
    highlights: topItems.map(i => `[${i.source}] ${i.title}`),
    teacherNote: 'Stay curious, stay current. Pick one item from today\'s brief and connect it to something you\'ve already learned in the curriculum.',
    affectedLessons: inferLessons(topItems),
  }
}

function inferLessons(items) {
  const text = items.map(i => `${i.title} ${i.description}`).join(' ').toLowerCase()
  const lessons = []
  if (/mcp|model context protocol/.test(text)) lessons.push(18)
  if (/rag|retriev|embedding|vector/.test(text)) lessons.push(8, 9, 4)
  if (/agent|langgraph|react/.test(text)) lessons.push(15, 16, 31)
  if (/prompt|context engineering/.test(text)) lessons.push(5, 31)
  if (/guardrail|safety|security/.test(text)) lessons.push(19)
  if (/eval|test/.test(text)) lessons.push(12, 26)
  if (/deploy|production/.test(text)) lessons.push(22, 27)
  if (/fine.?tun/.test(text)) lessons.push(23)
  if (/multimodal|vision|whisper/.test(text)) lessons.push(24)
  return [...new Set(lessons)].slice(0, 5)
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌅 AI Mastery Academy — Morning Syllabus Check')
  console.log(`   ${new Date().toISOString()}\n`)

  const sources = loadJson(SOURCES_PATH, { rssFeeds: [], githubRepos: [], keywords: [] })
  const state = loadJson(STATE_PATH, { seenIds: [], lastRun: null, lastBriefDate: null })
  const date = today()

  // Skip if already ran today
  if (state.lastBriefDate === date && !process.env.FORCE_MORNING_CHECK) {
    console.log(`✅ Already published brief for ${date}. Set FORCE_MORNING_CHECK=1 to override.`)
    return
  }

  console.log('📡 Scanning sources...')
  const allItems = []

  for (const feed of sources.rssFeeds || []) {
    if (feed.skip) continue
    const items = await fetchRss(feed)
    console.log(`   ${feed.name}: ${items.length} items`)
    allItems.push(...items)
  }

  for (const repo of sources.githubRepos || []) {
    const items = await fetchGitHubReleases(repo)
    console.log(`   ${repo.name}: ${items.length} releases`)
    allItems.push(...items)
  }

  const seen = new Set(state.seenIds || [])
  const keywords = sources.keywords || []

  const newItems = allItems
    .filter(i => isRecent(i.pubDate))
    .filter(i => isRelevant(i, keywords))
    .filter(i => !seen.has(i.id))
    .sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0))

  console.log(`\n🔍 Found ${newItems.length} new relevant items (last ${HOURS_LOOKBACK}h)`)

  if (newItems.length < MIN_ITEMS_FOR_BRIEF) {
    console.log('ℹ️  No new items worth a brief today. Curriculum unchanged.')
    state.lastRun = new Date().toISOString()
    saveJson(STATE_PATH, state)
    return
  }

  const briefId = makeId(date)
  const aiBrief = await enhanceWithAI(newItems, date)
  const brief = aiBrief || buildTemplateBrief(newItems, date)

  const update = {
    id: briefId,
    date,
    title: brief.title,
    summary: brief.summary,
    type: 'morning-brief',
    affectedLessons: brief.affectedLessons || inferLessons(newItems),
    highlights: brief.highlights || [],
    sources: newItems.slice(0, MAX_ITEMS_PER_BRIEF).map(i => ({ title: `${i.source}: ${i.title}`, url: i.url })),
    teacherNote: brief.teacherNote || 'Review today\'s sources and connect them to your curriculum.',
  }

  // Prepend to auto.json (keep last 30 briefs)
  const autoUpdates = loadJson(AUTO_UPDATES_PATH, [])
  const filtered = autoUpdates.filter(u => u.id !== briefId)
  filtered.unshift(update)
  saveJson(AUTO_UPDATES_PATH, filtered.slice(0, 30))

  // Update state
  for (const item of newItems) seen.add(item.id)
  state.seenIds = [...seen].slice(-500)
  state.lastRun = new Date().toISOString()
  state.lastBriefDate = date
  saveJson(STATE_PATH, state)

  console.log(`\n✅ Published: "${update.title}"`)
  console.log(`   Highlights: ${update.highlights.length}`)
  console.log(`   Sources: ${update.sources.length}`)
  console.log(`   Written to: ${AUTO_UPDATES_PATH}`)
}

main().catch(err => {
  console.error('❌ Morning check failed:', err)
  process.exit(1)
})
