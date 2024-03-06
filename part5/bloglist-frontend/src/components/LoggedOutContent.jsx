import LoginForm from './LoginForm'

const LoggedOutContent = ({ user, setUser, systemMessage, messageStatus }) => {
  return (
    <LoginForm
      user={user}
      setUser={setUser}
      systemMessage={systemMessage}
      messageStatus={messageStatus}
    />
  )
}

export default LoggedOutContent
