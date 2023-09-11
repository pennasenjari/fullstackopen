import { useState } from 'react'

const Blog = ( {blog, removeBlog, likeBlog} ) => { 
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className='textbox'>
      {blog.title} <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide' : 'View'}</button><br />
      {showDetails ? 
        <div>
          Author: {blog.author}<br />
          URL: {blog.url}<br />
          Likes: {blog.likes} <button onClick={() => likeBlog(blog)}>Like</button><br />
          {blog.user ? <div>Added by: {blog.user.name}<br /></div> : null}
          <button onClick={() => {if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
            removeBlog(blog)}}}>Remove</button>
        </div>
        : null}
    </div>  
  )
}

export default Blog