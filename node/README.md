# Express App Overview

This document provides an overview of the functionalities implemented in the simple Express app.

## Middleware

- `app.use(express.json());`: This middleware is used to parse JSON request bodies.

## In-Memory Database

- The app uses an in-memory array `users` to store user data.

```javascript
const users = [{ id: 1, name: "John Doe", age: 30 }];
```

## CRUD Operations

### Get All Users

- **Route:** `GET /`
- **Description:** Retrieves all users.
- **Response:** Returns a JSON array of all users.

```javascript
app.get("/", function (req, res) {
  res.json(users);
});
```

### Create a New User

- **Route:** `POST /`
- **Description:** Adds a new user to the database.
- **Request Body:** JSON object with `name` and `age`.
- **Response:** Returns the newly created user with a status code of 201.

```javascript
app.post("/", function (req, res) {
  const { name, age } = req.body;
  const newUser = { id: users.length + 1, name, age };
  users.push(newUser);
  res.status(201).json(newUser);
});
```

### Get User by ID

- **Route:** `GET /:id`
- **Description:** Retrieves a user by their ID.
- **Response:** Returns the user object if found, otherwise a 404 status code.

```javascript
app.get("/:id", function (req, res) {
  const { id } = req.params;
  const user = users.find((u) => u.id === parseInt(id));
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
});
```

### Update User by ID

- **Route:** `PATCH /:id`
- **Description:** Updates a user's information by their ID.
- **Request Body:** JSON object with `name` and/or `age`.
- **Response:** Returns the updated user object if found, otherwise a 404 status code.

```javascript
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
```

### Delete User by ID

- **Route:** `DELETE /:id`
- **Description:** Deletes a user by their ID.
- **Response:** Returns a 204 status code if the user is successfully deleted, otherwise a 404 status code.

```javascript
app.delete("/:id", function (req, res) {
  const { id } = req.params;
  const index = users.findIndex((u) => u.id === parseInt(id));
  if (index === -1) {
    return res.status(404).send("User not found");
  }
  users.splice(index, 1);
  res.sendStatus(204);
});
```

## Server Setup

- The server listens on port 3000.

```javascript
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
```
