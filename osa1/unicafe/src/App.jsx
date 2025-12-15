import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const average = (good + bad * -1) / (good + bad + neutral)
  const positive = (good / (good + neutral + bad)) * 100
  const incrementReview = (increaseByOne, review) => {
    console.log('incremented')
    increaseByOne(review + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
      <Button onClick={() => incrementReview(setGood, good)} name ='good' />
      <Button onClick={() => incrementReview(setNeutral, neutral)} name ='neutral' />
      <Button onClick={() => incrementReview(setBad, bad)} name ='bad' />
      </div>
      <h1>statistics</h1>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} average={average} positive={positive} />
      </div>
    </div>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad, average, positive} = props
  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <div>
        No feedback Given
      </div>
    )
  }
  else {
    return (
      <table>
        <div>
          <StatisticLine name='good' amount={good} />
          <StatisticLine name='neutral' amount={neutral} />
          <StatisticLine name='bad' amount={bad} />
          <StatisticLine name='average' amount={average} />
          <StatisticLine name='positive' amount={positive} sign='%'/>
        </div>
      </table>
    )
  }
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.name}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.amount} {props.sign}</td>
    </tr>
  )
}

export default App