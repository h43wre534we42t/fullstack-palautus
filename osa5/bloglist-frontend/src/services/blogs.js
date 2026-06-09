import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async ( newObject, blogId ) => {
  const response = await axios.put(baseUrl+'/'+blogId, newObject)
  return response.data
}

const remove = async ( blogId ) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(baseUrl+'/'+blogId, config)
}

export default { getAll, setToken, create, like, remove }