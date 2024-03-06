import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import blogServices from '../services/blogServices'
import { handleAddLike } from '../utils/handleAddLike'
import { useDispatch, useSelector } from 'react-redux'
import Comments from './Comments'


const SingleBlogPost = () => {
  const [singleBlog, setSingleBlog] = useState(null)
  const blogs = useSelector((state) => state.blogs)

  const { blogId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await blogServices.getSingleBlog(blogId)
        setSingleBlog(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBlog()
  }, [blogs])

  if (!singleBlog) {
    return null
  }

  return (
    <>
      <h2>{singleBlog.title}</h2>
      <p>Url: {singleBlog.url}</p>
      <div className="like-section">
        <p>{singleBlog.likes} likes</p>
        <button onClick={() => handleAddLike(singleBlog, dispatch)}>Like</button>
      </div>
      <p>Added by: {singleBlog.author}</p>
      <Comments singleBlog={singleBlog} />
    </>
  )
}

export default SingleBlogPost