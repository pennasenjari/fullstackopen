import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user !== null) {
      getBlogs()
    }
  }, [user])

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      flashMessage(`A new blog '${createdBlog.title}' by ${createdBlog.author} created`, '')
    } catch (exception) {
      if (exception.response.data.error) {
        flashMessage(exception.response.data.error, 'error')
      } else {
        flashMessage('An error occurred', 'error')
      }
    }
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch (exception) {
      flashMessage('Incorrect username or password', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    
    try {
      setUser(null)
      setBlogs([])
      blogService.setToken(null)
      window.localStorage.removeItem('loggedBlogappUser')
      flashMessage('Logged out', '')
    } catch (exception) {
      flashMessage('Logout failed', 'error')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          value={username}
          name="Userna2020me"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
 
  const blogForm = () => (
    <Togglable buttonLabel="Create blog">
      <BlogForm
        onSubmit={addBlog}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
      />
    </Togglable>
  )

  const flashMessage = (text, type) => {
    setMessage([text, type])
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />
      {!user && loginForm()}
      {user && <div>
        <p>{user.name ? user.name : user.username} logged in <button onClick={handleLogout}>Log out</button></p>
        {blogForm()}
        <div>
          {blogs.map((blog, i) => 
            <Blog
              key={i}
              blog={blog} 
            />
          )}
        </div>
      </div>
      }
    </div>
  )
}

export default App