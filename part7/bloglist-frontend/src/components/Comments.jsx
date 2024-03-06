import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogServices from '../services/blogServices'
import { addComment } from '../redux/reducers/blogReducer'

const Comments = ({ singleBlog }) => {
  const [newComment, setNewComment] = useState('')
  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()

  const handleGetComment = (e) => {
    setNewComment(e.target.value)
  }

  const PostNewComment = async () => {
    if (newComment.length < 1) {
      return
    }
    try {
      const response = await blogServices.addComment(singleBlog.id, newComment)
      dispatch(addComment(response))
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className="comments-total">
        <p>Comments: </p>
        {singleBlog.comments.length > 0 ? <p>Total: {singleBlog.comments.length}</p> : <p>No comments yet</p>}
      </div>
      <div className="comment-input-section">
        <input value={newComment} onChange={handleGetComment} />
        <button onClick={PostNewComment}>Add comment</button>
      </div>
      {singleBlog.comments.length > 0 ? (
        <div className="comment-section">
          <ul>
            {singleBlog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      ) : null
      }
    </>
  )
}

export default Comments