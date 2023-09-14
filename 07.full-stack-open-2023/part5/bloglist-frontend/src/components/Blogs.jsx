import Blog from './Blog'

const Blogs = ({ blogs, funcs, user }) => {
  return (
    <div>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} funcs={funcs} user={user}/>)}
    </div>
  )
}

export default Blogs
