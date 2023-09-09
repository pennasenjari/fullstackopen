import { useState } from 'react'

const Blog = ( {blog} ) => { 
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className='textbox'>
      {blog.title} <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide' : 'View'}</button><br />
      {showDetails ? 
        <div>
          Author: {blog.author}<br />
          URL: {blog.url}<br />
          Likes: {blog.likes} <button>Like</button><br />
          {blog.user ? `Added by: ${blog.user.name}` : null}
        </div>
        : null}
    </div>  
  )
}

export default Blog