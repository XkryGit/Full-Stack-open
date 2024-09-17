const http = require("http");
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("dist"));

app.get("/info", (request, response) => {
  const date = new Date();
  Person.find({}).then((Phones) => {
    response.send(
      `<div> <p>Phonebook has info for ${Phones.length} people</p> <p>${date}</p></div>`
    );
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((Phone) => {
    response.json(Phone);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((Phone) => {
    if (Phone) {
      response.json(Phone);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).send({ error: "Person not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      response.status(500).send({ error: "Server error" });
    });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  } else {
    const person = new Person({
      name: body.name,
      number: body.number,
    });

    person
      .save()
      .then((person) => {
        response.json(person);
      })
      .catch((error) => next(error));
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
