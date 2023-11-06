import { ArrowRight } from "react-feather";
import style from "./StyledButton.module.css";

export default function StyledButton({ children, type = "submit", arrow, variation = "default" }) {
  return (
    <button className={`${style.button} ${variation !== "default" ? style.solid : style.default}`} type={type}>
      {children}
      {arrow && <ArrowRight />}
    </button>
  );
}
