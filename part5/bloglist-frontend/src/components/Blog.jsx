import { useState, useEffect } from 'react'
import blogServices from '../services/blogServices'
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs, messageStatus, user }) => {
  const [viewMore, setViewMore] = useState(false)

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

  const handleAddLike = async () => {
    try {
      const updatedBlog = await blogServices.updateLike(blog.id, blog.likes + 1)
      setBlogs((prevState) =>
        prevState.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      )
    } catch (error) {
      console.error('Error in handleAddLike:', error.response.data)
      messageStatus('Error has occured')
    }
  }

  const handleRemoveBlog = async () => {
    try {
      const userConfirmed = confirm(`Remove blog: ${blog.title} by: ${blog.author} ?`)
      if (userConfirmed) {
        await blogServices.deleteBlog(blog.id)
        setBlogs((prevBlogs) => prevBlogs.filter((blogs) => blogs.id !== blog.id))
      }
    } catch (error) {
      console.error('Error in handleRemoveBlog', error)
      messageStatus('Error occurred while trying to delete blog. Please try again later.')
    }
  }


  return (
    <div style={blogStyle}>
      <div style={blogInner}>
        <p>Title: {blog.title} Author: {blog.author}</p>
        <button onClick={handleViewMore}>View</button>
      </div>
      {viewMore ? (
        <div>
          <div style={likeBox}>
            <p>Likes: {blog.likes}</p>
            <button className="like-btn" style={{ marginLeft: '1rem' }} onClick={handleAddLike}>Like</button>
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
  messageStatus: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog