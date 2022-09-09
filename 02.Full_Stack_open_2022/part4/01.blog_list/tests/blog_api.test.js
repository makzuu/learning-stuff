// Use the supertest package for writing a test that makes an HTTP GET request
// to the /api/blogs url. Verify that the blog list application returns the
// correct amount of blog posts in the JSON format.

const { SECRET } = require('../utils/config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const userData = {
  username: 'hellas',
  password: 12345,
}

const initialData = [
  {
    title: 'AN ASCII TERMINAL LIKE IT’S 1974',
    author: 'Jenny List',
    url: 'https://hackaday.com/2022/08/21/an-ascii-terminal-like-its-1974/',
    likes: 9
  },
  {
    title: 'BATTERIES GET TINY',
    author: 'Al Williams',
    url: 'https://hackaday.com/2022/08/20/batteries-get-tiny/',
    likes: 15
  }
]

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const user = new User(userData)
  await user.save()

  const blog1 = new Blog({
    ...initialData[0],
    user: user._id
  })

  const blog2 = new Blog({
    ...initialData[1],
    id: user._id
  })

  await blog1.save()
  await blog2.save()

  user.blogs = user.blogs.concat(blog1._id)
  user.blogs = user.blogs.concat(blog2._id)
  user.save()
})

const getToken = async () => {
  const response = await api.get('/api/users')
  const user = response.body[0]

  let token = jwt.sign({
    username: user.username,
    id: user.id
  }, SECRET)

  token = `bearer ${token}`
  return token
}

test('blogs posts are returned as json', async () => {
  const token = await getToken()

  await api
    .get('/api/blogs')
    .set({ Authorization: token })
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blog posts', async () => {
  const token = await getToken()

  const response = await api
    .get('/api/blogs')
    .set({ Authorization: token })

  expect(response.body).toHaveLength(initialData.length)
})
 
test('the unique identifier is named id', async () => {
  const token = await getToken()

  const response = await api
    .get('/api/blogs')
    .set({ Authorization: token })

  response.body.forEach(blog => expect(blog.id).toBeDefined())
})
 
test('a valid blog post can be added', async () => {
  const newBlogPost = {
    title: 'IBM’S EARLY PC ATTRACTS TIME TRAVELERS',
    author: 'AL WILLIAMS',
    url: 'https://hackaday.com/2022/08/23/ibms-early-pc-attracts-time-travelers/',
    likes: 28
  }

  const token = await getToken()

  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .set({ Authorization: token })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')
    .set({ Authorization: token })

  const contents = response.body.map(post => post.title)

  expect(response.body).toHaveLength(initialData.length + 1)
  expect(contents).toContain(newBlogPost.title)
})

test('creation of a blog fails when authorization token is not provided', async () => {
  const newBlog = {
    title: 'IBM’S EARLY PC ATTRACTS TIME TRAVELERS',
    author: 'AL WILLIAMS',
    url: 'https://hackaday.com/2022/08/23/ibms-early-pc-attracts-time-travelers/',
    likes: 28
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('if no value is provided the default value for likes will be 0', async () => {
  const newBlogPost = {
    title: 'IBM’S EARLY PC ATTRACTS TIME TRAVELERS',
    author: 'AL WILLIAMS',
    url: 'https://hackaday.com/2022/08/23/ibms-early-pc-attracts-time-travelers/'
  }

  const token = await getToken()

  const response = await api
    .post('/api/blogs')
    .send(newBlogPost)
    .set({ Authorization: token })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('if title an url are missing the blogPost is not added', async () => {
  const newBlogPost = {
    author: 'AL WILLIAMS',
    likes: 28
  }

  const token = await getToken()

  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .set({ Authorization: token })
    .expect(400)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const token = await getToken()

    const blogList = await api
      .get('/api/blogs')
      .set({ Authorization: token })

    const blogToDelete = blogList.body[0].id

    const response = await api
      .delete(`/api/blogs/${blogToDelete}`)
      .set({ Authorization: token })
      .expect(204)
    
    const blogListAfter = await api
      .get('/api/blogs')
      .set({ Authorization: token })

    expect(blogListAfter.body).toHaveLength(blogList.body.length - 1)

    const titles = blogListAfter.body.map(blogs => blogs.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    const token = await getToken()

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set({ Authorization: token })
      .expect(400)
  })
})

describe('updating a blog', () => {
  test('succeeds with status 200 if id is valid', async () => {
    const token = await getToken()

    const blogList = await api
      .get('/api/blogs')
      .set({ Authorization: token })

    const blogToUpdate = blogList.body[0]
    const updatedBlog = {
      ...blogToUpdate,
      user: blogToUpdate.user.id,
      likes: blogToUpdate.likes + 1
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .set({ Authorization: token })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(blogToUpdate.likes + 1)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    const token = await getToken()

    await api
      .put(`/api/blogs/${invalidId}`)
      .set({ Authorization: token })
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
