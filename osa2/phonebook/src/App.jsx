import { useState, useEffect } from 'react'
import personService from './services/people'
import Notification from './components/Notification'

const App = () => {
  const [notification, setNotification] = useState([null, 'yellow'])
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  const deletePerson = (id) => {
    personService
      .deletePerson(id)
      .then(() => setPersons(persons.filter(person => person.id !== id)))
      .catch(error => {
        setNotification([`They have already been deleted`, 'red'])
        setTimeout(() => {
            setNotification([null, 'yellow'])
          }, 5000)
      })
  }
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => { 
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.some(person => person.name === newName)) { 
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
      const personToUpdate = persons.find(person => person.name === newName)      
      const updatedPerson = {...personToUpdate, number: newNumber}
      
      personService
        .updateNumber(updatedPerson)
        .then(response => {
          setPersons(persons.map(person => person.id === response.data.id ? response.data : person))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotification([`${newName} has already been deleted`, 'red'])
          setTimeout(() => {
            setNotification([null, 'yellow'])
          }, 5000)
        })
      }
    }
    else {
      personService
        .addPerson(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNotification([`${newName} has been added`, 'green'])
          setTimeout(() => {
            setNotification([null, 'yellow'])
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new person</h2>
      <FormAddPerson addPerson={addPerson} value1={newName} onChange1={handleNameChange} value2={newNumber} onChange2={handleNumberChange}/>
      <h2>Numbers</h2>
      <ShowPeople deletePerson={deletePerson} persons={persons} filter={filter}/>
      ...
    </div>
  )
}

const FormAddPerson = ({addPerson, value1, onChange1, value2, onChange2}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={value1} onChange={onChange1} />
        </div>
        <div>
          number: <input value={value2} onChange={onChange2} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Filter = ({value, onChange}) => {
  return (
    <div>
      filter by name <input value={value} onChange={onChange} />
    </div>
  )
}

const ShowPeople = ({ persons, filter, deletePerson }) => {
  const filtered = persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
  return (
    filtered.map(person => <p key={person.name}>{person.name} {person.number} <DeleteButton deletePerson={deletePerson} id={person.id} /> </p>)
  )
}

const DeleteButton = ({deletePerson, id}) => {
  const deleteHandler = () => {
    if (window.confirm('Do you want to delete the number?')) {
      deletePerson(id)
    }
  }
  return ( 
    <button onClick={deleteHandler}>delete</button>
  )
}

export default App