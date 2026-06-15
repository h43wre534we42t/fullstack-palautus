import { useAnecdoteActions } from '../store'
import { useNotificationActions } from '../notificationStore'

const AnecdoteForm = () => {
  const { create } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    create(content)
    e.target.reset()
    setNotification(`You added ${content}`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div>
            <input name="anecdote" />
          </div>
          <button type="submit">create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm