const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Jari Pennanen',
    url: 'https://asdf.com/1',
    likes: '10'
  },
  {
    title: 'JavaScript is easy',
    author: 'Jari Pennanen',
    url: 'https://asdf.com/2',
    likes: '20'
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

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}