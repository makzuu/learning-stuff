import blogService from '../services/blogs'

const CreateBlog = ({ title, author, url, changeTitle, changeAuthor, changeUrl, saveBlog }) => {
  return (
    <form onSubmit={saveBlog}>
      <div>
        title:
        <input type="text" value={title} onChange={changeTitle} />
      </div>
      <div>
        author:
        <input type="text" value={author} onChange={changeAuthor} />
      </div>
      <div>
        url:
        <input type="text" value={url} onChange={changeUrl} />
      </div>
      <div>
        <input type="submit" value="create" />
      </div>
    </form>
  )
}

export default CreateBlog
