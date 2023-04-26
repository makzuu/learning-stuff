import { useState } from 'react'

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h2>give feedback</h2>
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>

            <h2>statistics</h2>
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
            />
        </div>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    let average = 0
    let positive = 0

    if (all !== 0) {
        average = (good - bad) / all
        positive = good * 100 / all
    }

    return (
        <>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {all}</p>
            <p>average {average}</p>
            <p>positive {positive}%</p>
        </>
    )
}

export default App;
