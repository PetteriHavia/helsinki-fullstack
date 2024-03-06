import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
    name: 'message',
    initialState: '',
    reducers: {
        showMessage: (state, action) => {
            return action.payload
        },
        hideMessage: (state, action) => {
            return ''
        }
    }
})

export const notification = (message) => {
    return dispatch => {
        dispatch(showMessage(message))
        setTimeout(() => {
            dispatch(hideMessage())
        }, 5000)
    }
}

export const { showMessage, hideMessage } = messageSlice.actions
export default messageSlice.reducer

