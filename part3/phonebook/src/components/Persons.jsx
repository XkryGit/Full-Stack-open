const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <ul>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filter.toLowerCase())) {
          return (
            <li key={person.name}>
              {person.name}: {person.number}{" "}
              <button onClick={() => handleDelete(person.id)}>Delete</button>
            </li>
          );
        } else {
          return null;
        }
      })}
    </ul>
  );
};

export default Persons;
