import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  const addAnecdote = async (anecdote) => {
    const addedAnecdote = await anecdoteService.createNew(anecdote)
    setAnecdotes(anecdotes.concat(addedAnecdote))
  }

  const deleteAnecdote = async (anecdote) => {
    await anecdoteService.deleteAnecdote(anecdote)
    setAnecdotes(anecdotes.filter(a => a.id !== anecdote.id))
  }

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote
  }
}