import React from 'react'
import styled from 'styled-components'

const Text = styled.p`
  background: #6a050533;
  color: Red
`
const Wrapper = styled.section`
  padding: 18em;
  background: grey;
  text-align: center;
`

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <Wrapper>
            <h2>Something went wrong.¯\_(ツ)_/¯</h2>
            <Text>{this.state.error.message}</Text>
          </Wrapper>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary