import { useAnecdotes, useAnecdoteActions } from '../store'
import { useNotificationActions } from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  
  const { vote, removeAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const onVote = (id, content) => {
    vote(id)
    setNotification('You voted for ' + content)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }
  return (
  <div>
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => onVote(anecdote.id, anecdote.content)}>vote</button>
          {anecdote.votes === 0 ? <button onClick={() => removeAnecdote(anecdote.id)}>remove</button> : null}
        </div>
      </div>
    ))}
  </div>
  )
}

export default AnecdoteList