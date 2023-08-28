import { useState } from 'react'

const Blog = ( {blog} ) => { 
  const [showAll, setShowAll] = useState(false)

  return (
    <div>
      {showAll ? 
        <div className='textbox'>
          Title: {blog.title}<br />
          Author: {blog.author}<br />
          URL: {blog.url}<br />
          Likes: {blog.likes} <button>Like</button>
        </div>  
        :
        <div className='textbox'>
          {blog.title}
        </div>  
      }
      <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Hide' : 'View'}</button>
    </div>
  )
}

export default Blog