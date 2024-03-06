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

const getSingleBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getUsers = async () => {
  const response = await axios.get(userUrl)
  return response.data
}

const getUser = async (id) => {
  const response = await axios.get(`${userUrl}/${id}`)
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

const addComment = async (id, comment) => {
  const response = await axios.put(`${baseUrl}/${id}/comments`, { comment: comment })
  return response.data
}

export default { getAll, login, setToken, create, getUsers, updateLike, deleteBlog, getUser, getSingleBlog, addComment }