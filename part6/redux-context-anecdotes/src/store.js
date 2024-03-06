import { configureStore } from '@reduxjs/toolkit'
import AnecdotesReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import messageReducer from './reducers/messageReducer'

export default configureStore({
  reducer: {
    anecdotes: AnecdotesReducer,
    filter: filterReducer,
    message: messageReducer
  }
})