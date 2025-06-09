const Person = ({ person, deleteHandler }) => (
    <p>{person.name} {person.number} <button onClick={deleteHandler}>delete</button></p>
)

export default Person
