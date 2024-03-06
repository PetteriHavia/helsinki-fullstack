import Blog from './Blog'
import CreateBlog from './CreateBlog'
import { useState } from 'react'

const LoggedInContent = ({
  blogs,
  user,
  setUser,
  setBlogs,
  messageStatus,
  systemMessage,
}) => {
  const [toggle, setToggle] = useState(false)

  const handleControlToggle = () => {
    setToggle(!toggle)
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const renderAddBlogForm = !toggle ? (
    <button style={{ display: 'block' }} onClick={handleControlToggle}>
      Add new blog
    </button>
  ) : (
    <CreateBlog
      setBlogs={setBlogs}
      blogs={blogs}
      messageStatus={messageStatus}
      handleControlToggle={handleControlToggle}
    />
  )

  //sort by likes from bigger to smaller
  const sortedBlogs = blogs && blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      {systemMessage ? <p>{systemMessage}</p> : null}
      <label>{user.name} logged in </label>
      <button onClick={handleLogOut}>Logout</button>
      {renderAddBlogForm}
      {sortedBlogs &&
        sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            setBlogs={setBlogs}
            messageStatus={messageStatus}
            user={user}
          />
        ))}
    </div>
  )
}

export default LoggedInContent
