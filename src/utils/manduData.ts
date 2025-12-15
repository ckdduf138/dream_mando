interface ManduQuestion {
  q: string
  a1: string
  a2: string
}

export const manduQuestions: ManduQuestion[] = [
  { q: "나의 기상 스타일은?", a1: "조금 더 자고 싶어", a2: "여유롭게 하루를 시작해" },
  { q: "출근길 선택", a1: "회사 근처가 최고", a2: "사생활 보호가 중요해" },
  { q: "선호하는 동료 관계", a1: "업무만 집중하는 사이", a2: "일상을 나누는 친구" },
  { q: "회의 준비 스타일", a1: "완벽하게 준비해야 해", a2: "적당히 준비하면 돼" },
  { q: "스트레스 해소법", a1: "친구들과 수다떨기", a2: "전문가 상담 찾아보기" },
  { q: "퇴근 후 나는?", a1: "밖에서 에너지 충전", a2: "집으로 직행" },
  { q: "집 도착 후", a1: "혼자만의 시간", a2: "가족과 대화" },
  { q: "수면 스타일", a1: "잠들기 어려워", a2: "누우면 바로 잠들어" },
  { q: "불금, 주말 계획은?", a1: "부업이나 자기계발", a2: "푹 쉬기" },
  { q: "귀신의 집 반응", a1: "전혀 안 무서워", a2: "너무 무서워" }
]

export type ManduType = 'creative' | 'reliable' | 'social' | 'calm'

export interface ManduResult {
  type: ManduType
  title: string
  description: string
  traits: string[]
}

export const manduResults: Record<ManduType, ManduResult> = {
  creative: {
    type: 'creative',
    title: '김치만두',
    description: '새로운 것을 시도하고 도전하는 걸 좋아하는 당신',
    traits: ['창의적', '도전적', '열정적']
  },
  reliable: {
    type: 'reliable',
    title: '고기만두',
    description: '묵묵히 자신의 길을 가는 믿음직한 당신',
    traits: ['신뢰감', '책임감', '꾸준함']
  },
  social: {
    type: 'social',
    title: '새우만두',
    description: '사람들과 함께하는 것을 좋아하는 당신',
    traits: ['사교적', '친화력', '공감능력']
  },
  calm: {
    type: 'calm',
    title: '야채만두',
    description: '평온하고 균형잡힌 삶을 추구하는 당신',
    traits: ['차분함', '균형감', '안정적']
  }
}

export function calculateManduType(answers: string[]): ManduType {
  // 간단한 로직: 답변 패턴 기반
  const score = answers.reduce((acc, answer, index) => {
    return acc + (answer === manduQuestions[index].a1 ? 1 : 0)
  }, 0)

  if (score >= 8) return 'creative'
  if (score >= 6) return 'social'
  if (score >= 4) return 'reliable'
  return 'calm'
}
