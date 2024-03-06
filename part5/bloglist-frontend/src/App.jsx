import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogServices'
import LoginForm from './components/LoginForm'
import LoggedOutContent from './components/LoggedOutContent'
import LoggedInContent from './components/LoggedInContent'
import blogServices from './services/blogServices'

const App = () => {
  const [blogs, setBlogs] = useState(null)
  const [user, setUser] = useState(null)
  const [systemMessage, setSystemMessage] = useState('')

  useEffect(() => {
    blogService.getAll()
      .then((blogs) => (
        setBlogs(blogs)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogServices.setToken(user.token)
    }
  }, [])

  const messageStatus = (message) => {
    setSystemMessage(message)
    setTimeout(() => {
      setSystemMessage(null)
    }, 5000)
  }

  return (
    <>
      {user ? (
        <LoggedInContent
          blogs={blogs}
          user={user}
          setUser={setUser}
          setBlogs={setBlogs}
          messageStatus={messageStatus}
          systemMessage={systemMessage}
        />
      ) : (
        <LoggedOutContent
          user={user}
          setUser={setUser}
          messageStatus={messageStatus}
          systemMessage={systemMessage}
        />
      )}
    </>
  )
}
export default App
