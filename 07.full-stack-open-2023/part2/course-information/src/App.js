// takes care of rendering the name of the course
const Header = ({ course }) => <h2>{course}</h2>

// renders the name and number of exercises of one part
const Part = ({ name, number }) => <p>{name} {number}</p>

// renders the parts and their number of exercises
const Content = ({ parts }) => (
    <>
        {parts.map(part => <Part 
            key={part.id}
            name={part.name} 
            number={part.exercises} />
        )}
    </>
)

// renders the total number of exercises
const Total = ({ parts }) => {
    const total = parts.reduce((total, part) => total + part.exercises, 0)
    return <p><b>total of {total} exercises</b></p>
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        }, 
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => <Course key={course.id} course={course} />)}
        </div>
    )
}

export default App
