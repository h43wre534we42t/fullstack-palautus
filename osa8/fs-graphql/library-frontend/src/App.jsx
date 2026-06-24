import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthors from './components/EditAuthors'
import { ALL_AUTHORS_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const result = useQuery(ALL_AUTHORS_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }
  console.log(result)
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('edit authors')}>edit authors</button>
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} />

      <Books show={page === 'books'} books={result.data.allBooks} />

      <NewBook show={page === 'add'} />

      <EditAuthors
        show={page === 'edit authors'}
        authors={result.data.allAuthors}
      />
    </div>
  )
}

export default App
