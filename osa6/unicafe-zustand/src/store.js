import { create } from 'zustand'

const useFeedbackStore = create(set => ({
  good: 0,
  neutral: 0,
  bad: 0,

  actions: {
    rateGood: () => set(state => ({ good: state.good + 1})),
    rateNeutral: () => set(state => ({ neutral: state.neutral + 1})),
    rateBad: () => set(state => ({ bad: state.bad + 1}))
  }
}))

export const useFeedback = () => useFeedbackStore()
export const useFeedbackControls = () => useFeedbackStore(state => state.actions)