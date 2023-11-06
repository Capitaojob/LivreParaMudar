import style from "./MainBase.module.css";

export default function MainBase({ children }) {
  return <main className={style.main__container}>{children}</main>;
}
