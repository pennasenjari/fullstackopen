const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    res.status(404).end()
  } else {
    res.json(blog)
  }
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  await blog.save()
  res.status(201).send(blog)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true })

  res.json(updatedBlog)
})

module.exports = blogsRouter