const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

const users = [
    {
        username: "hellas",
        password: "12345",
        name: "arto hellas"
    }
]

afterEach(async () => {
    await User.deleteMany()
    await User.create(users)
})

describe('when creating a new user', () => {
    test('username must be given', async () => {
        const user = {
            password: "1234",
            name: "test name"
        }

        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toBeDefined()
        expect(response.body.error).toBe(`User validation failed: username: Path \`username\` is required.`)
    })

    test('password must be given', async () => {
        const user = {
            username: "test username",
            name: "test name"
        }

        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toBeDefined()
        expect(response.body.error).toBe(`User validation failed: password: Path \`password\` is required.`)
    })

    test('username must be at least 3 characters long', async () => {
        const user = {
            username: "ab",
            name: "test name",
            password: "12345"
        }

        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toBeDefined()
        expect(response.body.error).toBe(`User validation failed: username: Path \`username\` (\`${user.username}\`) is shorter than the minimum allowed length (3).`)
    })

    test('password must be at least 3 characters long', async () => {
        const user = {
            username: "test username",
            name: "test name",
            password: "12"
        }

        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toBeDefined()
        expect(response.body.error).toBe(`User validation failed: password: Path \`password\` (\`${user.password}\`) is shorter than the minimum allowed length (3).`)
    })

    test('username must be unique', async () => {
        const user = users[0]

        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toBeDefined()
        expect(response.body.error).toBe(`User validation failed: username: Error, expected \`username\` to be unique. Value: \`${user.username}\``)
    })

    test('a valid user can be created', async () => {
        const user = {
            username: "makz",
            password: "1234",
            name: "makz mann"
        }

        const response = await api
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).not.toBeDefined()
        expect(response.body.username).toBe(user.username)
        expect(response.body.name).toBe(user.name)
        expect(response.body.passwordHash).not.toBeDefined()
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
