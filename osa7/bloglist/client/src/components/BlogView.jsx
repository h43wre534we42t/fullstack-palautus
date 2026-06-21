import styled from 'styled-components'
import { useBlogActions } from '../stores/blogStore'

const Wrapper = styled.div`
  border: 2px solid #000000;
  padding: 1em;
  border-radius: 3px;
  text-align: center;
`

const Button = styled.button`
  color: white;
  background: ${(props) => props.$color};
  border: 0px solid blue;
  margin-left: 20en;
  &:hover {
    color: grey;
  }
`
const Link = styled.a`
  &:hover {
    color: purple;
  }
`

const BlogView = ({ blog, userid, onNavigate }) => {
  const owner = userid ? userid === blog.user.id : false
  const { likeBlog, removeBlog } = useBlogActions()

  const onLike = () => {
    if (userid) {
      likeBlog(blog, blog.id)
    }
  }
  const onRemoval = () => {
    const remove = window.confirm(`Remove ${blog.title} by ${blog.author}?`)

    if (remove) {
      removeBlog(blog.id)
      onNavigate('/')
    }
  }
  return (
    <Wrapper>
      <h2>
        {blog.title} by {blog.author}
      </h2>

      <div>
        likes: {blog.likes}
        <div>
          {userid ? (
            <Button onClick={onLike} $color='lightblue'>
              like
            </Button>
          ) : (
            <span style={{ color: 'crimson' }}>[log in to like blogs]</span>
          )}
        </div>
      </div>

      <Link href={blog.url}>{blog.url}</Link>
      <div>{blog.user.name}</div>

      <div>
        {owner && (
          <Button onClick={onRemoval} $color='crimson'>
            remove
          </Button>
        )}
      </div>
    </Wrapper>
  )
}

export default BlogView
