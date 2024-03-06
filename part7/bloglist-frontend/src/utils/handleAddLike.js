import blogServices from '../services/blogServices'
import { notification } from '../redux/reducers/messageReducer'
import { like } from '../redux/reducers/blogReducer'

export const handleAddLike = async (blog, dispatch) => {
    try {
        const updatedBlog = await blogServices.updateLike(blog.id, blog.likes + 1)
        dispatch(like(updatedBlog))
    } catch (error) {
        console.error('Error in handleAddLike:', error.response.data)
        dispatch(notification('Error has occured'))
    }
}