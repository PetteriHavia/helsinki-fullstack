import { useState } from 'react'
import blogServices from '../services/blogServices'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {

  const [usersInfo, setUsersInfo] = useState(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await blogServices.getUsers()
        setUsersInfo(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserInfo()
  }, [])

  if (!usersInfo) {
    return null
  }

  return (
    <>
      <p>Users</p>
      <p>Blogs created</p>
      {usersInfo.map((blog) => (
        <div key={blog.id} className="user-blogs">
          <Link to={`/users/${blog.id}`}>{blog.username}</Link>
          <p>{blog.blogs.length}</p>
        </div>
      ))}
    </>
  )
}

export default Users