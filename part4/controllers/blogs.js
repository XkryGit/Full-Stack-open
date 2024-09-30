const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
require("express-async-errors");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    blogs: 0,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { title, author, user } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const userId = await User.findById(decodedToken.id);

  if (!title) {
    return response.status(400).json({ error: "Title is required" });
  }

  if (!author) {
    return response.status(400).json({ error: "Author is required" });
  }

  const blog = new Blog(request.body);

  const savedBlog = await blog.save();
  userId.blogs = userId.blogs ? userId.blogs.concat(savedBlog) : [savedBlog];
  await userId.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === request.user.id.toString()) {
    await Blog.deleteOne({ _id: request.params.id });
    response.sendStatus(204).end();
  } else {
    response.status(401).json({ error: "unauthorized operation" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;
  const id = request.params.id;

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
  });

  updatedBlog
    ? response.status(200).json(updatedBlog.toJSON())
    : response.status(404).end();
});

module.exports = blogsRouter;
