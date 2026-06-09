import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const Wrapper = styled.div`
  padding: 1em;
  margin-bottom: 1em;
  background: #290000;
  text-align: center;
`

const ButtonLink = styled(Link)`
  border: 2px solid #000000;
  border-radius: 3px;
  background: blue;
  color: white;
  text-decoration: none;
  padding: 1em;
  &:hover {
    color: lime;
  }
    text-align: center;
`

const Button = styled.button`
  border: 2px solid #000000;
  border-radius: 3px;
  background: blue;
  color: white;
  text-decoration: none;
  padding: 1em;
  &:hover {
    color: lime;
  }
  margin-left: 1450px;
`

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( sortedBlogs )
      console.log(blogs)
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = (user) => {
    blogService.setToken(user.token)
    setUser(user)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    setUser(null)
    setNotification({ text: 'logged out', type: 'success' })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNotification({ text: `${returnedBlog.title} added!`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
  }

  const handleLike = async (id, likedBlog) => {
    const updatedBlog = await blogService.like(likedBlog, id)

    setBlogs(blogs.map(blog =>
      blog.id === id ? updatedBlog : blog
    ))
  }

  const handleRemove = async (blogId) => {
    await blogService.remove(blogId)

    setBlogs(blogs.filter(blog => blog.id !== blogId))
  }

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <Wrapper>
        <ButtonLink style={padding} to="/">blogs</ButtonLink>
        {user !== null ? <ButtonLink style={padding} to="/create">new blog</ButtonLink> : <span style={{ color: 'grey' }}>[log in to add blogs]</span>}
        {user === null ? <ButtonLink style={padding} to="/login">login</ButtonLink> : <Button onClick={handleLogout}>logout</Button>}
      </Wrapper>
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={
          <BlogList
            user={user} handleLogout={handleLogout}
            createBlog={addBlog}
            blogs={blogs}
            handleLike={handleLike}
            handleRemove={handleRemove}
          />
        } />
        <Route path="/login" element={
          <Login
            setNotification={setNotification}
            handleLogin={handleLogin}
          />
        }/>
        <Route path="/blogs/:id" element={
          <Blog blogs={blogs} handleLike={handleLike} handleRemove={handleRemove} userid={user ? user.id : undefined}/>
        }/>
        <Route path="/create" element={
          <BlogForm
            createBlog={addBlog}
          />
        }/>
      </Routes>
    </Router>
  )
}

export default App
