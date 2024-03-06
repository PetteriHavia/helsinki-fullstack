import { useState, useEffect } from 'react'
import blogServices from '../services/blogServices'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from '../redux/reducers/messageReducer'
import { deleteBlog } from '../redux/reducers/blogReducer'
import { Link } from 'react-router-dom'
import { handleAddLike } from '../utils/handleAddLike'

const Blog = ({ blog }) => {
  const [viewMore, setViewMore] = useState(false)

  const message = useSelector((state) => state.message)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
    width: 350,
  }

  const blogInner = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const likeBox = {
    display: 'flex',
    alignItems: 'center'
  }

  const handleViewMore = () => {
    setViewMore(!viewMore)
  }

  /*
  const handleAddLike = async () => {
    try {
      const updatedBlog = await blogServices.updateLike(blog.id, blog.likes + 1)
      dispatch(like(updatedBlog))
    } catch (error) {
      console.error('Error in handleAddLike:', error.response.data)
      dispatch(notification('Error has occured'))
    }
  }*/

  const handleRemoveBlog = async () => {
    try {
      const userConfirmed = confirm(`Remove blog: ${blog.title} by: ${blog.author} ?`)
      if (userConfirmed) {
        await blogServices.deleteBlog(blog.id)
        dispatch(deleteBlog(blog.id))
      }
    } catch (error) {
      console.error('Error in handleRemoveBlog', error)
      dispatch(notification('Error occurred while trying to delete blog. Please try again later.'))
    }
  }

  return (
    <div style={blogStyle}>
      <div style={blogInner}>
        <Link to={`/blogs/${blog.id}`}>Title: {blog.title} Author: {blog.author}</Link>
        <button onClick={handleViewMore}>View</button>
      </div>
      {viewMore ? (
        <div>
          <div style={likeBox}>
            <p>Likes: {blog.likes}</p>
            <button className="like-btn" style={{ marginLeft: '1rem' }} onClick={() => handleAddLike(blog, dispatch)}>Like</button>
          </div>
          <p>By User: {blog.user.username}</p>
          {user.id === blog.user.id ?
            <button className='remove-btn' onClick={handleRemoveBlog}>Remove</button>
            : null
          }
        </div>
      ) : null}
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog