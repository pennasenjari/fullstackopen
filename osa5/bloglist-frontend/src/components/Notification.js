const Notification = ({ message }) => {
  // param: [message, type]
  if (!message || message.length !== 2) {
    return null
  }

  let cName = 'notification'
  if (message[1] === 'error') cName = 'error'

  return (
    <div className={cName}>
      {message[0]}
    </div>
  )
}

export default Notification