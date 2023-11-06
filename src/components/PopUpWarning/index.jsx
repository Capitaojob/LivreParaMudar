import style from "./PopUpWarning.module.css";

export default function PopUpWarning({ warn, description }) {
  return (
    <div className={style.popup}>
      <h6>{warn}</h6>
      <p>{description}</p>
    </div>
  );
}
