import img from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";
export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );
  const wrongAnswers = userAnswers.filter(
    (answer, index) => answer !== QUESTIONS[index].answers[0] && answer
  );
  return (
    <div id="summary">
      <img src={img} />
      <h2>Quiz ended</h2>
      <div id="summary-stats">
        <p>
          <span className="number">
            {((skippedAnswers.length / QUESTIONS.length) * 100).toFixed(1)}%
          </span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">
            {((correctAnswers.length / QUESTIONS.length) * 100).toFixed(1)}%
          </span>
          <span className="text">answered Correctly</span>
        </p>
        <p>
          <span className="number">
            {((wrongAnswers.length / QUESTIONS.length) * 100).toFixed(1)}%
          </span>
          <span className="text">answered Incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          console.log(QUESTIONS[index].text);
          let cssClass = "user-answer";
          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
