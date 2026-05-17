export type AdaptScore = '◎' | '○' | '△' | '×' | '-' | null
export type SpotType = '常設' | '期間限定' | '季節営業'
export type CostTier = 1 | 2 | 3 | 4 | 5

export interface Spot {
  id: number
  name: string
  category: string | null
  area: string | null
  address: string | null
  period: string | null
  periodCertainty: string | null
  type: SpotType | null
  officialUrl: string | null
  reservationUrl: string | null
  reservationStartDate: string | null
  driveMinMin: number | null
  driveMinMax: number | null
  parking: string | null
  childScore7: AdaptScore
  childReason7: string | null
  researchSuitability: AdaptScore
  newbornScore: AdaptScore
  nursingRoom: string | null
  heatMeasure: string | null
  rainy: string | null
  crowdRisk: string | null
  reservation: string | null
  costParent2: string | null
  costFamily: string | null
  costTier: CostTier | null
  stayRecommended: string | null
  comment: string | null
  aiClaude: string | null
  aiGemini: string | null
  aiGpt: string | null
  versionNote: string | null
  weeks: {
    w1: AdaptScore
    w2: AdaptScore
    w3: AdaptScore
    w4: AdaptScore
    w5: AdaptScore
    w6: AdaptScore
    w7: AdaptScore
  }
}

export type WeekKey = 'w1' | 'w2' | 'w3' | 'w4' | 'w5' | 'w6' | 'w7'

export const WEEK_LABELS: Record<WeekKey, string> = {
  w1: 'W1 (7/18-20)',
  w2: 'W2 (7/21-26)',
  w3: 'W3 (7/27-8/2)',
  w4: 'W4 (8/3-9)',
  w5: 'W5 (8/10-16)',
  w6: 'W6 (8/17-23)',
  w7: 'W7 (8/24-31)',
}

export const WEEK_KEYS: WeekKey[] = ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7']

export const CATEGORIES = [
  '水族館', '動物', '自然体験', '科学・学習', 'テーマパーク',
  '花火', 'アウトドア', '川遊び', 'デジタルアート', '体験型エンタメ',
  '農業体験', '博物館・美術館', '工場見学', '宿泊リゾート',
] as const

export const AREAS = [
  '都内', '神奈川', '千葉', '埼玉', '茨城', '栃木', '山梨', '長野', '静岡', '群馬',
] as const
