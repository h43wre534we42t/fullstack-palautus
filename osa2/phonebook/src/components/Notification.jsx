const Notification = ({ message }) => {
  const [text, color] = message
  if (text === null) {
    return null
  }
  
const notificationStyle = {
  color: color,
  background: 'lightgrey',
  font_size: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px'

}

  return (
    <div style={notificationStyle}>
      {text}
    </div>
  )
}

export default Notification