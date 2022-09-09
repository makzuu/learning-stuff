const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user

  const params = {
    ...request.body,
    user: user._id
  }

  const blog = new Blog(params)
  const newBlog = await blog.save()

  user.blogs = user.blogs.concat(newBlog.id)
  await user.save()

  response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  const user = request.user
  const blog = await Blog.findById(id)

  if (blog.user.toString() != user._id) return response.status(401).json({
    error: 'invalid token'
  })
  
  await Blog.findByIdAndRemove(id)

  user.blogs = user.blogs.filter(blogId => blogId !== blog.id)
  await user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
