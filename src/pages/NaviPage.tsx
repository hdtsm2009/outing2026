import { useNavigate } from 'react-router-dom'
import { useNaviStore } from '../store/naviStore'
import { useFilterStore } from '../store/filterStore'
import { naviAnswersToFilter, getNaviPattern, NAVI_PATTERN_LABELS } from '../utils/naviLogic'
import { NaviQuestion } from '../components/navi/NaviQuestion'
import { NaviResetButton } from '../components/navi/NaviResetButton'

export function NaviPage() {
  const { step, answers, setAnswer, goToStep } = useNaviStore()
  const applyFromNavi = useFilterStore((s) => s.applyFromNavi)
  const navigate = useNavigate()

  function handleQ1(v: 'yes' | 'no') {
    setAnswer('q1_newborn', v)
    goToStep(v === 'yes' ? 'q2a_stay' : 'q2b_theme')
  }

  function handleQ2a(v: 'daytrip' | 'stay') {
    setAnswer('q2a_stay', v)
    goToStep('q3_obon')
  }

  function handleQ2b(v: 'nature' | 'learn' | 'memory') {
    setAnswer('q2b_theme', v)
    goToStep('q3_obon')
  }

  function handleQ3(v: 'w5' | 'w6later' | 'any') {
    setAnswer('q3_obon', v)
    goToStep('q4_budget')
  }

  function handleQ4(v: 1 | 2 | 3 | 4 | 5) {
    setAnswer('q4_budget', v)
    goToStep('result')
  }

  function handleApply() {
    const partial = naviAnswersToFilter(answers)
    applyFromNavi(partial)
    navigate('/list')
  }

  const TOTAL = answers.q1_newborn === null ? 5 : 5

  return (
    <main className="max-w-md mx-auto px-4 py-8">
      {step === 'q1_newborn' && (
        <NaviQuestion
          question="新生児（0〜数ヶ月）を連れていきますか？"
          step={1} total={TOTAL}
          options={[
            { value: 'yes' as const, label: 'はい、新生児も一緒です', description: '授乳室・おむつ替え・移動距離を優先します' },
            { value: 'no' as const, label: 'いいえ、7歳児のみです', description: '7歳児が楽しめる体験を優先します' },
          ]}
          onSelect={handleQ1}
        />
      )}

      {step === 'q2a_stay' && (
        <NaviQuestion
          question="日帰りですか？宿泊ですか？"
          step={2} total={TOTAL}
          options={[
            { value: 'daytrip' as const, label: '日帰り（90分以内）', description: '授乳・休憩を考えて近場を優先' },
            { value: 'stay' as const, label: '宿泊も検討', description: '宿泊設備が整った施設・リゾートを提案' },
          ]}
          onSelect={handleQ2a}
        />
      )}

      {step === 'q2b_theme' && (
        <NaviQuestion
          question="どんな体験を優先しますか？"
          step={2} total={TOTAL}
          options={[
            { value: 'nature' as const, label: '自然・アウトドア', description: '川遊び・動物・農業体験など' },
            { value: 'learn' as const, label: '学び・自由研究', description: '科学館・JAXA・工場見学など' },
            { value: 'memory' as const, label: '非日常の思い出', description: '花火・テーマパーク・デジタルアートなど' },
          ]}
          onSelect={handleQ2b}
        />
      )}

      {step === 'q3_obon' && (
        <NaviQuestion
          question="お盆（8/10〜16）に行く予定はありますか？"
          step={3} total={TOTAL}
          options={[
            { value: 'w5' as const, label: 'お盆中に行きたい', description: 'W5（8/10〜16）が対応しているものを優先' },
            { value: 'w6later' as const, label: 'お盆明け以降', description: 'W6（8/17〜23）・W7（8/24〜31）対応' },
            { value: 'any' as const, label: '時期は未定・気にしない', description: 'すべての週を対象にします' },
          ]}
          onSelect={handleQ3}
        />
      )}

      {step === 'q4_budget' && (
        <NaviQuestion
          question="親子2名の予算感は？"
          step={4} total={TOTAL}
          options={[
            { value: 1 as const, label: '〜5,000円', description: '無料〜4,999円' },
            { value: 2 as const, label: '5,000〜15,000円', description: 'ランチ込みで1〜1.5万円' },
            { value: 3 as const, label: '15,000円〜（日帰り）', description: '少し奮発する日帰りプラン' },
            { value: 4 as const, label: '宿泊（〜10万円）', description: '家族旅行・1泊2日' },
          ]}
          onSelect={handleQ4}
        />
      )}

      {step === 'result' && (
        <div className="space-y-6">
          <div>
            <p className="text-xs text-gray-400 mb-1">完了！</p>
            <div className="w-full bg-sky-500 h-1.5 rounded-full" />
          </div>
          <div className="p-4 bg-sky-50 rounded-xl border border-sky-100">
            <p className="text-xs text-sky-500 font-medium mb-1">あなたのプラン</p>
            <p className="font-bold text-gray-900">{NAVI_PATTERN_LABELS[getNaviPattern(answers)]}</p>
          </div>
          <button
            onClick={handleApply}
            className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors"
          >
            スポット一覧を見る →
          </button>
          <div className="flex justify-center">
            <NaviResetButton />
          </div>
        </div>
      )}

      {step !== 'q1_newborn' && step !== 'result' && (
        <div className="mt-8 flex justify-center">
          <NaviResetButton />
        </div>
      )}
    </main>
  )
}
