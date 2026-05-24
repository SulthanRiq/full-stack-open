const Persons = ({ allPersons, handleDelete }) => {
    return (
        <>
            {allPersons.map((person, index) => (
                <div key={index}>
                    {person.name} {person.number}
                    <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
                </div>
            ))}
        </>
    )
} 

export default Persons