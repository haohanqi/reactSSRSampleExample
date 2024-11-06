import React, { useState } from "react";

const App = () => {
  let [count, setCount] = useState(0);
  return (
    <div>
      this is a react component
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>click on</button>
    </div>
  );
};

export default App;
