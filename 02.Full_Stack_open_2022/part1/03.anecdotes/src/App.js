import { useState } from 'react'

const Title = ({title}) => <h1>{title}</h1>

const Anecdote = ({text, br}) => 
{
    if (br) return <>{text}<br /></>
    return <>{text}</>
}

const Votes = ({value, br}) => {
    if (br) return <>has {value} votes<br /></>
    return <>has {value} votes</>
}

const Section = ({title, anecdote, votes}) => (
    <>
        <Title title={title} />
        <Anecdote text={anecdote} br={true} />
        <Votes value={votes} br={true} />
    </>
)


const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    const randomAnecdote = () => {
        const index = Math.floor(Math.random() * anecdotes.length)
        setSelected(index)
    }

    const vote = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
    }

    const mostVotesIndex = votes.indexOf(Math.max(...votes))

    return (
        <div>
            <Section title='Anecdote of the day'
                anecdote={anecdotes[selected]}
                votes={votes[selected]} />

            <Button onClick={vote} text='vote' />
            <Button onClick={randomAnecdote} text='next anecdote' />
            
            <Section title='Anecdote with most votes' 
                anecdote={anecdotes[mostVotesIndex]}
                votes={votes[mostVotesIndex]} />
        </div>
    )
}

export default App;
