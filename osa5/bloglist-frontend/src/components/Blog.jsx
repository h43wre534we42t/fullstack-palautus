import { useParams } from 'react-router-dom'
import BlogView from './BlogView'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blogs, handleLike, handleRemove, userid }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const blog = blogs.find(b => b.id === id)

  if (!blog) return null


  return (
    <BlogView
      blog={blog}
      userid={userid}
      handleLike={handleLike}
      handleRemove={handleRemove}
      onNavigate={navigate}
    />
  )
}

export default Blog