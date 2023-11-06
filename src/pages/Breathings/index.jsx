import breathings from "../../data/breathings.json";
import TitleAndSubtitle from "../../components/TitleAndSubtitle";
import LinkItem from "../../components/LinkItem";

export default function Breathings() {
  return (
    <main className="main__container">
      <TitleAndSubtitle
        title="Respirações Para Seu Dia"
        subtitle="Escolha entre nossa biblioteca de respirações para as mais diversas ocasiões e necessidades"
      />
      <div>
        {breathings.breathingExercises.map((breathing) => {
          return <LinkItem key={breathing.id} url={`/respiracoes/${breathing.id}`} title={breathing.name} description={breathing.description} />;
        })}
      </div>
    </main>
  );
}
