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
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header name={course} />
            <Content 
                part1={part1.name} exercises1={part1.exercises}
                part2={part2.name} exercises2={part2.exercises}
                part3={part3.name} exercises3={part3.exercises}
            />
            <Total 
                exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}
            />
        </div>
    )
}

export default App;
