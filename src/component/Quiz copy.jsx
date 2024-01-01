import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import QuestionTimer from "../component/QuestionTimer";
import img from "../assets/quiz-complete.png";
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={img} />
        <h2>Quiz ended</h2>
      </div>
    );
  }
  let activeQuestion = QUESTIONS[activeQuestionIndex];

  const copiedAnswers = [...activeQuestion.answers];
  const shuffledAnswers = copiedAnswers.sort(() => Math.random() - 0.5);

  const handleSelectAnswer = useCallback((answer) => {
    setUserAnswers((prevArray) => [...prevArray, answer]);
  }, []);

  return (
    <div id="quiz">
      <div id="questions">
        <p>{activeQuestion.text}</p>
        <ul id="answers">
          <QuestionTimer
            timer={5 * 1000}
            onTimeOut={() => {
              handleSelectAnswer(null);
            }}
          />
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
