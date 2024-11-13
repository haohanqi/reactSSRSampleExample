import React from "react";

const TodoList = ({ todoList }) => {
  return (
    <div>
      <form action="/api/todo/ssr/add" method="post">
        <label htmlFor="todo">new todo</label>
        <input type="text" name="content" id="todo" />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.text}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
