const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find().populate('user', { blogs: 0 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (request.user === null) {
        return response.status(401).json({ error: 'invalid token' })
    }

    const user = request.user

    blog.user = user._id

    const newBlog = await blog.save()

    user.blogs.push(blog._id)

    await user.save()

    response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    if (request.user === null) {
        return response.status(401).json({ error: 'invalid token' })
    }

    const user = request.user
    const blog = await Blog.findById(id)

    if (user._id.toString() !== blog.user.toString()) {
        return response.status(401).json({ error: 'invalid token' })
    }

    const removedBlog = await Blog.findByIdAndRemove(id)

    if (removedBlog)
        return response.status(204).end()
    response.status(400).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, { new: true })

    response.json(updatedBlog)
})

module.exports = blogsRouter
