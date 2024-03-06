import { useState, useEffect } from 'react'
import blogServices from '../services/blogServices'

const CreateBlog = ({ setBlogs, blogs, messageStatus, handleControlToggle }) => {

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleCreateBlog = async (e) => {
    e.preventDefault()

    const newBlog = {
      title: formData.title,
      author: formData.author,
      url: formData.url,
    }

    try {
      const createdBlog = await blogServices.create(newBlog)
      messageStatus(`A new blog ${newBlog.title} by ${newBlog.author}`)
      setBlogs([...blogs, createdBlog])
      handleControlToggle()
    } catch (error) {
      console.log(error)
      messageStatus('Error creating new blog')
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setFormData((prevState) => ({
      ...prevState, [name]: value
    }))
  }

  return (
    <>
      <form onSubmit={handleCreateBlog}>
        <div style={{ marginTop: '1rem' }}>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} />
        </div>
        <div>
          <label>Url:</label>
          <input type="text" name="url" value={formData.url} onChange={handleChange} />
        </div>
        <button type="submit">Add Blog</button>
      </form>
      <button onClick={handleControlToggle}>Cancel</button>
    </>
  )
}

export default CreateBlog