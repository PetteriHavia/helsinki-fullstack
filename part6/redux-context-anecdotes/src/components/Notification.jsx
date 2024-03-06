import { useContext, useReducer } from "react"
import { useSelector } from "react-redux"
import MessageContext from "./context/MessageContext"

const Notification = () => {

  //const message = useSelector((state) => state.message)
  const [message, messageDispatch] = useContext(MessageContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification