import Calls from "../services/Calls";

const Persons = ({ person, setPersons, handleSetMessage }) => {

  const handleDeletePerson = () => {
    if (confirm(`Do you want to delete person ${person.name}`)) {
      Calls.deletePerson(person.id)
        .then(() => {
          setPersons((previousState) =>
            previousState.filter((p) => p.id !== person.id)
          );
          handleSetMessage(`${person.name} was removed`)
        })
        .catch((error) => {
          console.log("Error deleting person:", error);
          handleSetMessage(`Information of ${person.name} has already been removed from server`);
        });
    } else {
      handleSetMessage(`Deletion of ${person.name} was canceled by the user.`);
    }
  };

  return (
    <div>
      <p>
        {person.name} {person.number}
      </p>
      <button onClick={handleDeletePerson}>Delete</button>
    </div>
  );
};

export default Persons;
