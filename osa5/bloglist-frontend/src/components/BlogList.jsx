import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.section`
  background: grey;
  text-align: center;
`

const BlogList = ({ blogs }) => {
  return (
    <Wrapper>
      <div style={{ color: 'black' }}>
      </div>
      <h2>blogs</h2>
      <div>
      </div>
      {blogs.map(blog =>
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </li>
      )}
    </Wrapper>
  )
}

export default BlogList