export type ManduQuizCategory = 'student' | 'worker'

export type ManduQuizStorageItem = {
  index: number
  question: string
  answer: string
}

export type ManduQuizStorage = {
  category: ManduQuizCategory
  items: ManduQuizStorageItem[]
  savedAt: string
}

export const MANDU_QUIZ_STORAGE_KEY = 'mandu_quiz'

const categoryLabel = (category: ManduQuizCategory) => (category === 'student' ? '대학생' : '직장인')

type ManduQuestionLike = { q: string }

export function buildManduQuizStorage(
  category: ManduQuizCategory,
  answers: string[],
  questions: ManduQuestionLike[]
): ManduQuizStorage {
  const items: ManduQuizStorageItem[] = []
  for (let i = 0; i < questions.length; i += 1) {
    const question = questions[i]
    const answer = answers[i]
    if (!question || !answer) continue
    items.push({ index: i + 1, question: question.q, answer })
  }

  return {
    category,
    items,
    savedAt: new Date().toISOString()
  }
}

export function saveManduQuizToStorage(quiz: ManduQuizStorage): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(MANDU_QUIZ_STORAGE_KEY, JSON.stringify(quiz))
}

export function readManduQuizFromStorage(): ManduQuizStorage | null {
  if (typeof window === 'undefined') return null

  const raw = window.localStorage.getItem(MANDU_QUIZ_STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as ManduQuizStorage
  } catch {
    return null
  }
}

export function formatManduQuizSavedAt(savedAt: string): string | null {
  const date = new Date(savedAt)
  if (Number.isNaN(date.getTime())) return null

  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const weekday = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date)

  return `${yyyy}.${mm}.${dd}(${weekday}) ${hh}:${min}`
}

export function formatManduQuizForCopy(quiz: ManduQuizStorage): string | null {
  if (!quiz?.items?.length) return null

  const lines: string[] = []
  const savedAtText = formatManduQuizSavedAt(quiz.savedAt)
  if (savedAtText) {
    lines.push(savedAtText)
  }

  lines.push(`카테고리: ${categoryLabel(quiz.category)}`)
  for (const item of quiz.items) {
    lines.push('', `Q${item.index}. ${item.question}`, item.answer)
  }

  return lines.join('\n').trim()
}

export async function copyTextToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
    return
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    textarea.style.top = '0'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
}

export async function copyManduQuizFromStorage(): Promise<boolean> {
  const quiz = readManduQuizFromStorage()
  if (!quiz) return false

  const text = formatManduQuizForCopy(quiz)
  if (!text) return false

  await copyTextToClipboard(text)
  return true
}
