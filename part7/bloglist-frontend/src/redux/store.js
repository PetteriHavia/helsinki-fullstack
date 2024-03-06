import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import { loginReducer, userReducer } from './reducers/userReducer'

export default configureStore({
    reducer: {
        message: messageReducer,
        blogs: blogReducer,
        login: loginReducer,
        user: userReducer,
    }
})