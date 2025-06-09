const Header = ({ name }) => (
    <h2>{name}</h2>
)

const Part = ({ name, exercises }) => (
    <p>{name} {exercises}</p>
)

const Total = ({ total }) => (
        <p><strong>total of {total} exercises</strong></p>
)

const Content = ({ parts }) => (
    <>
        {parts.map(part => 
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
    </>
)

const Course = ({ course }) => {
    const total = course.parts.reduce((acc, el) => acc + el.exercises, 0)

    return (
        <>
            <Header name={course.name}/>
            <Content parts={course.parts} />
            <Total total={total} />
        </>
    )
}

export default Course
