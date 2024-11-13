import React, { useState } from "react";

const App = ({ initCount = 0 }) => {
  let [count, setCount] = useState(initCount);
  return (
    <html>
      <head></head>
      <body>
        <div>
          this is a react component
          <div>{count}</div>
          <button onClick={() => setCount(count + 1)}>click on</button>
        </div>
      </body>
    </html>
  );
};

export default App;
