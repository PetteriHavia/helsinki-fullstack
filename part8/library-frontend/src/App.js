import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LogingForm from './components/LoginForm'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import Recommend from './components/Recommend'

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const books = useQuery(ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      console.log(addedBook)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      //alert(`New book added ${addedBook.title}`)
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    }
  })

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
