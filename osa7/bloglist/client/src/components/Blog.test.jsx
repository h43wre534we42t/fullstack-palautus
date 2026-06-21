import { render, screen } from '@testing-library/react'
import BlogView from './BlogView'

const blog = {
  id: '123',
  author: 'Tester',
  title: 'Very cool test',
  url: 'www.realaddressforsure.notreal',
  likes: 76,
  user: {
    id: 'owner',
    name: 'testguy'
  }
}

test('unauthenticated user sees blog info but no buttons', () => {
  render(
    <BlogView
      blog={blog}
      userid={null}
      handleLike={vi.fn()}
      handleRemove={vi.fn()}
    />
  )

  expect(screen.getByText('Very cool test by Tester')).toBeVisible()
  expect(screen.getByText('likes: 76')).toBeVisible()
  expect(screen.getByText('www.realaddressforsure.notreal')).toBeVisible()

  expect(screen.queryByText('like')).toBeNull()
  expect(screen.queryByText('remove')).toBeNull()
})

test('non-owner sees only like button', () => {
  render(
    <BlogView
      blog={blog}
      userid="different-user"
      handleLike={vi.fn()}
      handleRemove={vi.fn()}
    />
  )

  expect(screen.getByText('Very cool test by Tester')).toBeVisible()
  expect(screen.getByText('likes: 76')).toBeVisible()
  expect(screen.getByText('www.realaddressforsure.notreal')).toBeVisible()

  expect(screen.getByText('like')).toBeVisible()
  expect(screen.queryByText('remove')).toBeNull()
})

test('owner sees remove button', () => {
  render(
    <BlogView
      blog={blog}
      userid="owner"
      handleLike={vi.fn()}
      handleRemove={vi.fn()}
    />
  )

  expect(screen.getByText('like')).toBeVisible()
  expect(screen.getByText('remove')).toBeVisible()
})