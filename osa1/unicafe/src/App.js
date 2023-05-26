import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = good + neutral + bad
  let average = 0, positive = 0
  if (all > 0) {
    average = ((good - bad) / all).toFixed(1)
    positive = (good / all * 100).toFixed(1)
  }

  return (
    <table>
      <thead>
        <tr>
          <th colSpan="2"><h1>Statistics</h1></th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Good</td><td>{good}</td></tr>
        <tr><td>Neutral</td><td>{neutral}</td></tr>
        <tr><td>Bad</td><td>{bad}</td></tr>
        <tr><td>All</td><td>{all}</td></tr>
        <tr><td>Average</td><td>{average}</td></tr>
        <tr><td>Positive</td><td>{positive} %</td></tr>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={'Good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={'Neutral'} />
      <Button handleClick={() => setBad(bad + 1)} text={'Bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App