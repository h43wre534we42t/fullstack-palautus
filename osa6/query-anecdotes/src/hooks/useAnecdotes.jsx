import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, createNew, vote } from '../requests'
import { useNotify } from '../hooks/useNotify'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotify()
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (createdAnecdote) => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
      setNotification(`Added ${createdAnecdote.content}`)
      setTimeout(() => {
          setNotification('')
        }, 5000)
    },
    onError: () => {
      setNotification('Anecdote is too short. Must be at least 5 characters long.')
      setTimeout(() => {
          setNotification('')
        }, 5000)
    }
  })

  const voteMutation = useMutation({
    mutationFn: vote,
    onSuccess: (votedAnecdote) => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
      setNotification(`voted for '${votedAnecdote.content}'`)
      setTimeout(() => {
          setNotification('')
        }, 5000)
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate(content),
    voteAnecdote: (anecdote) => voteMutation.mutate(anecdote)
  }
}