import { useDispatch } from 'react-redux'
import { getId } from "../reducers/anecdoteReducer"
import { displayMessage } from '../reducers/messageReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useContext } from 'react'
import MessageContext from './context/MessageContext'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [message, messageDispatch] = useContext(MessageContext)

  const handleAddAnecdote = async (e) => {
    e.preventDefault()
    const create = {
      content: e.target.addNew.value,
      id: getId(),
      votes: 0
    }
    dispatch(createAnecdote(create))
    messageDispatch({ type: 'DISPLAY', payload: `you created '${create.content}'` })
    setTimeout(() => {
      messageDispatch({ type: "CLEAR" })
    }, 5000)
    //dispatch(displayMessage(`you created '${create.content}'`, 5))
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