const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Jari Pennanen',
    url: 'https://asdf.com/1',
    likes: '10',
    user: null
  },
  {
    title: 'JavaScript is easy',
    author: 'Jari Pennanen',
    url: 'https://asdf.com/2',
    likes: '20',
    user: null
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'Jari Pennanen',
    url: 'https://asdf.com/3',
    likes: 30
  })

  await blog.save()
  const newId = blog.id
  await Blog.findByIdAndRemove(blog.id)
  return newId.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}