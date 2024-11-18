import { useState } from 'react';

const AddBlog = ({
  createBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  const handleCreate = (event) => {
    event.preventDefault();
    createBlog({ title: title, author: author, url: url });
  };

  return (
    <>
      <form onSubmit={handleCreate}>
        <div className="blocks">
          Title
          <input
            type="text"
            value={title}
            name="Title"
            placeholder="write title here"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="blocks">
          Author
          <input
            type="text"
            value={author}
            placeholder="write author here"
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="blocks">
          Url
          <input
            type="text"
            value={url}
            name="Url"
            placeholder="write url here"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button
          className="buttonSpecial"
          id="create-button"
          onClick={handleCreate}
        >
          Create new blog
        </button>
      </form>
    </>
  );
};

export default AddBlog;
