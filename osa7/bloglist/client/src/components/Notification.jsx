import styled from 'styled-components'
import { useNotification } from '../stores/notificationStore'

const Wrapper = styled.section`
  padding: 1em;
  background: #41035996;
  border: 2px solid #bf4f74;
  border-radius: 3px;
`
const Message = styled.div`
  color: ${(props) => props.$color};
  text-align: center;
`

const Notification = () => {
  const notification = useNotification()
  if (notification === null) {
    return null
  }
  const color = notification.type === 'success' ? 'lime' : 'red'
  return (
    <Wrapper>
      <Message $color={color}>{notification.text}</Message>
    </Wrapper>
  )
}

export default Notification
