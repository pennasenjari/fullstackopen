const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there are initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is amongst the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain(
      'JavaScript is easy'
    )
  })
})

describe('viewing a specific blog', () => {

  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 when id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  test('a blog has a field "id"', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('adding a new blog', () => {

  test('success with vaild data', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Jari Pennanen',
      url: 'https://asdf.com/11',
      likes: 99
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)

    expect(titles).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('fails with status code 400 with invalid data', async () => {
    const newBlog = {
      author: 'Jari Pennanen',
      url: 'https://asdf.com/12',
      likes: 99
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a blog\'s "likes" field has a default value 0', async () => {
    const newBlog = {
      title: 'Likes initial value set to 0',
      author: 'Jari Pennanen',
      url: 'https://asdf.com/13'
    }

    const testBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    expect(testBlog.body.likes).toBe(0)
  })

  test('if a blog title or URL is missing, API will response with "400 Bad Request"', async () => {
    let newBlog = {
      author: 'Jari Pennanen',
      url: 'https://asdf.com/14',
      likes: 99
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    newBlog = {
      title: 'Broken blog',
      author: 'Jari Pennanen',
      likes: 99
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deleting a blog', () => {

  test('succeeds with status code 204 if id is valid', async () => {
    const blogs = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .expect(204)
  })
})

describe('modifying a blog', () => {
  test('likes can be added', async () => {
    const blogs = await helper.blogsInDb()
    let newBlog = blogs[0]
    const newLikes = newBlog.likes + 1
    newBlog.likes = newLikes

    const res = await api
      .put(`/api/blogs/${blogs[0].id}`)
      .send(newBlog)

    expect(res.body.likes).toBe(newLikes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})