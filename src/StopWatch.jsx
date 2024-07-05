import React, { useState, useRef, useEffect } from "react";

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  };
  const stop = () => {
    setIsRunning(false);
  };
  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = () => {
    let hours = String(Math.floor(elapsedTime / (1000 * 60 * 60))).padStart(
      2,
      "0"
    );
    let minutes = String(
      Math.floor((elapsedTime / (1000 * 60) % 60))
    ).padStart(2, "0");
    let seconds = String(
      Math.floor((elapsedTime / (1000)))
    ).padStart(2, "0");
    let miliseconds = String(
      Math.floor((elapsedTime % 1000 / 10))
    ).padStart(2, "0");
    return `${minutes}:${seconds}:${miliseconds}`;
  };

  return (
    <div className="stop-watch-container">
        <h1>Stop Watch</h1>
      <div className="display">
        <h1 className="timer">{formatTime()}</h1>
      </div>
      <div className="controls">
        <button className="start-btn" onClick={start}>
          Start
        </button>
        <button className="stop-btn" onClick={stop}>
          Stop
        </button>
        <button className="reset-btn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
