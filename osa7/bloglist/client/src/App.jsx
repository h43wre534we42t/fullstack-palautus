import { useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import ErrorBoundary from './components/ErrorBoundary'
import { useNotificationActions } from './stores/notificationStore'
import { useBlogActions } from './stores/blogStore'
import { useUser, useUserActions } from './stores/userStore'
import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

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
  const { initializeUser, handleLogout, handleLogin } = useUserActions()
  const user = useUser()
  const { setNotification } = useNotificationActions()
  const { initialize } = useBlogActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  const padding = {
    padding: 5,
  }

  return (
    <Router>
      <Wrapper>
        <ButtonLink style={padding} to='/'>
          blogs
        </ButtonLink>
        {user !== null ? (
          <ButtonLink style={padding} to='/create'>
            new blog
          </ButtonLink>
        ) : (
          <span style={{ color: 'grey' }}>[log in to add blogs]</span>
        )}
        {user === null ? (
          <ButtonLink style={padding} to='/login'>
            login
          </ButtonLink>
        ) : (
          <Button onClick={handleLogout}>logout</Button>
        )}
      </Wrapper>
      <ErrorBoundary>
        <Notification />
        <Routes>
          <Route path='/' element={<BlogList />} />
          <Route
            path='/login'
            element={
              <Login
                setNotification={setNotification}
                handleLogin={handleLogin}
              />
            }
          />
          <Route path='/blogs/:id' element={<Blog />} />
          <Route path='/create' element={<BlogForm />} />
          <Route path='*' element={<h3>404 - Page not found</h3>} />
        </Routes>
      </ErrorBoundary>
    </Router>
  )
}

export default App
