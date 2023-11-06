import LinkItem from "../../components/LinkItem";
import TitleAndSubtitle from "../../components/TitleAndSubtitle";
import quizzes from "../../data/quizData.json";

export default function Quiz() {
  return (
    <main className="main__container">
      <TitleAndSubtitle title="Nossos Quizzes" subtitle="Faça quizzes para descobrir mais sobre você e como facilitar o seu processo de cura" />
      <div>
        {quizzes.quizzes.map((quiz) => {
          return <LinkItem key={quiz.id} url={`/quiz/${quiz.id}`} title={quiz.title} description={quiz.description} />;
        })}
      </div>
    </main>
  );
}
