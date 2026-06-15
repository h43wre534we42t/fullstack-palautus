import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    vote: vi.fn(),
    remove: vi.fn()
  }
}))

import noteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useNoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0 }]
    noteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: notesResult } = renderHook(() => useAnecdotes())
    expect(notesResult.current).toEqual(mockAnecdotes)
  })
  it('components receive the anecdotes sorted', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'least', votes: 0 },
      { id: 2, content: 'middle', votes: 1 },
      { id: 3, content: 'most', votes: 2 }
    ]
    noteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: notesResult } = renderHook(() => useAnecdotes())
    const sortedAnecdotes = [
      { id: 3, content: 'most', votes: 2 },
      { id: 2, content: 'middle', votes: 1 },
      { id: 1, content: 'least', votes: 0 },
    ]
    expect(notesResult.current).toEqual(sortedAnecdotes)
  })
  it('component receives correctly filtered lists', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'zyx', votes: 0 },
      { id: 2, content: 'abc', votes: 0 },
    ]
    noteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
      await result.current.setFilter('zyx')
    })

    const { result: notesResult } = renderHook(() => useAnecdotes())
    const filteredAnecdotes = [
      { id: 1, content: 'zyx', votes: 0 }
    ]
    expect(notesResult.current).toEqual(filteredAnecdotes)
  })
  it('voting increases the amount of votes for an anecdote', async () => {
    const mockAnecdotes = [
      { id: '1', content: 'zyx', votes: 0 },
    ]
    const votedAnecdote = { id: '1', content: 'zyx', votes: 1 }
    noteService.getAll.mockResolvedValue(mockAnecdotes)
    noteService.vote.mockResolvedValue(votedAnecdote)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
      await result.current.vote('1')
    })

    const { result: notesResult } = renderHook(() => useAnecdotes())
    expect(notesResult.current).toEqual([votedAnecdote])
  })
  })
