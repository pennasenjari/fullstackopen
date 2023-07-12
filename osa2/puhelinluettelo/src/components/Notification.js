import React from 'react'

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  const noteStyle = {
    color: 'green',
    background: 'lightgrey',
    fontStyle: 'italic',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontStyle: 'italic',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  let style = noteStyle
  if (messageType === 'error') style = errorStyle

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification