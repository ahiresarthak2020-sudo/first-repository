import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [mood, setMood] = useState("Happy");

  const moodDetails = {
    Happy: { emoji: "😊", message: "Keep smiling! Your happiness is contagious." },
    Excited: { emoji: "🤩", message: "Amazing things are waiting for you today!" },
    Calm: { emoji: "😌", message: "Take a deep breath and enjoy the moment." },
    Sad: { emoji: "💙", message: "It's okay to have a tough day. Be kind to yourself." },
    Tired: { emoji: "😴", message: "Remember to rest. You deserve a break." },
    Grateful: { emoji: "🙏", message: "Focus on the little things that make life beautiful." }
  };

  const reset = () => {
    setName("");
    setMood("Happy");
  };

  return (
    <div className="app">
      <div className="mood-card">
        <h1>Daily Mood Card</h1>
        <p className="subtitle">How are you feeling today?</p>

        <label htmlFor="username">Your Name</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="mood">Choose Your Mood</label>
        <select
          id="mood"
          value={mood}
          onChange={(event) => setMood(event.target.value)}
        >
          {Object.keys(moodDetails).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="mood-output">
          <div className="emoji">{moodDetails[mood].emoji}</div>
          <h2>{name.trim() ? `Hello, ${name.trim()}!` : "Hello, Friend!"}</h2>
          <h3>Today's mood: {mood}</h3>
          <p>{moodDetails[mood].message}</p>
        </div>

        <button onClick={reset}>Reset</button>
        <p className="footer">Made with React useState ⚛️</p>
      </div>
    </div>
  );
}

export default App;