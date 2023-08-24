const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find()
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const newBlog = await blog.save()

    response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    const removedBlog = await Blog.findByIdAndRemove(id)

    if (removedBlog)
        return response.status(204).end()
    response.status(400).end()
})

module.exports = blogsRouter
