import { useParams } from 'react-router-dom'
import BlogView from './BlogView'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../stores/userStore'
import { useBlogs } from '../stores/blogStore'

const Blog = () => {
  const blogs = useBlogs()
  const user = useUser()
  const { id } = useParams()
  const navigate = useNavigate()
  const blog = blogs.find((b) => b.id === id)

  if (!blog) return null

  return <BlogView blog={blog} userid={user.id} onNavigate={navigate} />
}

export default Blog
