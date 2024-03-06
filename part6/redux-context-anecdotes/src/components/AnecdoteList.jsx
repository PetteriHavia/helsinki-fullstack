import { useSelector, useDispatch } from "react-redux"
import { displayMessage } from '../reducers/messageReducer'
import Notification from "./Notification"
import { updateVote } from "../reducers/anecdoteReducer"
import { useContext } from "react"
import MessageContext from "./context/MessageContext"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const { filter } = useSelector((state) => state.filter)
  //const message = useSelector((state) => state.message)
  const [message, messageDispatch] = useContext(MessageContext)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(updateVote(anecdote))
    messageDispatch({ type: "DISPLAY", payload: `you voted '${anecdote.content}'` })
    setTimeout(() => {
      messageDispatch({ type: "CLEAR" })
    }, 5000)
    //dispatch(displayMessage(`you voted '${anecdote.content}'`, 5));
  }

  const filterAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  const anecdotesOrder = filterAnecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {message &&
        <Notification />
      }
      {anecdotesOrder.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList