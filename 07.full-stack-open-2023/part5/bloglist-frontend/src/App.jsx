import { useState, useEffect } from 'react'

import Blogs from './components/Blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo')
    if (userInfo) {
      const userObject = JSON.parse(userInfo)
      setUser(userObject)
      blogService.setToken(userObject.token)
    }
  }, [])

  const login = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('userInfo', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (error) {
      console.error(error.response.data.error)
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('userInfo')
    blogService.setToken(null)
  }

  const newBlog = async (e) => {
    e.preventDefault()

    try {
      const newBlog = await blogService.create({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs([...blogs, newBlog])
    } catch (error) {
      console.error(error.response.data.error)
    }
  }

  if (!user) {
    return (
      <Login username={username} password={password} 
        handleUsername={(e) => {setUsername(e.target.value)}} 
        handlePassword={(e) => {setPassword(e.target.value)}} 
        login={login} />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {user.name} logged in <button onClick={logout}>log out</button>
      <h2>create new</h2>
      <BlogForm title={title} author={author} url={url}
        changeTitle={(e) => setTitle(e.target.value)}
        changeAuthor={(e) => setAuthor(e.target.value)}
        changeUrl={(e) => setUrl(e.target.value)}
        saveBlog={newBlog}
      />
      <Blogs blogs={blogs}/>
    </div>
  )
}

export default App
