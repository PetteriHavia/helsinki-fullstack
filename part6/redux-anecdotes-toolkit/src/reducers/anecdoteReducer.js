import { createSlice } from "@reduxjs/toolkit"
import anecdoteServices from '../components/services/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      const content = action.payload
      return [...state, content]
    },
    voteAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map((item) =>
        item.id === updatedAnecdote.id ? updatedAnecdote : item
      )
    },
    setAnecdotesState(state, action) {
      return action.payload
    }
  }
})

//Create and push new object to the existing db.json anecdote list
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

//Get all listed data from db.json
export const setAnecdotes = () => {
  return async dispatch => {
    const getData = await anecdoteServices.getAll()
    dispatch(setAnecdotesState(getData))
  }
}

export const updateVote = (anecdote) => {
  return async dispatch => {
    const { id, votes } = anecdote;
    const updateAnecdote = await anecdoteServices.updateData(id, { ...anecdote, votes: votes + 1 })
    dispatch(voteAnecdote(updateAnecdote))
  }
}

export const { appendAnecdote, voteAnecdote, setAnecdotesState } = anecdoteSlice.actions
export default anecdoteSlice.reducer