import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import PersonsServices from "./services/PersonsServices";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    PersonsServices.getAll().then((response) => {
      setPersons(response);
      console.log(response);
    });
  }, []);

  const [filter, setFilter] = useState("");

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState(null);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handlenewName = (event) => {
    setNewName(event.target.value);
  };

  const handlenewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this person?")) {
      PersonsServices.deletePerson(id)
        .then((response) => {
          if (response.status === 204) {
            setPersons(persons.filter((person) => person.id !== id));
            setNotification([true, `Note deleted successfully`]);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          }
        })
        .catch(() => {
          setNotification([false, `Information can't be removed from server`]);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
  };

  const newPerson = (event) => {
    event.preventDefault();

    PersonsServices.create({ name: newName, number: newNumber }).then(
      (response) => {
        if (response.status === 200) {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          setNotification([true, `Note '${newName}' was added`]);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        } else {
          setNotification([false, `Failed to add ${newName}`]);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        }
      }
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />

      <Filter filter={filter} handleFilter={handleFilter} />

      <h3>Add a new</h3>

      <PersonForm
        newPerson={newPerson}
        newName={newName}
        newNumber={newNumber}
        handlenewName={handlenewName}
        handlenewNumber={handlenewNumber}
      />

      <h3>Numbers</h3>

      <Persons filter={filter} persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
