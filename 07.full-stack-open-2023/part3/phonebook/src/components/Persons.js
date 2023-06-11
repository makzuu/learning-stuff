const Persons = ({ persons, filter, deletePerson}) => (
    <ul>
        { persons.filter(person =>
            person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
                <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)}/>
        )}
    </ul>
)

const Person = ({ person, deletePerson }) => (
    <li>{person.name} {person.number} <button onClick={deletePerson}>delete</button></li>
)

export default Persons
