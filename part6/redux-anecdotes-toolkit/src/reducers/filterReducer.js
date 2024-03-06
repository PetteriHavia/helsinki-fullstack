import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        filter: ''
    },
    reducers: {
        filterAnecdote: (state, action) => {
            return { ...state, filter: action.payload }
        }
    }
})

export const { filterAnecdote } = filterSlice.actions
export default filterSlice.reducer