import { useMemo } from "react";

export default function Answers({
  activeQuestionIndex,
  activeQuestion,
  selectedAnswer,
  answerState,
  handleSelectAnswer,
}) {
  const shuffledAnswers = useMemo(() => {
    const copiedAnswers = [...activeQuestion.answers];
    return copiedAnswers.sort(() => Math.random() - 0.5);
  }, [activeQuestionIndex]);

  return (
    <ul id="answers">
      {shuffledAnswers.map((answer) => {
        let cssClass = "";
        let isSelected = selectedAnswer === answer;
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
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
