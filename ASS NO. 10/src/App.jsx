import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  return (
    <div className="app">
      <div className="card">
        <h1>Text Display App</h1>

        <input
          type="text"
          placeholder="Enter your text here..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />

        <h2>Output:</h2>
        <h1>{text || "Your text will appear here"}</h1>
      </div>
    </div>
  );
}

export default App;