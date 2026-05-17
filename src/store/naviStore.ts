import { create } from 'zustand'

export type NaviStep =
  | 'q1_newborn'
  | 'q2a_stay'
  | 'q2b_theme'
  | 'q3_obon'
  | 'q4_budget'
  | 'result'

export interface NaviAnswers {
  q1_newborn: 'yes' | 'no' | null
  q2a_stay: 'daytrip' | 'stay' | null
  q2b_theme: 'nature' | 'learn' | 'memory' | null
  q3_obon: 'w5' | 'w6later' | 'any' | null
  q4_budget: 1 | 2 | 3 | 4 | 5 | null
}

interface NaviState {
  step: NaviStep
  answers: NaviAnswers
  setAnswer: <K extends keyof NaviAnswers>(key: K, value: NaviAnswers[K]) => void
  goToStep: (step: NaviStep) => void
  reset: () => void
}

const INITIAL_ANSWERS: NaviAnswers = {
  q1_newborn: null,
  q2a_stay: null,
  q2b_theme: null,
  q3_obon: null,
  q4_budget: null,
}

export const useNaviStore = create<NaviState>((set) => ({
  step: 'q1_newborn',
  answers: { ...INITIAL_ANSWERS },
  setAnswer: (key, value) =>
    set((s) => ({ answers: { ...s.answers, [key]: value } })),
  goToStep: (step) => set({ step }),
  reset: () => set({ step: 'q1_newborn', answers: { ...INITIAL_ANSWERS } }),
}))
