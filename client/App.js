import React, { useState } from "react";
// import TodoListSSR from "./TodoListSSR";
import TodoListCSR from "./TodoListCSR";

const App = (props) => {
  // let [count, setCount] = useState(props.initCount);
  return (
    <html>
      <head></head>
      <body>
        {/* <div>
          this is a react component
          <div>{count}</div>
          <button onClick={() => setCount(count + 1)}>click on</button>
        </div> */}
        {/* <TodoListSSR todoList={props.todoList} /> */}
        <TodoListCSR />
      </body>
    </html>
  );
};

export default App;
