import { useCallback, useRef, useState } from "react";
import QUESTIONS from "../questions";
import QuestionTimer from "../component/QuestionTimer";
import img from "../assets/quiz-complete.png";
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
  const shuffledAnswers = useRef();
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (answer) => {
      setUserAnswers((prevArray) => [...prevArray, answer]);
      setAnswerState("answered");

      setTimeout(() => {
        if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={img} />
        <h2>Quiz ended</h2>
      </div>
    );
  }
  let activeQuestion = QUESTIONS[activeQuestionIndex];

  if (!shuffledAnswers.current) {
    const copiedAnswers = [...activeQuestion.answers];
    shuffledAnswers.current = copiedAnswers.sort(() => Math.random() - 0.5);
  }

  return (
    <div id="quiz">
      <div id="questions">
        <p>{activeQuestion.text}</p>
        <ul id="answers">
          <QuestionTimer
            key={activeQuestionIndex}
            timer={5 * 1000}
            onTimeOut={() => {
              handleSelectAnswer(null);
            }}
          />
          {shuffledAnswers.current.map((answer) => {
            let cssClass = "";
            let isSelected = userAnswers[userAnswers.length - 1] === answer;
            if (answerState === "answered" && isSelected) {
              cssClass = "selected";
            }
            if (answerState === "correct" && isSelected) {
              cssClass = "correct";
            }
            if (answerState === "wrong" && isSelected) {
              cssClass = "wrong";
            }
            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
