import { useDispatch } from 'react-redux'
import { getId, createNew } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  //const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleAddAnecdote = (e) => {
    e.preventDefault()
    const create = {
      content: e.target.addNew.value,
      id: getId(),
      votes: 0
    }
    dispatch(createNew(create))
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