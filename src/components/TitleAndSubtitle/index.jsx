import style from "./TitleAndSubtitle.module.css";

export default function TitleAndSubtitle({ title, subtitle }) {
  return (
    <div className={style.text__container}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}
