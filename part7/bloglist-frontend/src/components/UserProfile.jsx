import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import blogServices from '../services/blogServices'

const UserProfile = () => {

  const [profile, setProfile] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await blogServices.getUser(id)
        setProfile(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [id])

  if (!profile) {
    return null
  }

  return (
    <>
      <h2>Blog App</h2>
      <h2>{profile.username}</h2>
      <p>Added Blogs</p>
      <ul>
        {profile.blogs.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  )
}

export default UserProfile