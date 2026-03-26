/** Minimum "Yes" answers required to pass the gate (out of 4). */
export const ACCESS_MIN_YES = 3

export type Pillar = 'Education' | 'Inspiration' | 'Discipline' | 'Innovation'

export type GateQuestion = {
  pillar: Pillar
  text: string
}

export const GATE_QUESTIONS: readonly GateQuestion[] = [
  {
    pillar: 'Education',
    text: 'Do you invest in learning and growth — for yourself and others?',
  },
  {
    pillar: 'Inspiration',
    text: 'Do you aim to inspire and elevate the people around you?',
  },
  {
    pillar: 'Discipline',
    text: 'Do you show up with discipline when it matters?',
  },
  {
    pillar: 'Innovation',
    text: 'Do you lean forward — open to new ideas and better ways?',
  },
] as const

export function countYes(answers: boolean[]): number {
  return answers.filter(Boolean).length
}

export function isAccessGranted(answers: boolean[]): boolean {
  return countYes(answers) >= ACCESS_MIN_YES
}
