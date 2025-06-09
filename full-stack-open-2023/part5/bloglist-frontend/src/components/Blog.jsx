import { useState } from 'react'

const Blog = ({ blog, funcs, user }) => {
    const [visible, setVisible] = useState(false)

    const showRemoveButton = user && user.username === blog.user.username
    const toggleVisible = () => setVisible(!visible)

    const updateLikes = async () => {
        const updatedBlog = { ...blog }
        updatedBlog.user = updatedBlog.user.id
        updatedBlog.likes++
        await funcs.updateBlog(updatedBlog)
    }

    const remove = () => {
        if (confirm(`remove blog ${blog.title} by ${blog.author}`)) {
            funcs.removeBlog(blog.id)
        }
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
                <div>
                    { showRemoveButton &&
                        <button
                            onClick={remove}
                        >
                            remove
                        </button>
                    }
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
