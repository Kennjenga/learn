const express = require("express");

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// For simplicity, let's assume the database is an in-memory array
const users = [
  // Existing users...
  { id: 1, name: "John Doe", age: 30 },
];

// CRUD operations
// get request on the server on the route
app.get("/", function (req, res) {
  //   res.send(`Welcome to the API! `);
  res.json(users);
});

// post user
app.post("/", function (req, res) {
  const { name, age } = req.body;
  // Add the new user to the database

  const newUser = { id: users.length + 1, name, age };
  users.push(newUser);
  res.status(201).json(newUser);
});

// get by id
app.get("/:id", function (req, res) {
  const { id } = req.params;
  const user = users.find((u) => u.id === parseInt(id));
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
});

// patch by id
app.patch("/:id", function (req, res) {
  const { id } = req.params;
  const { name, age } = req.body;

  const user = users.find((u) => u.id === parseInt(id));
  if (!user) {
    return res.status(404).send("User not found");
  }

  user.name = name || user.name;
  user.age = age || user.age;

  res.json(user);
});

// delete by id
app.delete("/:id", function (req, res) {
  const { id } = req.params;

  const index = users.findIndex((u) => u.id === parseInt(id));
  if (index === -1) {
    return res.status(404).send("User not found");
  }

  users.splice(index, 1);
  res.sendStatus(204);
});

// Set the port number
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
