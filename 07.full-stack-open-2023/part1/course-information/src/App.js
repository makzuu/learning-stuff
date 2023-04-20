// takes care of rendering the name of the course
const Header = props => <h1>{props.name}</h1>

// renders the name and number of exercises of one part
const Part = props => <p>{props.name} {props.number}</p>

// renders the parts and their number of exercises
const Content = props => (
    <>
        <Part name={props.part1} number={props.exercises1} />
        <Part name={props.part2} number={props.exercises2} />
        <Part name={props.part3} number={props.exercises3} />
    </>
)

// renders the total number of exercises
const Total = props => {
    const total = props.exercises1 + props.exercises2 + props.exercises3
    return <p>Number of exercises {total}</p>
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header name={course} />
            <Content 
                part1={part1} exercises1={exercises1}
                part2={part2} exercises2={exercises2}
                part3={part3} exercises3={exercises3}
            />
            <Total 
                exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}
            />
        </div>
    )
}

export default App;
