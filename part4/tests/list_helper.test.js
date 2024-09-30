const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
  });
});

describe("total likes", () => {
  test("total likes with empty array", () => {
    const blogs = [];

    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 0);
  });
  test("total likes with an array", () => {
    const blogs = [
      {
        title: "Understanding JavaScript Closures",
        author: "John Doe",
        url: "https://example.com/js-closures",
        likes: 50,
        id: "5573",
      },
      {
        title: "A Guide to CSS Flexbox",
        author: "Jane Smith",
        url: "https://example.com/css-flexbox",
        likes: 100,
        id: "fac9",
      },
      {
        title: "Mastering React Hooks",
        author: "Alice Johnson",
        url: "https://example.com/react-hooks",
        likes: 50,
        id: "a550",
      },
    ];

    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 200);
  });
});

describe("favorite blog", () => {
  test("favorite blog with empty array", () => {
    const blogs = [];

    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, {});
  });
  test("favorite blog with an array", () => {
    const blogs = [
      {
        title: "Understanding JavaScript Closures",
        author: "John Doe",
        url: "https://example.com/js-closures",
        likes: 50,
        id: "5573",
      },
      {
        title: "A Guide to CSS Flexbox",
        author: "Jane Smith",
        url: "https://example.com/css-flexbox",
        likes: 100,
        id: "fac9",
      },
      {
        title: "Mastering React Hooks",
        author: "Alice Johnson",
        url: "https://example.com/react-hooks",
        likes: 50,
        id: "a550",
      },
    ];

    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, {
      title: "A Guide to CSS Flexbox",
      author: "Jane Smith",
      likes: 100,
    });
  });
});

describe("most blogs", () => {
  test("most blog with empty array", () => {
    const blogs = [];

    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, {});
  });
  test("most blog with an array", () => {
    const blogs = [
      {
        title: "Understanding JavaScript Closures",
        author: "Alice Johnson",
        url: "https://example.com/js-closures",
        likes: 50,
        id: "5573",
      },
      {
        title: "A Guide to CSS Flexbox",
        author: "Jane Smith",
        url: "https://example.com/css-flexbox",
        likes: 100,
        id: "fac9",
      },
      {
        title: "Mastering React Hooks",
        author: "Alice Johnson",
        url: "https://example.com/react-hooks",
        likes: 50,
        id: "a550",
      },
      {
        title: "Mastering Pepe",
        author: "Pepillo Perez",
        url: "https://example.com/react-hooks",
        likes: 50,
        id: "a550",
      },
    ];

    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, {
      author: "Alice Johnson",
      blogs: 2,
    });
  });
});

describe("most Likes", () => {
  test("most Likes with empty array", () => {
    const blogs = [];

    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, {});
  });
  test("most blog with an array", () => {
    const blogs = [
      {
        title: "Understanding JavaScript Closures",
        author: "Alice Johnson",
        url: "https://example.com/js-closures",
        likes: 150,
        id: "5573",
      },
      {
        title: "A Guide to CSS Flexbox",
        author: "Jane Smith",
        url: "https://example.com/css-flexbox",
        likes: 100,
        id: "fac9",
      },
      {
        title: "Mastering React Hooks",
        author: "Alice Johnson",
        url: "https://example.com/react-hooks",
        likes: 50,
        id: "a550",
      },
      {
        title: "Mastering Pepe",
        author: "Pepillo Perez",
        url: "https://example.com/react-hooks",
        likes: 50,
        id: "a550",
      },
    ];

    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, {
      author: "Alice Johnson",
      likes: 200,
    });
  });
});
