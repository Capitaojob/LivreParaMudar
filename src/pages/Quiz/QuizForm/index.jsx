import { useParams } from "react-router-dom";
import TitleAndSubtitle from "../../../components/TitleAndSubtitle";
import quizData from "../../../data/quizData.json";
import style from "./QuizForm.module.css";
import StyledButton from "../../../components/StyledButton";

export default function QuizForm() {
  const { id } = useParams();
  const currentQuiz = quizData.quizzes.find((quiz) => quiz.id === parseInt(id));

  return (
    <main className="main__container">
      <TitleAndSubtitle title={currentQuiz.title} subtitle={currentQuiz.description} />
      <form className={style.form}>
        {currentQuiz.questionsAndOptions.map((questionAndAnswers) => {
          return (
            <div key={questionAndAnswers.id}>
              <h3>{questionAndAnswers.question}</h3>
              {questionAndAnswers.options.map((option) => {
                return (
                  <label key={option}>
                    <input required type="radio" value={option} name={questionAndAnswers.id} /> {option}
                  </label>
                );
              })}
            </div>
          );
        })}
        <StyledButton type="submit" arrow={true}>
          Ver Resultado
        </StyledButton>
      </form>
    </main>
  );
}
