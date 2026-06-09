import styled from 'styled-components'

const Wrapper = styled.section`
  padding: 1em;
  background: #41035996;
  border: 2px solid #BF4F74;
  border-radius: 3px;
`
const Message = styled.div`
  color: ${props => props.$color};
  text-align: center;
`

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  const color = notification.type === 'success' ? 'lime' : 'red'
  console.log(color)
  return (
    <Wrapper>
      <Message $color={color}>
        {notification.text}
      </Message>
    </Wrapper>
  )
}

export default Notification