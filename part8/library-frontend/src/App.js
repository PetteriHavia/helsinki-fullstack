import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LogingForm from './components/LoginForm'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_BOOKS, USER } from './queries'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const books = useQuery(ALL_BOOKS)

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (books.loading) {
    return <div>Loading....</div>
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => setPage('login')}>loging</button>
        {token ? <button onClick={handleLogout}>Logout</button> : null}

      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} books={books.data} />

      <NewBook show={page === 'add'} />

      <LogingForm show={page === 'login'} setToken={setToken} />

      <Recommend show={page === 'recommend'} books={books.data.allBooks} token={token} />
    </div>
  )
}

export default App
