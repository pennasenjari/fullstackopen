const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
let token = null
let user = null

beforeAll(async () => {
  /* Log user in and get current user */

  // get token
  const res = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'sekret'
    })
    .expect(200)
  token =  res.body.token

  // find user
  const decodedToken = jwt.verify(token, process.env.SECRET)
  user = await User.findById(decodedToken.id)
})

beforeEach(async () => {
  /* Reset blogs */

  // delete old blogs
  await Blog.deleteMany({})

  // delete references to old blogs from user
  await User.updateOne({ _id: user.id } ,{ blogs: null })

  // add initial blogs
  let newBlogs = []
  helper.initialBlogs.forEach((initialBlog) => {
    const newBlog = new Blog({
      title: initialBlog.title,
      author: initialBlog.author,
      url: initialBlog.url,
      likes: initialBlog.likes,
      user: user._id
    })
    newBlogs.push(newBlog)
  })
  const res = await Blog.insertMany(newBlogs)

  // add blog reference to user
  let blogIds = []
  res.forEach((blog) => {
    blogIds.push(blog._id)
  })
  await User.updateOne({ _id: user.id } ,{ blogs: blogIds })
})

describe('when there are initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is amongst the returned blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)

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
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(resultBlog.body.toString()).toEqual(blogToView.toString())
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })

  test('fails with statuscode 400 when id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })

  test('a blog has a field "id"', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)

    expect(response.body[0].id).toBeDefined()
  })
})

describe('adding a new blog', () => {

  test('success with vaild data', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Jari Pennanen',
      url: 'https://asdf.com/11',
      likes: 99,
      user: user.id
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
      likes: 99,
      user: user.id
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a blog\'s "likes" field has a default value 0', async () => {
    const newBlog = {
      title: 'Likes initial value set to 0',
      author: 'Jari Pennanen',
      url: 'https://asdf.com/13',
      user: user.id
    }

    const testBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    newBlog = {
      title: 'Broken blog',
      author: 'Jari Pennanen',
      likes: 99
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deleting a blog', () => {

  test('succeeds with status code 204 if id is valid', async () => {
    const blogs = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)

    expect(res.body.likes).toBe(newLikes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})