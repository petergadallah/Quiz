import { useEffect, useState } from "react";

export default function QuestionTimer({ timer, onTimeOut }) {
  const [remainingTime, setRemainingTime] = useState(timer, onTimeOut);

  useEffect(() => {
    console.log("TImeOUT");

    setTimeout(onTimeOut, timer);
  }, [onTimeOut, timer]);

  useEffect(() => {
    const intervalHandler = setInterval(() => {
      setRemainingTime((x) => x - 20);
    }, 20);
    return () => {
      clearInterval(intervalHandler);
    };
  }, []);

  return <progress id="question-time" value={remainingTime} max={timer} />;
}
