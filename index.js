const express = require("express");
const logger = require("morgan");
const app = express();
const cors = require("cors");
app.use(logger("tiny"));
app.use(express.json());
app.use(cors());
app.use(express.static("build"));


console.log("app started");
var now = new Date();

const generateId = () => {
  let id = Math.round(Math.random(100000));
  const ids = persons.map((p) => p.id);
  while (ids.includes(id) || id <= 0) {
    console.log(id);
    id = Math.round(Math.random(100000) * 100);
  }
  return id;
};
let persons = [
  
];

app.get("/", (request, response) => {
  console.log("/ visited");
  response.send("<h1>Hello, World!</h1>");
});

app.get("/api/persons", (request, response) => {
  console.log("user asked for phonebook", persons);
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log("user asked for person of id", id);
  const person = persons.find((p) => {
    return p.id === id;
  });

  console.log(person);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const person = {
    content: body.name,
    important: body.number,
    id: generateId(),
  };
  console.log(person);
  persons = persons.concat(person);

  response.json(person);
});

app.delete("/api/persons/:id", (request, responnse) => {
  const id = Number(request.params.id);
  console.log("user asked to delete the person at id :", id, persons[id - 1]);
  const person = persons.find((p) => p.id === id);
  if (persons.includes(person)) {
    persons = persons.filter((p) => p.id !== id);
    responnse.json(persons);
  } else {
    responnse.status(404).end();
  }
});

app.post("/api/persons/", (request, response) => {
  const body = request.body;
  if (!body.content || !body.number) {
    return response.status(404).json({
      error: "missing content",
    });
  }
  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  console.log(`user asked to add a person  with id ${newPerson.id}`, newPerson);
  persons = persons.concat(newPerson);
  response.json(persons);
});

app.get("/info", (request, response) => {
  console.log("/ visited");
  response.send(`<div>
  <p>Phonebook has info for ${persons.length}  people</p>
  <p>${now.toDateString()} ${now.toTimeString()}</P>
  </div>`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
