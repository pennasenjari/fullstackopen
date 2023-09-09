const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', 'username name')

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
  const body = req.body
  const user = req.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const savedBlogWithUser = await Blog.findById(savedBlog.id).populate('user', 'username name')
  res.status(201).send(savedBlogWithUser)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  const user = req.user

  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }
  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }
  if (user._id.toString() === blog.user.toString()) {
    await Blog.findOneAndDelete({ _id: req.params.id })
    res.status(204).end()
  } else {
    return res.status(401).json({ error: 'access denied' })
  }

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