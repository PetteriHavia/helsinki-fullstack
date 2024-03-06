import { useQuery } from "@apollo/client"
import { USER } from "../queries"
import { useEffect, useState } from "react"

const Recommend = ({ show, books, token }) => {

  const { loading, error, data } = useQuery(USER, {
    skip: !localStorage.getItem('phonenumbers-user-token')
  })

  if (!show) {
    return null
  }

  const filteredBook = data && books.filter(book => book.genres.includes(data.me.favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      {data &&
        <>
          <p>books in your favorite genre: {data.me.favoriteGenre}</p>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Author</th>
                <th>Published</th>
              </tr>
              {filteredBook.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      }
    </div>
  )

}

export default Recommend