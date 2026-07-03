import { useEffect, useState } from "react";

function Timer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center shadow">
      <h3 className="text-red-600 font-bold text-lg">
        ⏱ Time Left
      </h3>

      <div className="text-3xl font-bold text-red-700 mt-2">
        {String(hours).padStart(2, "0")}:
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </div>
    </div>
  );
}

export default Timer;