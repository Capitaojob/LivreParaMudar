import style from "./PanicButton.module.css";

export default function PanicButton({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={style.panic__button}>
      Botão do Pânico
    </button>
  );
}
