import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'
import { useNotify } from './hooks/useNotify'

const App = () => {
  const { anecdotes, isPending, isError, voteAnecdote } = useAnecdotes()
  const { notification } = useNotify()
  const handleVote = (anecdote) => {
    event.preventDefault()
    voteAnecdote(anecdote)
  }

  if (isPending) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <span>errors with server</span>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification message={notification}/>
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App