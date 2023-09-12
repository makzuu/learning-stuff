import { useState } from 'react'

const Blog = ({ blog, like }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => setVisible(!visible)

  const updateLikes = async () => {
    const newBlog = {...blog}
    newBlog.user = newBlog.user.id
    newBlog.likes++
    await like(newBlog)
  }

  const blogStyle = {
    border: '1px solid black',
    padding: '5px',
    marginTop: '5px',
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisible}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
          <button onClick={updateLikes}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisible}>view</button>
    </div>
  )
}

export default Blog
