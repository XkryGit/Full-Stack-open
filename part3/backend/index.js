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
  Phones.findById(request.params.id).then((Phone) => {
    if (Phone) {
      response.json(Phone);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  Phones.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => console.log(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const person = new Phones({
    name: body.name,
    number: body.number,
  });

  if (!body.name) {
    return response.status(400).json({
      error: "Name missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "Number missing",
    });
  }

  person
    .save()
    .then((person) => {
      response.json(person);
    })
    .catch((error) => console.log(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
