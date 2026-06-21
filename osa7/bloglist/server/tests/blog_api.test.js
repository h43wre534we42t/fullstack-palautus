const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const list_helper = require('../utils/list_helper')
const { log } = require('node:console')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

describe('when there are some blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.insertMany(helper.initialUsers)
  })

  describe('blogs are in correct format', () => {
    test('blogs are returned as json and the length is correct', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      assert.strictEqual(response.body.length, 2)
    })

    test('unique identifier of a blog is called id', async () => {
      const response = await api.get('/api/blogs')
      response.body.forEach(blog => {
        assert.ok(blog.id)
      })
    })
  })

  describe('adding new blogs', () => {
    test('adding new blog works', async () => {
      const user = await api
        .post('/api/users')
        .send(helper.testUser)
      const loginResponse = await api.post('/api/login').send(helper.testLogin)

      const token = `Bearer ${loginResponse.body.token}`
      const userId = user.body.id

      newBlog = {
      "title": "testTitle3",
      "author": "testAuthor3",
      "url": "testURL3",
      "likes": 10,
      "userId": userId
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: token})
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const authors = response.body.map(b => b.author)

      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

      assert(authors.includes('testAuthor3'))
    })

    test('adding new blog without a token fails with status 401', async () => {
      const user = await api
        .post('/api/users')
        .send(helper.testUser)
      const userId = user.body.id

      newBlog = {
      "title": "testTitle3",
      "author": "testAuthor3",
      "url": "testURL3",
      "likes": 10,
      "userId": userId
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
    })

    test('if likes is missing it defaults to 0', async () => {
      const user = await api
        .post('/api/users')
        .send(helper.testUser)
      const loginResponse = await api.post('/api/login').send(helper.testLogin)

      const token = `Bearer ${loginResponse.body.token}`
      const userId = user.body.id

      newBlog = {
      "title": "testTitle3",
      "author": "testAuthor3",
      "url": "testURL3",
      "userId": userId
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: token})
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const likes = await response.body.map(b => b.likes)

      assert.notStrictEqual(likes[response.body.length - 1], undefined)

      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

      assert.equal(response.body.length, likes.length)

      assert.equal(list_helper.totalLikes(response.body), list_helper.totalLikes(helper.initialBlogs))
    })

    test('if missing title responds with 400', async () => {
      const user = await api
        .post('/api/users')
        .send(helper.testUser)
      const loginResponse = await api.post('/api/login').send(helper.testLogin)

      const token = `Bearer ${loginResponse.body.token}`
      const userId = user.body.id

      newBlog = {
      "author": "testAuthor3",
      "url": "testURL3",
      "likes": 10,
      "userId": userId
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: token })
        .expect(400)
    })

    test('if missing url responds with 400', async () => {
      const user = await api
        .post('/api/users')
        .send(helper.testUser)
      const loginResponse = await api.post('/api/login').send(helper.testLogin)

      const token = `Bearer ${loginResponse.body.token}`
      const userId = user.body.id

      newBlog = {
      "title": "testTitle3",
      "author": "testAuthor3",
      "likes": 10,
      "userId": userId
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: token })
        .expect(400)
    })
  })
  describe('deleting a blog', () => {
    test('deleting a blog works', async () => {
      const user = await api
        .post('/api/users')
        .send(helper.testUser)
      const loginResponse = await api.post('/api/login').send(helper.testLogin)

      const token = `Bearer ${loginResponse.body.token}`
      const userId = user.body.id

      newBlog = {
      "title": "testTitle3",
      "author": "testAuthor3",
      "url": "testURL3",
      "likes": 10,
      "userId": userId
      }

      const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: token })

      const blogsInitially = await api.get('/api/blogs')

      await api
        .delete(`/api/blogs/${addedBlog.body.id}`)
        .set({ Authorization: token })
        .expect(204)
      const blogsAfter = await api.get('/api/blogs')

      assert.equal(blogsInitially.body.length - 1, blogsAfter.body.length)
    })
  })

  describe('updating a blogs likes', () => {
    test('changing likes of the first blog', async () => {
      const blogs = await api.get('/api/blogs')
      const blog = blogs.body[0]
      const originalLikes = blog.likes
      blog.likes = 1000
      await api
        .put(`/api/blogs/${blog.id}`, blog)
        .send(blog)

      const updatedBlogs = await api.get('/api/blogs')
      const updatedBlog = updatedBlogs.body[0]
    
      assert.notStrictEqual(originalLikes, updatedBlog.likes)
      assert.equal(updatedBlog.likes, 1000)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('seikret', 10)
    const user = new User({username: 'root', passwordHash})

    await user.save()
    })

  test('creation succeeds with a unique username and a proper password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Magician',
      name: 'Fors',
      password: 'travellinG'
    }

     await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with a short username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Wu',
      name: 'Kong',
      password: 't532398hg'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      
    assert.strictEqual(response.body.error, 'User validation failed: username: must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with no username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '',
      name: 'Kong',
      password: 't532398hg'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      
    assert.strictEqual(response.body.error, 'User validation failed: username: is required')

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with a short password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Donkey',
      name: 'Kong',
      password: '12'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      
    assert.strictEqual(response.body.error, 'Password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with duplicate username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Kong',
      password: 't532398hg'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      
    assert.strictEqual(response.body.error, 'Username already exists')

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })


  after(async () => {
    await mongoose.connection.close()
  })


})

})