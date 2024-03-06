import { useSelector } from 'react-redux'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import { useState } from 'react'

const LoggedInContent = () => {

  const [toggle, setToggle] = useState(false)

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const message = useSelector((state) => state.message)

  const handleControlToggle = () => {
    setToggle(!toggle)
  }

  const renderAddBlogForm = !toggle ? (
    <button style={{ display: 'block' }} onClick={handleControlToggle}>
      Add new blog
    </button>
  ) : (
    <CreateBlog
      handleControlToggle={handleControlToggle}
    />
  )

  //sort by likes from bigger to smaller
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blog App</h2>
      {message ? <p>{message}</p> : null}
      {renderAddBlogForm}
      {sortedBlogs && sortedBlogs.length > 0 ? (
        sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        ))
      ) : (
        <p>No blogs to display. Be the first one to post!</p>
      )}
    </div>
  )
}

export default LoggedInContent
