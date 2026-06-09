import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the event handler with the right details when creating a new blog', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const author = screen.getByPlaceholderText('Author')
  const title = screen.getByPlaceholderText('Title')
  const url = screen.getByPlaceholderText('URL')
  const sendButton = screen.getByText('save')

  await user.type(author, 'Test Guy')
  await user.type(title, 'Test Title')
  await user.type(url, 'www.testurl.notreal')
  await user.click(sendButton)

  expect (createBlog.mock.calls).toHaveLength(1)
  expect (createBlog.mock.calls[0][0].author).toBe('Test Guy')
  expect (createBlog.mock.calls[0][0].title).toBe('Test Title')
  expect (createBlog.mock.calls[0][0].url).toBe('www.testurl.notreal')
  console.log(createBlog.mock.calls)
})