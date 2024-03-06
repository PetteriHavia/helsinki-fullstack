import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (newData) => {
    const response = await axios.post(baseUrl, newData)
    return response.data
}

const getOne = async ({ id }) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}


//UPDATE FUNCTION HERE
const updateData = async (id, updatedAnecdote) => {
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return response.data
}


export default { getAll, createNew, getOne, updateData }