const BlogForm = ({
  newTitle,
  newAuthor,
  newUrl,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
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