interface ManduQuestion {
  q: string
  a1?: string
  a2?: string
}

export const studentQuestions: ManduQuestion[] = [
  {
    q: '나는 꿈꿀 만두인가요?',
    a1: '이미 속이 꽉 찼다',
    a2: '아직 속 재료 고르는 중'
  },
  {
    q: '지금 전공(혹은 준비 중인 진로), 내 만두 속재료로 괜찮을까?',
    a1: '잘 어울린다, 찰떡',
    a2: '뭔가 안 어울려, 또륵'
  },
  {
    q: '나의 만두에 가장 넣고 싶은 재료는?',
    a1: '현실 재료 (돈, 안정, 커리어)',
    a2: '마음 재료 (내가 하고 싶은 것)'
  },
  {
    q: '꿈 만두를 위해 주방에 있는 시간은?',
    a1: '주 2회 이상, 열심히 빚는 중',
    a2: '주 2회 미만, 생각만 굴리는 중'
  },
  {
    q: '만두 속을 채우는 과정, 솔직히…',
    a1: '쉽지 않다, 자꾸 터진다',
    a2: '어렵지만 손에 익어간다'
  },
  {
    q: '만두를 채워가는 과정에서 나를 힘들게 하는 것은 무엇인가요?',
    a1: '확신 부족',
    a2: '인간관계'
  },
  {
    q: '만약 주변에서 “그 재료 말고 다른 거 넣어”라고 한다면?',
    a1: '그래도 내 레시피로 간다',
    a2: '고민하다 레시피 바꿀 수도'
  },
  {
    q: '나는 나의 만두를 위해',
    a1: '미래에 투자한다(주식)',
    a2: '현재에 투자한다(옷, 취미, 학원)'
  },
  {
    q: '내 꿈 만두 레시피, 주변 사람들도 알고 있나?',
    a1: '다들 안다',
    a2: '나만 알고 있다'
  },
  {
    q: '만두를 빚어가는 지금, 나의 마음은 어떤 상태인가요?'
  }
]

export const workerQuestions: ManduQuestion[] = [
  {
    q: '나는 꿈꿀 만두인가요?',
    a1: '이미 속이 꽉 찼다',
    a2: '아직 부족해, 더 채워야 해'
  },
  {
    q: '지금 하고 있는 일은 나의 만두 재료와 어울리나요?',
    a1: '꽤 잘 어울린다',
    a2: '다른 재료 같기도 하다'
  },
  {
    q: '나의 만두에 가장 넣고 싶은 재료는?',
    a1: '현실 재료 (돈, 안정, 커리어)',
    a2: '마음 재료 (내가 하고 싶은 것)'
  },
  {
    q: '나의 만두를 위해 나에게 쓰는 시간은?',
    a1: '주 2회 이상, 꾸준히',
    a2: '주 2회 미만, 여유가 없다'
  },
  {
    q: '만두 속을 채워 가는 과정은…',
    a1: '여전히 쉽지 않다',
    a2: '조금씩 손에 익어간다'
  },
  {
    q: '만두를 채워가는 과정에서 나를 힘들게 하는 것은 무엇인가요?',
    a1: '확신 부족',
    a2: '인간관계'
  },
  {
    q: '만약 주변에서 “그 재료 말고 다른 거 넣어”라고 한다면?',
    a1: '어쩔 만두, 나는 내 길을 간다',
    a2: '음... 애매하긴 해'
  },
  {
    q: '나는 나의 만두를 위해',
    a1: '미래에 투자 한다(주식)',
    a2: '현재에 투자한다(옷, 취미, 학원)'
  },
  {
    q: '나의 만두 레시피를 주변에서도 알고 있나?',
    a1: '알고 있다',
    a2: '비밀이야, 나 혼자만'
  },
  {
    q: '만두를 빚어가는 지금, 나의 마음은 어떤 상태인가요?'
  }
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
    const question = questions[index]
    if (!answer) return acc
    if (!question?.a1 || !question?.a2) return acc
    return acc + (answer === question.a1 ? 1 : 0)
  }, 0)

  if (score >= 8) return 'creative'
  if (score >= 6) return 'social'
  if (score >= 4) return 'reliable'
  return 'calm'
}
