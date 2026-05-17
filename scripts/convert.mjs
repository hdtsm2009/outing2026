// Excel → spots.json 変換スクリプト
// 使い方: node scripts/convert.mjs
import { readFileSync, writeFileSync } from 'fs'
import { read, utils } from 'xlsx'

const EXCEL_PATH = 'G:\\マイドライブ\\作業フォルダ2025～\\Claude作業フォルダ\\Claudecode その他\\2026夏休み統合レポート\\2026夏休み親子おでかけDB.xlsx'
const OUTPUT_PATH = 'public/data/spots.json'

const wb = read(readFileSync(EXCEL_PATH))
const ws = wb.Sheets['候補マスタ']
const rows = utils.sheet_to_json(ws, { defval: null })

// ◎○△× のみ AdaptScore として保持
const toScore = (v) => {
  if (v === '◎' || v === '○' || v === '△' || v === '×' || v === '-') return v
  if (typeof v === 'string' && v.startsWith('◎')) return '◎'
  if (typeof v === 'string' && v.startsWith('○')) return '○'
  if (typeof v === 'string' && v.startsWith('△')) return '△'
  if (typeof v === 'string' && v.startsWith('×')) return '×'
  return null
}

const toNum = (v) => (typeof v === 'number' ? v : null)
const toStr = (v) => (v && String(v).trim() !== '' ? String(v).trim() : null)

// 予算文字列 → tier (1〜5)
const toCostTier = (s) => {
  if (!s) return null
  const t = String(s)
  if (t.includes('無料') || t.match(/^[1-4],[0-9]/) || t.startsWith('1,') || t.startsWith('2,') || t.startsWith('3,') || t.startsWith('4,')) return 1
  if (t.startsWith('5,') || t.match(/^[5-9],[0-9]/) || t.includes('〜9,') || t.includes('〜10,000') || t.includes('〜12,000') || t.includes('〜15,000') || t.includes('5,000') || t.includes('6,') || t.includes('7,') || t.includes('8,700') || t.includes('9,8')) return 2
  if (t.includes('14,000') || t.includes('15,000') || t.includes('17,') || t.includes('高予算') || t.includes('万円〜') || t.includes('万円')) {
    if (t.includes('1泊') || t.includes('宿泊')) return 4
    return 3
  }
  if (t.match(/\d+万/)) {
    const m = t.match(/(\d+)万/)
    const n = m ? parseInt(m[1]) : 0
    if (n >= 8) return 5
    return 4
  }
  return null
}

const COL = {
  id: 'ID',
  name: '施設・イベント名',
  category: '主カテゴリ',
  area: 'エリア',
  address: '住所',
  period: '開催期間',
  periodCertainty: '期日確度',
  type: '開催タイプ',
  officialUrl: '公式URL',
  reservationUrl: '予約URL',
  reservationStartDate: '予約開始日',
  driveMinMin: '車_最短分',
  driveMinMax: '車_最長分(お盆)',
  parking: '駐車場',
  childScore7: '7歳児適性',
  childReason7: '7歳児に刺さる理由',
  researchSuitability: '自由研究適性',
  newbornScore: '新生児可否',
  nursingRoom: '授乳・おむつ替え',
  heatMeasure: '暑さ対策',
  rainy: '雨天',
  crowdRisk: '混雑リスク',
  reservation: '予約',
  costParent2: '親子2名概算',
  costFamily: '家族(新生児含む)概算',
  stayRecommended: '宿泊適性',
  comment: 'コメント',
  aiClaude: '①Claude',
  aiGemini: '②Gemini',
  aiGpt: '③GPT',
  versionNote: '版間メモ',
  w1: 'W1(7/18-20)',
  w2: 'W2(7/21-26)',
  w3: 'W3(7/27-8/2)',
  w4: 'W4(8/3-9)',
  w5: 'W5(8/10-16)',
  w6: 'W6(8/17-23)',
  w7: 'W7(8/24-31)',
}

const spots = rows.map((r) => ({
  id: toNum(r[COL.id]),
  name: toStr(r[COL.name]),
  category: toStr(r[COL.category]),
  area: toStr(r[COL.area]),
  address: toStr(r[COL.address]),
  period: toStr(r[COL.period]),
  periodCertainty: toStr(r[COL.periodCertainty]),
  type: toStr(r[COL.type]),
  officialUrl: toStr(r[COL.officialUrl]),
  reservationUrl: toStr(r[COL.reservationUrl]),
  reservationStartDate: toStr(r[COL.reservationStartDate]),
  driveMinMin: toNum(r[COL.driveMinMin]),
  driveMinMax: toNum(r[COL.driveMinMax]),
  parking: toStr(r[COL.parking]),
  childScore7: toScore(r[COL.childScore7]),
  childReason7: toStr(r[COL.childReason7]),
  researchSuitability: toScore(r[COL.researchSuitability]),
  newbornScore: toScore(r[COL.newbornScore]),
  nursingRoom: toStr(r[COL.nursingRoom]),
  heatMeasure: toStr(r[COL.heatMeasure]),
  rainy: toStr(r[COL.rainy]),
  crowdRisk: toStr(r[COL.crowdRisk]),
  reservation: toStr(r[COL.reservation]),
  costParent2: toStr(r[COL.costParent2]),
  costFamily: toStr(r[COL.costFamily]),
  costTier: toCostTier(r[COL.costParent2]),
  stayRecommended: toStr(r[COL.stayRecommended]),
  comment: toStr(r[COL.comment]),
  aiClaude: toStr(r[COL.aiClaude]),
  aiGemini: toStr(r[COL.aiGemini]),
  aiGpt: toStr(r[COL.aiGpt]),
  versionNote: toStr(r[COL.versionNote]),
  weeks: {
    w1: toScore(r[COL.w1]),
    w2: toScore(r[COL.w2]),
    w3: toScore(r[COL.w3]),
    w4: toScore(r[COL.w4]),
    w5: toScore(r[COL.w5]),
    w6: toScore(r[COL.w6]),
    w7: toScore(r[COL.w7]),
  },
})).filter(s => s.id !== null)

writeFileSync(OUTPUT_PATH, JSON.stringify(spots, null, 2), 'utf-8')
console.log(`✓ ${spots.length}件 → ${OUTPUT_PATH}`)
console.log('開催タイプ分布:', Object.fromEntries(
  [...new Set(spots.map(s => s.type))].map(t => [t, spots.filter(s => s.type === t).length])
))
