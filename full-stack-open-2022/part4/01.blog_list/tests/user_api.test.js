const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

const initialData = [
  {
    username: 'hellas',
    name: 'Arto Hellas',
    passwordHash: '2b$10$vwW2zuCIVZ19ndIyQ3xYKOueFOtd4Y8Bwyon8rIoE9uSrbXJaTwX6'
  },
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    passwordHash: '2b$10$vwW2zuCIVZ19ndIyQ3xYKOueFOtd4Y8Bwyon8rIoE9uSrbXJaTwX6'
  }
]

beforeEach(async () => {
  await User.deleteMany({})

  const user1 = new User(initialData[0])
  await user1.save()
  const user2 = new User(initialData[1])
  await user2.save()
})

describe('creating a new user', () => {
  test('fails if username and password are not provided', async () => {
    const userWithoutPassword = { username: 'makz', password: '' }
    let response = await api
      .post('/api/users')
      .send(userWithoutPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBeDefined()

    const userWithoutUsername = { username: '', password: '12345' }
    response = await api
      .post('/api/users')
      .send(userWithoutUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBeDefined()
  })

  test('fails if username and password length are less than 3 characters long', async () => {
    const invalidUserName = { username: 'aa', password: '12345' }

    let response = await api
      .post('/api/users')
      .send(invalidUserName)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBeDefined()

    const invalidPassword = { username: 'makz', password: '12' }

    response = await api
      .post('/api/users')
      .send(invalidPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBeDefined()
  })

  test('fails if username is already taken', async () => {
    const users = await api.get('/api/users')
    delete users.body[0].id
    delete users.body[0].name

    const invalidUser = {
      ...users.body[0],
      password: '12345'
    }

    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBeDefined()
  })
})

// post

// username and password are required
// --> 400 bad request
// usename and password length must be at least 3 characters long
// --> 400 bad request
// username must be unique
// --> 400 bad request

// users collection not change

afterAll(() => {
  mongoose.connection.close()
})
