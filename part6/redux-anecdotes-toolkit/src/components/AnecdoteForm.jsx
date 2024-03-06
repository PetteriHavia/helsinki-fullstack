import { useDispatch } from 'react-redux'
import { getId } from "../reducers/anecdoteReducer"
import { displayMessage } from '../reducers/messageReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAddAnecdote = async (e) => {
    e.preventDefault()
    const create = {
      content: e.target.addNew.value,
      id: getId(),
      votes: 0
    }
    dispatch(createAnecdote(create))
    dispatch(displayMessage(`you created '${create.content}'`, 5))
    //dispatch(renderMessage({ message: `you created '${create.content}'` }))
    //emptyMessage(dispatch)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <input type="text" name="addNew" />
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm