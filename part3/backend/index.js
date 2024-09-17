const http = require("http");
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Phones = require("./models/phones");

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("dist"));

app.get("/info", (request, response) => {
  const date = new Date();
  Phones.find({}).then((Phones) => {
    response.send(
      `<div> <p>Phonebook has info for ${Phones.length} people</p> <p>${date}</p></div>`
    );
  });
});

app.get("/api/persons", (request, response) => {
  Phones.find({}).then((Phone) => {
    response.json(Phone);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const Phone = Phones.find((Phone) => Phone.id === id);

  if (Phone) {
    response.json(Phone);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  Phones = Phones.filter((Phone) => Phone.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  const personExists = Phones.find((Phone) => Phone.name === body.name);

  if (personExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: Math.floor(Math.random() * 1000000),
    name: body.name,
    number: body.number,
  };

  Phones = Phones.concat(person);

  response.json(Phones);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
