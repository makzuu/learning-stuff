import Person from './Person'

const Persons = ({ persons, filter, handlerDelete }) => (
    <>
        {persons.filter(person => 
            person.name.toLowerCase().substring(0, filter.length) === filter.toLowerCase()).map(person => 
                <Person key={person.id} person={person} deleteHandler={() => handlerDelete(person.id, person.name)} />
            )}
    </>
)

export default Persons
