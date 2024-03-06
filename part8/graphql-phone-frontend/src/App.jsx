import './App.css'
import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, FIND_AUTHOR_BOOKS } from './queries'

function App() {

  const result = useQuery(ALL_BOOKS)
  const [authorToSearch, setAuthorToSearch] = useState(null)

  const authorResult = useQuery(FIND_AUTHOR_BOOKS, {
    variables: { authorToSearch },
    skip: !authorToSearch
  })

  if (result.loading) {
    return <div>Loading...</div>
  }

  console.log(authorResult)

  return (
    <div>
      <h1>Apollo testing</h1>
      {result.data.allBooks.map((item) => (
        <div key={item.title}>
          <p>{item.author}</p>
          <button onClick={() => setAuthorToSearch(item.author)}>Show info</button>
          {authorToSearch === item.author && (
            <div>
              <p>{authorToSearch} : Books</p>
              {authorResult.data && authorResult.data.allBooks.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.published}</p>
                </div>
              ))}
              <button onClick={() => setAuthorToSearch(null)}>Close</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default App
