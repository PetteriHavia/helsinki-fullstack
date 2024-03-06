import { useEffect, useState } from 'react'
import LoggedOutContent from './components/LoggedOutContent'
import LoggedInContent from './components/LoggedInContent'
import blogServices from './services/blogServices'
import { useDispatch, useSelector } from 'react-redux'
import { initializeData } from './redux/reducers/blogReducer'
import { initializeUser } from './redux/reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import PrivateRoutes from './PrivateRoutes'
import UserProfile from './components/UserProfile'
import SingleBlogPost from './components/SingleBlogPost'
import Navigation from './components/Navigation'

const App = () => {
  //const [user, setUser] = useState(null)
  const user = useSelector((state => state.user))
  const blogs = useSelector((state) => state.blog)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeData())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(initializeUser(user))
      blogServices.setToken(user.token)
    }
  }, [])

  return (
    <>
      {user ? <Navigation /> : null}
      <Routes>
        <Route path="/" exact element={user ? <LoggedInContent /> : <LoggedOutContent />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/blogs/:blogId" element={<SingleBlogPost />} />
        </Route>
      </Routes>
    </>
  )
}
export default App
