import { useEffect, useState } from "react";
import Calls from "./services/Calls";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/FIlter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    Calls.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  //ADD NEW PERSON
  const addNewPerson = (e) => {

    e.preventDefault();

    const newContact = {
      name: newName,
      number: number,
    };

    const existingPerson = persons.find((item) => item.name === newContact.name);

    if (existingPerson) {
      if (confirm(`${newContact.name} is already added to the phonebook, replace the old number with a new one?`)) {
        Calls.updatePerson(existingPerson.id, newContact)
          .then((updatedPerson) => {
            setPersons((previousState) => previousState.map((p) => (p.id === updatedPerson.id ? updatedPerson : p)));
            handleSetMessage(`${existingPerson.name} was updated`)
            handleEmptyFields();
          })
          .catch((error) => {
            handleSetMessage(error.response.data.error)
          })
      }
    } else {
      Calls.addNew(newContact)
        .then((person) => {
          setPersons([...persons, person]);
          handleSetMessage(`Added ${newContact.name}`);
          handleEmptyFields();
        })
        .catch((error) => {
          handleSetMessage(error.response.data.error)
        })
    }
    setNewName("");
    setNumber("");
  };

  const handleSetMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleEmptyFields = () => {
    setNewName("");
    setNumber("");
  }

  const filterPhonebook = (e) => {
    setFilterName(e.target.value);
  };

  const searchPerson = persons.filter(
    (person) => person.name && person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      {message ? <p>{message}</p> : null}
      <Filter filterPhonebook={filterPhonebook} />
      <h2>Add a new</h2>
      <PersonForm
        addNewPerson={addNewPerson}
        handleInputChange={handleInputChange}
        newName={newName}
        number={number}
        setNewName={setNewName}
        setNumber={setNumber}
      />
      <h2>Numbers</h2>
      {searchPerson.map((item) => (
        <Persons
          key={item.id}
          person={item}
          setPersons={setPersons}
          setMessage={setMessage}
          handleSetMessage={handleSetMessage}
        />
      ))}
    </div>
  );
};

export default App;
