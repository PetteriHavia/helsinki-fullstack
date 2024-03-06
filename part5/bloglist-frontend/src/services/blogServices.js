import axios from 'axios'
//const baseUrl = '/api/blogs'
const baseUrl = 'http://localhost:3003/api/blogs'
const userUrl = 'http://localhost:3003/api/users'
const loginUrl = 'http://localhost:3003/api/login'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getUser = async () => {
  const response = await axios.get(userUrl)
  return response.data
}

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}

const updateLike = async (id, like) => {
  const response = await axios.put(`${baseUrl}/${id}`, { likes: like })
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, login, setToken, create, getUser, updateLike, deleteBlog }