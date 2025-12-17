import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const addPerson = personObject => {
    return axios.post(baseUrl, personObject)
}

const deletePerson = personId => {
    return axios.delete(`${baseUrl}/${personId}`)
}

const updateNumber = personObject => {
    console.log(personObject)
    return axios.put(`${baseUrl}/${personObject.id}`, personObject)
}

export default {getAll, addPerson, deletePerson, updateNumber}