import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'
import { useAnecdotes } from '../hooks/useAnecdotes'

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes()
  const content = useField()
  const author = useField()
  const info = useField()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ content: content.value, author: author.value, info: info.value, votes: 0 })
    navigate('/')
  }
  
  const handleReset = (e) => {
    e.preventDefault()
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
