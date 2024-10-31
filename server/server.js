const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());

// Middleware to parse URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Temporary data store (could be replaced with a database)
let todos = [
  { text: "Learn about MPAs" },
  { text: "Implement To-Do app with Express" },
];

// Serve static files (if needed for other assets)
// app.use(express.static(path.join(__dirname, "dist")));

app.get("/api/serverPage", (req, res) => {
  res.sendFile(path.join(__dirname, "./server.example.html"));
});

// To-Do list route
app.get("/api/todo", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <ul>${todos.map((todo) => `<li>${todo.text}</li>`).join("")}</ul>`);
});

// Handle new to-do submission
app.post("/api/todo/add", (req, res) => {
  console.info("todo add:", JSON.stringify(req.body));
  const newTodo = req.body["content"];
  if (newTodo) {
    todos.push({ text: newTodo });
  }
  // Redirect to /todo to display updated list
  res.redirect("http://localhost:8080");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
