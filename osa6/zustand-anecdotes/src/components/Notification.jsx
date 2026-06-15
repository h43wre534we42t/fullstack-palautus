import { useNotification } from '../notificationStore'

const Notification = () => {
  const notification = useNotification()
  if (notification === '') return (<div></div>)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  console.log(useNotification)
  return <div style={style}>{notification}</div>
}

export default Notification