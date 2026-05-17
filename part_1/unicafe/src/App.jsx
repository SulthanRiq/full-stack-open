import { useState } from "react";

const Header = () => {
  return (
    <div>
      <h1>give feedback</h1>
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
      <button onClick={onClick}>
        {text}
      </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>{text}</td>
            <td>{value}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

const Statistics = (props) => {
  return (
    <>
      <StatisticLine text={"good"} value={props.good} />
      <StatisticLine text={"neutral"} value={props.neutral} />
      <StatisticLine text={"bad"} value={props.bad} />
      <StatisticLine text={"all"} value={props.total} />
      <StatisticLine text={"average"} value={props.average} />
      <StatisticLine text={"positive"} value={props.positive} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodValue = () => setGood(good + 1)
  const setNeutralValue = () => setNeutral(neutral + 1)
  const setBadValue = () => setBad(bad + 1)
  
  const total = good + neutral + bad
  const average = (good - bad) / (good + neutral + bad) || 0
  const positive = good / (good + neutral + bad) * 100 + " %"

  return (
    <>
      <Header />
      <Button onClick={setGoodValue} text='good' />
      <Button onClick={setNeutralValue} text='neutral' />
      <Button onClick={setBadValue} text='bad' />
      <h2>statistics</h2>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
        </>
      )}
    </>
  )
}

export default App