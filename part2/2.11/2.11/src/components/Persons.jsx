const Persons = ({ personsToShow, deletePerson }) => {
  const handleSubmit = (event, person) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(event, person.id); // Llama a la función deletePerson pasando el evento y el ID
    }
  };

  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.name}>
          <form onSubmit={(event) => handleSubmit(event, person)}>
            {person.name} {person.number}{' '}
            <button type="submit">delete</button>
          </form>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
