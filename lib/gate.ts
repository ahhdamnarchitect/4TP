/** Minimum "Yes" answers required to pass the gate (out of 4). */
export const ACCESS_MIN_YES = 3

export type Pillar = 'Education' | 'Inspiration' | 'Discipline' | 'Innovation'

export type GateQuestion = {
  pillar: Pillar
  text: string
  choices?: readonly { label: string; yes: boolean }[]
}

export const GATE_QUESTIONS: readonly GateQuestion[] = [
  {
    pillar: 'Education',
    text: 'Are you someone who likes to inspire and push boundaries?',
  },
  {
    pillar: 'Inspiration',
    text: 'Are you curious, do you like challenging perspectives?',
  },
  {
    pillar: 'Discipline',
    text: 'Are you someone who writes your ideas or goals down?',
  },
  {
    pillar: 'Innovation',
    text: 'If you had all the knowledge in the world, would you keep it or share it?',
    choices: [
      { label: 'Keep It', yes: false },
      { label: 'Share It', yes: true },
    ] as const,
  },
] as const

export function countYes(answers: boolean[]): number {
  return answers.filter(Boolean).length
}

export function isAccessGranted(answers: boolean[]): boolean {
  return countYes(answers) >= ACCESS_MIN_YES
}
