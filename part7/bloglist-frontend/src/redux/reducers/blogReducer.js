import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../../services/blogServices'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setData: (state, action) => {
      return action.payload
    },
    createNewBlog: (state, action) => {
      return [...state, action.payload]
    },
    deleteBlog: (state, action) => {
      return state.filter(blog => blog.id !== action.payload)
    },
    like: (state, action) => {
      const updatedBlog = action.payload
      return state.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    },
    addComment: (state, action) => {
      return [...state, action.payload]
    }
  }
})

export const { setData, createNewBlog, deleteBlog, like, addComment } = blogSlice.actions
export default blogSlice.reducer

export const initializeData = () => {
  return async dispatch => {
    const getData = await blogServices.getAll()
    dispatch(setData(getData))
  }
}