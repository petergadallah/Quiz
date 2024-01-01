import { useEffect, useState } from "react";

export default function QuestionTimer({ timer, onTimeOut }) {
  const [remainingTime, setRemainingTime] = useState(timer, onTimeOut);

  useEffect(() => {
    const timeoutHandler = setTimeout(onTimeOut, timer);
    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [onTimeOut, timer]);

  useEffect(() => {
    const intervalHandler = setInterval(() => {
      setRemainingTime((x) => x - 10);
    }, 10);

    return () => {
      clearInterval(intervalHandler);
    };
  }, []);

  return <progress id="question-time" value={remainingTime} max={timer} />;
}
