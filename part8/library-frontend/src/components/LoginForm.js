import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../queries"

const LogingForm = ({ show, user, setToken }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, ({
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  }))


  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }
  }, [result.data])

  if (!show) {
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login({ variables: { username, password } })
    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Username: </label>
      <input value={username} style={{ display: "block" }} onChange={({ target }) => setUsername(target.value)} />
      <label>Password: </label>
      <input value={password} style={{ display: "block" }} onChange={({ target }) => setPassword(target.value)} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default LogingForm