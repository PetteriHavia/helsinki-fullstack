import { useState, useEffect } from 'react'
import blogServices from '../services/blogServices'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from '../redux/reducers/messageReducer'
import { createNewBlog } from '../redux/reducers/blogReducer'

const CreateBlog = ({ handleControlToggle }) => {

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: ''
  })

  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()

  const handleCreateBlog = async (e) => {
    e.preventDefault()

    const newBlog = {
      title: formData.title,
      author: formData.author,
      url: formData.url,
    }

    try {
      const createdBlog = await blogServices.create(newBlog)
      dispatch(notification(`A new blog ${newBlog.title} by ${newBlog.author}`))
      dispatch(createNewBlog(createdBlog))
      handleControlToggle()
    } catch (error) {
      console.log(error)
      dispatch(notification('Error creating new blog'))
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