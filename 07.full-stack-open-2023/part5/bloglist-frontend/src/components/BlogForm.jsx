import { useState } from 'react'

import blogService from '../services/blogs'

const CreateBlog = ({ create }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const saveBlog = async e => {
    e.preventDefault()

    const blog = { title, author, url }
    await create(blog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={saveBlog}>
      <div>
        title:
        <input type="text" value={title} onChange={
          e => setTitle(e.target.value)
        } />
      </div>
      <div>
        author:
        <input type="text" value={author} onChange={
          e => setAuthor(e.target.value)
        } />
      </div>
      <div>
        url:
        <input type="text" value={url} onChange={
          e => setUrl(e.target.value)
        } />
      </div>
      <div>
        <input type="submit" value="create" />
      </div>
    </form>
  )
}

export default CreateBlog
