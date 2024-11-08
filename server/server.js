const babelRegister = require("@babel/register");

babelRegister({
  ignore: [/[\\\/](build|server|node_modules)[\\\/]/],
  presets: [["@babel/preset-react", { runtime: "automatic" }]],
  plugins: ["@babel/transform-modules-commonjs"],
});

const express = require("express");
const path = require("path");
const cors = require("cors");
const React = require("react");
const App = require("../client/App").default;
const { renderToString } = require("react-dom/server");

const app = express();
const PORT = 3001;

app.use(cors());

// Middleware to parse URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (if needed for other assets)
app.use(express.static(path.join(__dirname, "../dist")));

// Temporary data store (could be replaced with a database)
let todos = [
  { text: "Learn about MPAs" },
  { text: "Implement To-Do app with Express" },
];

app.get("/", (req, res) => {
  const reactElement = React.createElement(App);
  const html = renderToString(reactElement);
  res.send(html);
});

app.get("/ssr/react/hydration", (req, res) => {
  const reactElement = React.createElement(App);
  const reactHtml = renderToString(reactElement);
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>React SSR with Initial Props</title>
    </head>
    <body>
      <div id="root">${reactHtml}</div>
      <script src="/index.bundle.js" defer></script>
       <script src="/runtime.bundle.js" defer></script>
    </body>
    </html>
  `;

  res.send(html);
});

app.get("/ssr/react/withData", (req, res) => {
  const initialProps = { initCount: 10 };
  const reactElement = React.createElement(App, initialProps);
  const reactHtml = renderToString(reactElement);
  // Create HTML with embedded initial props
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>React SSR with Initial Props</title>
      <!-- Embed the initial props as JSON in a script tag -->
      <script>
        window.__INITIAL_PROPS__ = ${JSON.stringify(initialProps)};
      </script>
    </head>
    <body>
      <div id="root">${reactHtml}</div>
      <script src="/index.bundle.js" defer></script>
       <script src="/runtime.bundle.js" defer></script>
    </body>
    </html>
  `;
  res.send(html);
});

app.get("/ssr/traditionalSSR", (req, res) => {
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
