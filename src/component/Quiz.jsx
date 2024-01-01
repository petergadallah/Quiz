import { useCallback, useMemo, useRef, useState } from "react";
import QUESTIONS from "../questions";
import QuestionTimer from "../component/QuestionTimer";
import img from "../assets/quiz-complete.png";
import Answers from "./Answers";
import Summary from "./Summary";
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
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
    return <Summary userAnswers={userAnswers} />;
  }
  let activeQuestion = QUESTIONS[activeQuestionIndex];

  return (
    <div id="quiz">
      <div id="questions">
        <QuestionTimer
          key={activeQuestionIndex}
          timer={8 * 1000}
          onTimeOut={() => {
            handleSelectAnswer(null);
          }}
        />
        <p>{activeQuestion.text}</p>

        <Answers
          answers={activeQuestion.answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          activeQuestion={activeQuestion}
          handleSelectAnswer={handleSelectAnswer}
          key={activeQuestionIndex + 10}
        />
      </div>
    </div>
  );
}
