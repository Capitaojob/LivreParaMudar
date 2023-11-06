import { MessageCircle, Instagram } from "react-feather";
import styles from "./About.module.css";

export default function About() {
  return (
    <main className="main__container">
      <div className={styles.about}>
        <h2>Sobre o Livre Para Mudar</h2>
        <p>O Livre Para Mudar é um projeto criado por Luciana Chioro Angotti com o objetivo de ajudar alunas do curso a melhorar.</p>

        <h3>Nossa Missão</h3>
        <p>
          Nossa missão é fornecer recursos educacionais de alta qualidade para mulheres em busca de conhecimento e desenvolvimento pessoal.
          Acreditamos que a educação é a chave para a transformação.
        </p>

        <h3>Nossos Valores</h3>
        <ul>
          <li>Excelência educacional</li>
          <li>Empoderamento feminino</li>
          <li>Comunidade solidária</li>
        </ul>

        <h3>Conheça Nossa Equipe</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida, urna in fringilla cursus.</p>

        <h3>Nos Siga nas Redes Sociais</h3>
        <div className={styles.socialLinks}>
          <a href="https://www.instagram.com/luciana_angotti/" target="_blank" rel="noopener noreferrer">
            <Instagram size={36} />
          </a>
          <a
            href="https://wa.me/5516994017765?text=Ola!%20Gostaria%20de%20saber%20mais%20sobre%20como%20fazer%20parte%20do%20Livre%20Para%20Mudar,%20poderia%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={36} />
          </a>
        </div>
      </div>
    </main>
  );
}
