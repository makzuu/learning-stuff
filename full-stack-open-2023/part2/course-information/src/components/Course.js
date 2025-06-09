// takes care of rendering the name of the course
const Header = ({ course }) => <h2>{course}</h2>

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

// renders the name and number of exercises of one part
const Part = ({ name, number }) => <p>{name} {number}</p>

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

export default Course
