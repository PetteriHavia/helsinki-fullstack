import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"
import { useState } from "react"

const Authors = (props) => {

  const authorResult = useQuery(ALL_AUTHORS)
  const [updateBorn, setUpdateBorn] = useState('')
  const [name, setName] = useState('')

  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [
      { query: ALL_AUTHORS }
    ]
  })

  if (!props.show) {
    return null
  }

  const handleUpdateAuthor = () => {
    const born = parseInt(updateBorn)

    editAuthor({ variables: { born, name } })
    setName('')
    setUpdateBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authorResult.loading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (authorResult.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )))}
        </tbody>
      </table>
      <div>
        <h3>Set birthyear</h3>
        {authorResult.loading ? (
          <div>Loading...</div>
        ) : (
          <select onChange={({ target }) => setName(target.value)}>
            {authorResult.data.allAuthors.map((author) => (
              <option key={author.name}>{author.name}</option>
            ))}
          </select>)
        }
        <div>
          <label>born: </label>
          <input type="number" value={updateBorn} onChange={({ target }) => setUpdateBorn(target.value)} />
          <button onClick={handleUpdateAuthor}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default Authors
