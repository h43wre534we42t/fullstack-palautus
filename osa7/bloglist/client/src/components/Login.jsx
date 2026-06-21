import Togglable from './Togglable'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button`
  background: #04ff5333;
  color: White;
  font-size: 1em;
  margin: 0em;
  padding: 0.25em 1em;
  border: 2px #04ff5333;
  border-radius: 3px;
  &:hover {
    color: lime;
  }
`

const Input = styled.input`
  margin: 0.25em;
  width: 300px;
`

const Wrapper = styled.section`
  padding: 10em;
  background: grey;
  text-align: center;
`
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #33ddb5;
`

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const login = async (event) => {
    event.preventDefault()

    handleLogin(username, password)

    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <div>
      <div></div>
      <Wrapper>
        <Title>Log in to application</Title>
        <form onSubmit={login}>
          <div>
            <label>
              username
              <Input
                type='text'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <Input
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <Button type='submit'>login</Button>
        </form>
      </Wrapper>
    </div>
  )
}

export default Login
