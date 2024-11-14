/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'

const StadisticsLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
    const total = props.total
    const good = props.good
    const bad = props.bad
    const neutral = props.neutral

    if(props.total === 0){
      return(
      <div>
        No feedback given
      </div>
      )
      
    }else{
      return(
        <table>
          <tbody>
            <StadisticsLine value={good} text="good"/>   
            <StadisticsLine value={neutral} text="neutral"/>
            <StadisticsLine value={bad} text="bad" />
            <StadisticsLine value={total} text="all" />
            <StadisticsLine value={(good-bad)/total} text="average"/>
            <StadisticsLine value={(good/total)*100 + " %"} text="positive"/>
          </tbody>
        </table>
      )
    }

}

const App = () => {
  // guarda los clics de cada botón en su propio estado

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [total, setTotal] = useState(0)

  const setToGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedTotal = updatedGood + neutral + bad
    setTotal(updatedTotal)
  }

  const setToNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedTotal = updatedNeutral + good + bad
    setTotal(updatedTotal)
  }

  const setToBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedTotal = updatedBad + neutral + good
    setTotal(updatedTotal)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setToGood()} text='Good'/>
      <Button handleClick={() => setToNeutral()} text='Neutral'/>
      <Button handleClick={() => setToBad()} text='Bad'/>
      <h1>Stadistics</h1>
    
      <Statistics total={total} good={good} bad={bad} neutral={neutral}/>

    </div>
  )
}

export default App