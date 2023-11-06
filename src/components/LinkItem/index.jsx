import { Link } from "react-router-dom";
import style from "./LinkItem.module.css";

export default function LinkItem({ url, title, description }) {
  return (
    <Link to={url ?? "/404"} className={style.link__item}>
      <div>
        <h2>{title}</h2>
        <span>{description}</span>
      </div>
    </Link>
  );
}
