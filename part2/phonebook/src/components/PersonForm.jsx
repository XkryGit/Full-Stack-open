const PersonForm = ({
  newPerson,
  newName,
  newNumber,
  handlenewName,
  handlenewNumber,
}) => {
  return (
    <form onSubmit={newPerson}>
      <div>
        Name: <input value={newName} onChange={handlenewName} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handlenewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
