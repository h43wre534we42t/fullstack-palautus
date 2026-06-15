import anecdoteService from './services/anecdotes'
import { create } from 'zustand'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.vote(id, {...anecdote, votes: anecdote.votes + 1})
      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? updated : a)
      }))
      set(state => ({
        anecdotes: state.anecdotes.toSorted((a, b) => b.votes - a.votes)
      }))
    },
    create: async (anecdote) => {
      const newAnecdote = await anecdoteService.createNew(anecdote)
      console.log(newAnecdote)
      set(state => ({anecdotes: [...state.anecdotes, newAnecdote]}))
    },
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () =>  {
      const anecdotes = await anecdoteService.getAll()
      const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)
      set(() => ({ anecdotes: sortedAnecdotes }))
    },
    removeAnecdote: async (id) => {
      await anecdoteService.remove(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  if (filter === '') return anecdotes
  return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export default useAnecdoteStore