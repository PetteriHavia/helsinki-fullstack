const PersonForm = ({
    addNewPerson,
    newName,
    number,
    handleInputChange,
    setNewName,
    setNumber,
  }) => {
    return (
      <form onSubmit={addNewPerson}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(e) => handleInputChange(e, setNewName)}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={number}
            onChange={(e) => handleInputChange(e, setNumber)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  };

  export default PersonForm;