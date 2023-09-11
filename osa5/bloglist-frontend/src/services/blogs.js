import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  config = {headers: { Authorization: token }}
}

const getAll = async () => {
  const request = axios.get(baseUrl, config)
  const response = await request
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (id) => {
  const request = axios.delete(`${ baseUrl }/${id}`, config)
  const response = await request
  return response.data
}

const update = async (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject, config)
  const response = await request
  return response.data
}

export default { getAll, create, update, remove, setToken }