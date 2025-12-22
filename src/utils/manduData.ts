interface ManduQuestion {
  q: string
  a1: string
  a2: string
}

export const studentQuestions: ManduQuestion[] = [
  { q: "나의 기상 스타일은?", a1: "조금 더 자고 싶어", a2: "여유롭게 하루를 시작해" },
  { q: "아침에 나를 깨우는 건?", a1: "마감/과제/출석", a2: "나만의 루틴" },
  { q: "수업(또는 일정) 스타일", a1: "필요한 것만 딱", a2: "꼼꼼하게 챙겨" },
  { q: "친구/동기 관계", a1: "적당한 거리감", a2: "자주 만나고 싶어" },
  { q: "갑자기 일정이 바뀌면?", a1: "당황… 계획 다시", a2: "오히려 재밌어" },
  { q: "에너지 충전 방법", a1: "밖에서 충전", a2: "혼자 조용히" },
  { q: "집(기숙사) 들어가면", a1: "나만의 시간", a2: "가족/룸메와 수다" },
  { q: "수면 스타일", a1: "잠들기 어려워", a2: "누우면 바로 잠들어" },
  { q: "주말 계획은?", a1: "자기계발/아르바이트", a2: "푹 쉬기" },
  { q: "놀이공원/귀신의 집", a1: "전혀 안 무서워", a2: "너무 무서워" },
]

export const workerQuestions: ManduQuestion[] = [
  { q: '출근 준비, 나는?', a1: '최대한 빠르게 준비', a2: '루틴대로 여유롭게' },
  { q: '업무 시작 텐션은?', a1: '조용히 집중 모드', a2: '가볍게 대화하며 워밍업' },
  { q: '점심 선택', a1: '늘 먹던 안정픽', a2: '새로운 메뉴 도전' },
  { q: '회의/미팅이 잡히면', a1: '완벽하게 준비해야 해', a2: '핵심만 챙기면 돼' },
  { q: '갑자기 일이 몰리면', a1: '일단 밀어붙여', a2: '우선순위부터 정리' },
  { q: '퇴근 후 나는?', a1: '밖에서 에너지 충전', a2: '집으로 직행' },
  { q: '저녁 시간', a1: '사람들과 약속', a2: '혼자 쉬는 시간이 필요' },
  { q: '오늘 하루 정리', a1: '내일 계획까지 세워', a2: '오늘은 오늘로 끝' },
  { q: '수면 스타일', a1: '잠들기 어려워', a2: '누우면 바로 잠들어' },
  { q: '주말 계획은?', a1: '자기계발/부업', a2: '푹 쉬기' },
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

export function calculateManduType(answers: string[], questions: ManduQuestion[]): ManduType {
  // 간단한 로직: 답변 패턴 기반
  const score = answers.reduce((acc, answer, index) => {
    return acc + (answer === questions[index]?.a1 ? 1 : 0)
  }, 0)

  if (score >= 8) return 'creative'
  if (score >= 6) return 'social'
  if (score >= 4) return 'reliable'
  return 'calm'
}
