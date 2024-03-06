import { useSelector, useDispatch } from "react-redux"
import { displayMessage } from '../reducers/messageReducer'
import Notification from "./Notification"
import { updateVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const { filter } = useSelector((state) => state.filter)
  const message = useSelector((state) => state.message)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(updateVote(anecdote))
    dispatch(displayMessage(`you voted '${anecdote.content}'`, 5));
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