import { X } from "react-feather";
import style from "./Modal.module.css";

export default function Modal({ children, onClose, title = "", subtitle = "" }) {
  return (
    <div className={style.modal}>
      <X className={style.close} size="30" onClick={onClose} />
      {title !== "" && <h3>{title}</h3>}
      {subtitle !== "" && <h4>{subtitle}</h4>}
      {children}
    </div>
  );
}
