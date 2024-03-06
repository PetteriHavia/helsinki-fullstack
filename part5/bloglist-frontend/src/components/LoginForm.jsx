import { useState, useEffect } from 'react'
import blogServices from '../services/blogServices'

const LoginForm = ({ user, setUser, systemMessage, messageStatus }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await blogServices.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogServices.setToken(user.token)
      setUser(user)
      console.log('Logged in user:', user)
      setUsername('')
      setPassword('')
    } catch (error) {
      messageStatus('Wrong username or password')
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Log in application</h2>
      {systemMessage ? systemMessage : null}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
          <input type="text" id='username' onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <label>Password: </label>
          <input type="text" id='password' onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button id='login-button' type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm