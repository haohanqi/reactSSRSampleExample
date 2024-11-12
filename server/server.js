const babelRegister = require("@babel/register");
const staticHtmlTemplate = require("../utils/staticHtmlTemplate");

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
  const html = staticHtmlTemplate(undefined, reactHtml);

  res.send(html);
});

app.get("/ssr/react/withData", (req, res) => {
  const initialProps = { initCount: 10 };
  const reactElement = React.createElement(App, initialProps);
  const reactHtml = renderToString(reactElement);
  const html = staticHtmlTemplate(initialProps, reactHtml);
  res.send(html);
});

app.get("/ssr/traditionalSSR", (req, res) => {
  //res.sendFile(path.join(__dirname, "./server.example.html"));
  const html = `
  <!DOCTYPE html>
  <html>
    <body>
      <p>
        this is a traditional server side render serverPage <br />Backend will
        return html to the browser
      </p>
      <form action="/api/todo/add" method="post">
        <label for="todo">new todo</label>
        <input type="text" name="content" id="todo" />
        <button type="submit">Submit</button>
      </form>
      <ul>
        ${todos.map((todo) => `<li>${todo.text}</li>`).join("")}
      </ul>
    </body>
  </html>
  `;
  res.send(html);
});

// Handle new to-do submission
app.post("/api/todo/add", (req, res) => {
  console.info("todo add:", JSON.stringify(req.body));
  const newTodo = req.body["content"];
  if (newTodo) {
    todos.push({ text: newTodo });
  }
  // Redirect to /todo to display updated list
  res.redirect("http://localhost:3001/ssr/traditionalSSR");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
