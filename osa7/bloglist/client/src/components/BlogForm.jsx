import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useBlogActions } from '../stores/blogStore'

const Input = styled.input`
  margin: 0.25em;
  width: 300px;
`
const Wrapper = styled.section`
  padding: 18em;
  background: grey;
  text-align: center;
`
const Button = styled.button`
  background: #04ff5333;
  color: White;
  font-size: 1em;
  margin: 0em;
  padding: 0.25em 1em;
  border: 2px #04ff5333;
  border-radius: 3px;
`

const BlogForm = () => {
  const { createBlog } = useBlogActions()
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const navigate = useNavigate()

  const addBlog = (event) => {
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    event.preventDefault()
    createBlog(blogObject)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    navigate('/')
  }
  return (
    <Wrapper>
      <form onSubmit={addBlog}>
        <h2>create a new blog</h2>
        <Input
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
          placeholder='Author'
        />
        <div>
          <Input
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder='Title'
          />
        </div>
        <div>
          <Input
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder='URL'
          />
        </div>
        <Button type='submit'>save</Button>
      </form>
    </Wrapper>
  )
}

export default BlogForm
