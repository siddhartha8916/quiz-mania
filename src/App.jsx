import React, { useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import StartQuiz from "./components/StartQuiz";

function App() {
  const [start, setStart] = useState(false);

  const handleStart = () => {
    setStart(true);
  };

  return (
    <div className="App">
      <div className="quiz-container">
        {!start && <StartQuiz handleStart={handleStart} />}
        {start && <Quiz handleStart={handleStart} />}
      </div>
    </div>
  );
}

export default App;
