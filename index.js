// CREATE CRUD APP FOR TODO LIST USING EXPRESS AND ARRAY AS DATABASE
import express from "express";
const app = express();

app.use(express.json());

const todos = [];

// Create a new todo
app.post("/", (req, res) => {
  const { title, description } = req.body;
  const newTodo = {
    id: todos.length + 1,
    title,
    description,
    completed: false,
  };
  console.log(newTodo);
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Get all todos
app.get("/", (req, res) => {
  res.status(200).json(todos);
});

// update a todo
app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }
  const updatedTodo = {
    ...todos[todoIndex],
    title,
    description,
    completed,
  };
  todos[todoIndex] = updatedTodo;
  res.status(200).json(updatedTodo);
});

// update single todo
app.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }
  const updatedTodo = {
    ...todos[todoIndex],
    title,
    description,
    completed,
  };
  todos[todoIndex] = updatedTodo;
  res.status(200).json(updatedTodo);
});

// Delete a todo

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));

  const deletedTodo = todos[todoIndex];
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }
  todos.splice(todoIndex, 1);
  res.status(200).json(deletedTodo);
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
