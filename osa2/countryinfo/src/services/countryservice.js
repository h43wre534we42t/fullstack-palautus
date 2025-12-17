import axios from 'axios'

const getAll = (event) => {
    return axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
}

const getCountry = (name) => {
    return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
}

export default {getAll, getCountry}