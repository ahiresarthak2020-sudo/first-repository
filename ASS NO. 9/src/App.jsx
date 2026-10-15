
import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="app">
      <div className="counter-card">
        <h1>React Counter App</h1>
        <p className="subtitle">Using the useState Hook</p>

        <div className="count">{count}</div>

        <div className="buttons">
          <button className="minus" onClick={decrease}>
            −1
          </button>

          <button className="reset" onClick={reset}>
            Reset
          </button>

          <button className="plus" onClick={increase}>
            +1
          </button>
        </div>

        <p className="footer">Built with React ⚛️</p>
      </div>
    </div>
  );
}

export default App;
