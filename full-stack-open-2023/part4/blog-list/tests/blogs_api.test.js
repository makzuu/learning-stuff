const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

const helper = require('./test_helper')

const user = { username: 'makz', name: 'makz mann', password: '1234' }

const getToken = async () => {
    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    return 'Bearer ' + token
}

beforeEach(async () => {
    await Blog.deleteMany()
    await User.deleteMany()

    const saltRounds = 10
    user.passwordHash = await bcrypt.hash(user.password, saltRounds)
    const savedUser = await new User(user).save()

    user._id = savedUser._id

    helper.blogs.forEach(blog => blog.user = savedUser._id);

    await Blog.insertMany(helper.blogs)
})

test('all blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.blogs.length)
})

test('the blog unique identifier is named id, not _id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
})

test('a new blog can be added', async () => {
    const newBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    }

    const token = await getToken()

    const response = await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()

    expect(blogsInDb).toHaveLength(helper.blogs.length + 1)
    expect(response.body.title).toEqual(newBlog.title)
})

test('blog\'s likes property defaults to 0', async () => {
    const blogWithoutLikes = helper.blogWithoutLikes

    const token = await getToken()

    const response = await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(blogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
})

test('blog\'s title property is required', async () => {
    const blogWithoutTitle = helper.blogWithoutTitle

    const token = await getToken()

    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(blogWithoutTitle)
        .expect(400)
})

test('blog\'s url property is required', async () => {
    const blogWithoutUrl = helper.blogWithoutUrl

    const token = await getToken()

    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(blogWithoutUrl)
        .expect(400)
})

describe('deletion of a blog', () => {
    test('succeeds with status 204 if id is valid', async () => {
        const blogsInDb = await helper.blogsInDb()
        const blogToRemove = blogsInDb[0]

        const token = await getToken()

        await api
            .delete(`/api/blogs/${blogToRemove.id}`)
            .set('Authorization', token)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1)

        const blog_titles = blogsAtEnd.map(b => b.title)

        expect(blog_titles).not.toContain(blogToRemove.title)
    })

    test('fails with status 400 if id is invalid', async () => {
        const invalidId = await helper.nonExistingId()

        const token = await getToken()

        await api
            .delete(`/api/blogs/${invalidId}`)
            .set('Authorization', token)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.blogs.length)
    })
})

test('blog\'s likes property may be updated', async () => {
    const blogsInDb = await helper.blogsInDb()
    const blog = blogsInDb[0]

    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    const response = await api
        .put(`/api/blogs/${blog.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(blog.likes + 1)
})

test('adding a blog fails with status 401 Unauthorized when no token is provided', async () => {
    const newBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()

    expect(blogsInDb).toHaveLength(helper.blogs.length)
})

afterAll(async () => {
    await mongoose.connection.close()
})
