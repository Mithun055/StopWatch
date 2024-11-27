import './App.css';
import { useState, useEffect } from "react";

function App() {
  const prev=[];
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      prev.push(time);
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Cleanup interval on unmount or dependency change
  }, [running]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1>{prev[1]}</h1>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Stopwatch</h1>
      <div className="text-4xl font-mono text-gray-700">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className="mt-6 space-x-4">
        {running ? (
          <button
            onClick={() => setRunning(false)}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={() => setRunning(true)}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-400"
          >
            Start
          </button>
        )}
        <button
          onClick={() => setTime(0)}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;

