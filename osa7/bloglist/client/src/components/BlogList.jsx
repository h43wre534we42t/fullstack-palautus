import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useBlogs } from '../stores/blogStore'

const Wrapper = styled.section`
  background: grey;
  text-align: center;
`

const StyledLink = styled(Link)`
  &:hover {
    color: purple;
  }
`

const BlogList = () => {
  const blogs = useBlogs()
  return (
    <Wrapper>
      <div style={{ color: 'black' }}></div>
      <h2>blogs</h2>
      <div></div>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <StyledLink to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </StyledLink>
        </li>
      ))}
    </Wrapper>
  )
}

export default BlogList
