import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo')
    if (userInfo) {
      setUser(JSON.parse(userInfo))
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('userInfo', JSON.stringify(user))
    } catch (error) {
      console.error(error.response.data.error)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userInfo')
  }

  if (!user) {
    return (
      <Login username={username} password={password} 
        handleUsername={(e) => {setUsername(e.target.value)}} 
        handlePassword={(e) => {setPassword(e.target.value)}} 
        login={handleLogin} />
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      {user.name} logged in <button onClick={handleLogout}>log out</button>
      { blogs.map(blog => <Blog key={blog.id} blog={blog} />) }
    </div>
  )
}

export default App
