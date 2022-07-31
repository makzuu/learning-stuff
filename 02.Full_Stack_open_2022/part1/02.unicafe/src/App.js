import { useState } from 'react'

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>
                {text}
            </td>
            <td>
                {value}
            </td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {

    const all = good + neutral + bad

    if (all === 0) return (
        <>
            <h1>statistics</h1>
            <p>No feedback given</p>
        </>
    )
    
    return (
        <>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <StatisticLine text='good' value={good} />
                    <StatisticLine text='neutral' value={neutral} />
                    <StatisticLine text='bad' value={bad} />
                    <StatisticLine text='all' value={all} />
                    <StatisticLine text='average' value={(good + (-bad)) / all} />
                    <StatisticLine text='positive' value={(good * 100 / all) + ' %'} />
                </tbody>
            </table>
        </>
    )
}

const Button = ({onClick, text}) => {
    return <button onClick={onClick}>{text}</button>
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const GoodFeedback = () => setGood(good + 1)
    const neutralFeedback = () => setNeutral(neutral + 1)
    const badFeedback = () => setBad(bad + 1)
    

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={GoodFeedback} text='good' />
            <Button onClick={neutralFeedback} text='neutral' />
            <Button onClick={badFeedback} text='bad' />

            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App;
