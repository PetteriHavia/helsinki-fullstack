import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useEffect, useState } from "react"

const Books = ({ books, show }) => {
  const [genre, setGenre] = useState('all-genres')
  const [allGenres, setAllGenres] = useState([])

  useEffect(() => {
    if (books) {
      const allGenres = books.allBooks.flatMap(book => book.genres)
      const uniqueGenres = [...new Set(allGenres)]
      setAllGenres(['all-genres', ...uniqueGenres])
    }
  }, [books])

  if (!show) {
    return null
  }

  const filterBooks = books.allBooks.filter(book => genre === 'all-genres' ? book : book.genres.includes(genre))

  return (
    <div>
      <h2>books</h2>
      <p>in genre: {genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.map((g) => (
        <button onClick={() => setGenre(g)} value={g} key={g}>{g}</button>
      ))}
    </div>
  )
}

export default Books
