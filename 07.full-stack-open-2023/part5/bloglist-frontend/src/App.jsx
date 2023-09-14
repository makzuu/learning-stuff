import { useState, useEffect, useRef } from 'react'

import Blogs from './components/Blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  const togglableRef = useRef()

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo')
    if (userInfo) {
      const userObject = JSON.parse(userInfo)
      setUser(userObject)
      blogService.setToken(userObject.token)
    }
  }, [])

  const fetchData = async () => {
    try {
      const response = await blogService.getAll()
      setBlogs(response.sort((a, b) => {
        if (a.likes > b.likes) {
          return -1
        } else if (a.likes < b.likes) {
          return 1
        }
        return 0
      }))
    } catch (error) {
      console.error(error.response.data.error)
    }
  }

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
      setError('wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 5000);
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('userInfo')
    blogService.setToken(null)
  }

  const newBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      newBlog.user = { name: user.name, username: user.username }
      await fetchData()
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      togglableRef.current.toggleVisible()
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    } catch (error) {
      console.error(error.response.data.error)
    }
  }

  const updateLikes = async (updatedBlog) => {
    try {
      await blogService.update(updatedBlog)
      await fetchData()
    } catch (error) {
      console.error(error.response.data.error)
    }
  }

  if (!user) {
    return (
      <div>
        <h1>log in to application</h1>
        { error && <Error error={error}/> }
        <Login username={username} password={password} 
          handleUsername={(e) => {setUsername(e.target.value)}} 
          handlePassword={(e) => {setPassword(e.target.value)}} 
          login={login} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      { notification && <Notification message={notification}/> }
      {user.name} logged in <button onClick={logout}>log out</button>
      <h2>create new</h2>
      <Togglable buttonLabel='new blog' ref={togglableRef}>
        <BlogForm create={newBlog}/>
      </Togglable>
      <Blogs blogs={blogs} like={updateLikes}/>
    </div>
  )
}

export default App
