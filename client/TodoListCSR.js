import React, { useEffect, useState } from "react";

const TodoList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTodoList = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/todo");
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setLoading(false);
      } else {
        throw new Error("Failed to fetch todo");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch("http://localhost:3001/api/todo/csr/add", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          content: event.currentTarget.elements.todo.value,
        }),
      });

      if (response.ok) {
        fetchTodoList();
      } else {
        throw new Error("Failed to fetch todo");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <form onSubmit={addTodo} method="POST">
        <label htmlFor="todo">new todo</label>
        <input type="text" name="content" id="todo" />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {data.map((todo) => (
          <li key={todo.text}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
