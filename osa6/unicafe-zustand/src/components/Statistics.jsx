import { useFeedback } from '../store'

const Statistics = () => {
  const { good, neutral, bad } = useFeedback()
  console.log(good)
  const all = good + bad + neutral
  const average = all != 0 ? (good + bad * -1) / (good + bad + neutral) : 0
  const positive = all != 0 ? (good / (good + neutral + bad)) * 100 : 0
  
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average.toFixed(1)}</td></tr>
          <tr><td>positive</td><td>{positive.toFixed(1)}%</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
