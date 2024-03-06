import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    username: '',
    password: ''
  },
  reducers: {
    getUsername: (state, action) => {
      return { ...state, username: action.payload }
    },
    getPassword: (state, action) => {
      return { ...state, password: action.payload }
    },
    resetCredentials: (state, action) => {
      return { ...state, username: '', password: '' }
    }
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    initializeUser: (state, action) => {
      return action.payload
    },
    userLogout: (state, action) => {
      return ''
    },
  }
})


export const loginProcess = (user) => {
  return dispatch => {
    dispatch(initializeUser(user))
    dispatch(resetCredentials())
  }
}


export const { getPassword, getUsername, resetCredentials } = loginSlice.actions
export const { initializeUser, userLogout } = userSlice.actions

export const userReducer = userSlice.reducer
export const loginReducer = loginSlice.reducer