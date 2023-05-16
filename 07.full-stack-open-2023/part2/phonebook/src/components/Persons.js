const Persons = ({ persons, filter}) => (
    <ul>
        { persons.filter(person =>
            person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
                <Person key={person.id} person={person} />
        )}
    </ul>
)

const Person = ({ person }) => (
    <li>{person.name} {person.number}</li>
)

export default Persons
