import { createSlice } from "@reduxjs/toolkit"

const messageSlice = createSlice({
  name: 'message',
  initialState: '',
  reducers: {
    renderMessage: (state, action) => {
      return action.payload
    },
    clearMessage: (state) => {
      return ''
    }
  }
})

export const displayMessage = (message, time) => {
  return dispatch => {
    dispatch(renderMessage(message))
    const seconds = time * 1000
    setTimeout(() => {
      dispatch(clearMessage())
    }, seconds)
  }
}


export const { renderMessage, clearMessage } = messageSlice.actions
export default messageSlice.reducer