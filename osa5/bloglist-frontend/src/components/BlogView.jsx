import styled from 'styled-components'

const Wrapper = styled.div`

  border: 2px solid #000000;
  padding: 1em;
  border-radius: 3px;
  text-align: center;

`

const Button = styled.button`
  color: white;
  background: ${props => props.$color};
  border: 0px solid blue;
  margin-left: 20en;
  &:hover {
    color: grey;
  }
`

const BlogView = ({ blog, userid, handleLike, handleRemove, onNavigate }) => {
  const owner = userid ? userid === blog.user.id : false

  const onLike = () => {
    if (userid) {
      handleLike(blog.id, {
        likes: blog.likes + 1,
      })
    }
  }
  const onRemoval = () => {
    const remove = window.confirm(
      `Remove ${blog.title} by ${blog.author}?`
    )

    if (remove) {
      handleRemove(blog.id)
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
            <Button onClick={onLike} $color='lightblue'>like</Button>
          ) : (
            <span style={{ color: 'crimson' }}>
              [log in to like blogs]
            </span>
          )}
        </div>
      </div>

      <div>{blog.url}</div>
      <div>{blog.user.name}</div>

      <div>{owner && <Button onClick={onRemoval} $color='crimson'>remove</Button>}</div>
    </Wrapper>
  )
}

export default BlogView