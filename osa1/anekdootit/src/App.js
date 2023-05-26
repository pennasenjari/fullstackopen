import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  // Init an empty array for points according the amount of anecdotes 
  const arr = Array(anecdotes.length).fill(0)
  const [points, setPoints] = useState(arr)
  const [mostVoted, setMostVoted] = useState(null)

  const randomize = (min, max, selected = null) => {
    // Randomize an integer between and including min and max values
    let rnd = Math.round((Math.random() * (max - min) + min))
    // If selected number exists, require a "fresh" number
    if (selected) {
      while (rnd === selected) {
        rnd = Math.round((Math.random() * (max - min) + min))
      }
    }
    return rnd
  }

  const nextAnecdote = () => {
    const min = 0 // Positions in a table start from 0
    const max = anecdotes.length - 1
    const newNumber = randomize(min, max, selected)
    setSelected(newNumber)
  }

  const vote = () => {
    const newPoints = [ ...points ]
    newPoints[selected] = points[selected] + 1
    setPoints(newPoints)
    let idx = 0
    let max = 0
    newPoints.forEach((point, index) => {
      if (point > max) {
        max = point
        idx = index
      }
    })
    setMostVoted(idx)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p style={{minHeight: '4em'}}>
        {anecdotes[selected]}<br />
        <span style={{fontStyle: 'italic'}}>Has {points[selected]} votes</span><br />
      </p>
      <Button handleClick={() => vote()} text="Vote" />
      <Button handleClick={() => nextAnecdote()} text="Next anecdote" />
      <div>
        <h1>Anecdote with most votes</h1>
        {mostVoted !== null ? 
          <div>{anecdotes[mostVoted]}<br />
          <span style={{fontStyle: 'italic'}}>Has {points[mostVoted]} votes</span></div>
        : <span style={{fontStyle: 'italic'}}>No votes yet</span>}  
      </div>
    </div>
  )
}

export default App