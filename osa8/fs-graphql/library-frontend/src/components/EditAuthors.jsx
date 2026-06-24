import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { EDIT_AUTHOR, ALL_AUTHORS_BOOKS } from '../queries'

const EditAuthors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS_BOOKS }],
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({
      variables: { name, setBornTo: parseInt(born, 10) },
    })

    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>
            name
            <select onChange={({ target }) => setName(target.value)}>
              {props.authors.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            born
            <input
              type='number'
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </label>
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditAuthors
