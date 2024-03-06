import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../redux/reducers/userReducer'

const Navigation = () => {

  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(userLogout())
  }

  return (
    <div className="nav-container">
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      <div className="user-info">
        <label>{user.name} logged in </label>
        <button onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  )
}

export default Navigation