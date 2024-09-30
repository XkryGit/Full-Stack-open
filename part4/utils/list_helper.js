const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (favorite, current) => {
    return favorite.likes > current.likes
      ? favorite
      : { title: current.title, author: current.author, likes: current.likes };
  };

  return blogs.length === 0 ? {} : blogs.reduce(reducer, {});
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else {
    const authors = blogs.reduce((acc, blog) => {
      if (acc[blog.author]) {
        acc[blog.author] += 1;
      } else {
        acc[blog.author] = 1;
      }

      return acc;
    }, {});

    const authorWithMostBlogs = Object.keys(authors).reduce((a, b) =>
      authors[a] > authors[b] ? a : b
    );

    return {
      author: authorWithMostBlogs,
      blogs: authors[authorWithMostBlogs],
    };
  }
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else {
    const authors = blogs.reduce((acc, blog) => {
      if (acc[blog.author]) {
        acc[blog.author] += blog.likes;
      } else {
        acc[blog.author] = blog.likes;
      }

      return acc;
    }, {});

    const authorWithMostLikes = Object.keys(authors).reduce((a, b) =>
      authors[a] > authors[b] ? a : b
    );

    return {
      author: authorWithMostLikes,
      likes: authors[authorWithMostLikes],
    };
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
