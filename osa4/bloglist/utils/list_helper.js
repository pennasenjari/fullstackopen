const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (!blogs || !blogs.length) return 0
  const total = blogs.map(item => item.likes).reduce((prev, next) => prev + next)
  return total
}

const favoriteBlog = (blogs) => {
  if (!blogs || !blogs.length) return null
  const favorite = blogs.reduce(function(prev, current) {
    return (prev.likes > current.likes) ? prev : current
  }) //returns object
  return favorite
}

const mostBlogs = (blogs) => {
  if (!blogs || !blogs.length) return null
  let blogCount = 0
  const bigBlogger = _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      'author': key,
      'blogs': blogCount += 1 }))
    .value()
    .reduce(function(prev, current) {
      return (prev.likes > current.likes) ? prev : current
    })
  return bigBlogger
}

const mostLikes = (blogs) => {
  if (!blogs || !blogs.length) return null
  const bigLikes = _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      'author': key,
      'likes': _.sumBy(objs, 'likes') }))
    .value()
    .reduce(function(prev, current) {
      return (prev.likes > current.likes) ? prev : current
    })
  return bigLikes
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}