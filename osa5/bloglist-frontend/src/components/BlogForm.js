import { useState } from 'react'

const BlogForm = ( {createBlog} ) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    createBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        Title: <input value={newTitle} onChange={handleTitleChange} /><br />
      </div>
      <div>
        Author: <input value={newAuthor} onChange={handleAuthorChange} /><br />
      </div>
      <div>
        URL: <input value={newUrl} onChange={handleUrlChange} /><br />
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  )
}

export default BlogForm