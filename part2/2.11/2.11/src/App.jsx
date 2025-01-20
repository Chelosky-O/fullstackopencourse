import { useState, useEffect } from "react";
import axios from 'axios'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson  = persons.find((person) => person.name === newName)
    if (persons.some((person) => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        
        const personObject = {
          ...existingPerson,
          number: newNumber,
        };


        personService
        .update(existingPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
          setNewName("");
          setNewNumber("");
      })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(personObject));


      personService
      .create(personObject)
        .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNewName("");
        setNewNumber("");
      })

    }
  };

  const deletePerson = (event,id) => {
    event.preventDefault();
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(n => n.id === id)
    console.log("hola")
  
    personService
      .delete_id(url)
        .then(()   => {
          setPersons(persons.filter((n) => n.id !== id));
          console.log("Person deleted successfully");
      })
      .catch(error => {
        alert(
          `the note '${person.content}' was already deleted from server`
        )
        setPersons(persons.filter(n => n.id !== id))
      })
  }


  

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleSearchChange = (event) => setNewSearch(event.target.value);

  const personsToShow =
    newSearch === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newSearch.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  );
};

export default App;