const { test, after, beforeEach } = require("node:test");
const assert = require("assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f1",
    title: "Understanding JavaScript Closures",
    author: "John Doe",
    url: "https://example.com/js-closures",
    likes: 150,
    user: "66f693ebbdef5e18b505ef79",
  },
  {
    _id: "5a422a851b54a676234d17f2",
    title: "JavaScript Closures",
    author: "Don Nadie",
    url: "https://example.com/js-patata",
    likes: 50,
    user: "66f693ebbdef5e18b505ef79",
  },
  {
    _id: "5a422a851b54a676234d17f3",
    title: "Closures Potatoes",
    author: "Juan Donald",
    url: "https://example.com/patatoespoting",
    likes: 250,
    user: "66f693ebbdef5e18b505ef79",
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[2]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 3);
});

test("blogs have id property named id instead of _id", async () => {
  const response = await api.get("/api/blogs");

  const ids = response.body.map((blog) => blog.id);

  ids.forEach((id) => {
    assert(id);
  });
});

test("a valid blog can be added ", async () => {
  const user = {
    username: "Xkry",
    password: "fofito",
  };
  const loginUser = await api.post("/api/login").send(user);

  const newBlog = {
    title: "Como conocí a vuestra madre",
    author: "Adolfo Zambrana",
    url: "https://example.com/AZ",
    likes: 75,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loginUser.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  assert.strictEqual(response.body.length, 4);
  assert(titles.includes("Como conocí a vuestra madre"));
});

test("if likes property is missing, it will default to 0", async () => {
  const user = {
    username: "Xkry",
    password: "fofito",
  };
  const loginUser = await api.post("/api/login").send(user);

  const newBlog = {
    title: "Como conocí a vuestra madre",
    author: "Adolfo Zambrana",
    url: "https://example.com/AZ",
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loginUser.body.token}`)
    .send(newBlog);
  assert.strictEqual(response.body.likes, 0);
});

test("if title property is missing, the server response with a '400 Bad Request' code", async () => {
  const user = {
    username: "Xkry",
    password: "fofito",
  };
  const loginUser = await api.post("/api/login").send(user);

  const newBlog = {
    author: "Adolfo Zambrana",
    url: "https://example.com/AZ",
    likes: 75,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loginUser.body.token}`)
    .send(newBlog)
    .expect(400);
});

test("Delete a blog", async () => {
  const user = {
    username: "Xkry",
    password: "fofito",
  };
  const loginUser = await api.post("/api/login").send(user);

  await api
    .delete(`/api/blogs/${initialBlogs[0]._id}`)
    .set("Authorization", `Bearer ${loginUser.body.token}`)
    .expect(204);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length - 1);
});

test("Fail Delete a blog if dont send the token", async () => {
  await api.delete(`/api/blogs/${initialBlogs[0]._id}`).expect(401);
});

test("update succeeds with status 200 if id is valid", async () => {
  const blogToUpdate = initialBlogs[0];

  await api
    .put(`/api/blogs/${blogToUpdate._id}`)
    .send({ likes: 10 })
    .expect(200);
});

after(async () => {
  await mongoose.connection.close();
});
