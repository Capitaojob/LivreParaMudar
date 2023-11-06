import { Link, useNavigate } from "react-router-dom";
import style from "./Error404.module.css";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <main className="main__container">
      <div className={style.error__container}>
        <h1>Oops! Página não encontrada</h1>
        <p>Não encontramos a página que você estava buscando</p>
        <div>
          <Link to="/">Voltar para o início</Link>
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Voltar para a última página
          </button>
        </div>
      </div>
    </main>
  );
}
