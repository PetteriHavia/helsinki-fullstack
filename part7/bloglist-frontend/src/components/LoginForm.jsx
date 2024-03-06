import { useState, useEffect } from 'react'
import blogServices from '../services/blogServices'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from '../redux/reducers/messageReducer'
import { getUsername, getPassword, loginProcess } from '../redux/reducers/userReducer'

const LoginForm = () => {

  const message = useSelector((state) => state.message)
  const user = useSelector((state) => state.user)
  const { password, username } = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await blogServices.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogServices.setToken(user.token)
      dispatch(loginProcess(user))
    } catch (error) {
      dispatch(notification('Wrong username or password'))
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Log in application</h2>
      {message ? message : null}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
          <input type="text" id='username' onChange={({ target }) => dispatch(getUsername(target.value))} />
        </div>
        <div>
          <label>Password: </label>
          <input type="text" id='password' onChange={({ target }) => dispatch(getPassword(target.value))} />
        </div>
        <button id='login-button' type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm