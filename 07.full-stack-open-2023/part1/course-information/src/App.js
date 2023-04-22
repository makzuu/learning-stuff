// takes care of rendering the name of the course
const Header = props => <h1>{props.course}</h1>

// renders the name and number of exercises of one part
const Part = props => <p>{props.name} {props.number}</p>

// renders the parts and their number of exercises
const Content = props => (
    <>
        <Part name={props.parts[0].name} number={props.parts[0].exercises} />
        <Part name={props.parts[1].name} number={props.parts[1].exercises} />
        <Part name={props.parts[2].name} number={props.parts[2].exercises} />
    </>
)

// renders the total number of exercises
const Total = props => {
    const total = props.parts.reduce((total, part) => total + part.exercises, 0)
    return <p>Number of exercises {total}</p>
}

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

export default App;
