const { test, after, beforeEach } = require("node:test");
const assert = require("assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

const initialUsers = [
  {
    _id: "66f693ebbdef5e18b505ef79",
    username: "Xkry",
    name: "Adolfo",
    passwordHash:
      "$2b$10$PeAdsSiISsZaP6osIa1fLu232w9l185jFChpGRpiFkKX7GAlXKfxC",
    blogs: [],
  },
];

beforeEach(async () => {
  await User.deleteMany({});

  let blogObject = new User(initialUsers[0]);
  await blogObject.save();
});

test("get users", async () => {
  const response = await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, 1);
  assert.strictEqual(response.body[0].username, "Xkry");
});

test("create a valid user", async () => {
  const newUser = {
    username: "XkryPP",
    name: "Adolfo",
    password: "126367",
  };
  await api.post("/api/users").send(newUser).expect(201);
});

test("create a not valid user for short password", async () => {
  const newUser = {
    username: "Xkry",
    name: "Adolfo",
    password: "1",
  };
  await api.post("/api/users").send(newUser).expect(400);
});

test("create a not valid user for short username", async () => {
  const newUser = {
    username: "X",
    name: "Adolfo",
    password: "136567456",
  };
  await api.post("/api/users").send(newUser).expect(400);
});

after(async () => {
  await mongoose.connection.close();
});
