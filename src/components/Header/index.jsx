import { useState } from "react";
import { Menu } from "react-feather";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import style from "./Header.module.css";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { token, onLogout } = useAuth();

  function handleSidebarChange() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  return (
    <header>
      <div>
        <Link to="/" className={style.logo}>
          <span>Livre Para Mudar</span>
        </Link>
      </div>
      {token && (
        <>
          <button
            type="button"
            onClick={handleSidebarChange}
            className={`${isSidebarOpen ? style.open__menu : style.closed__menu} ${style.mobile__menu__icon}`}
          >
            <Menu />
          </button>
          <nav data-navigation className={`${style.menu__links} ${isSidebarOpen ? style.nav__toggled : ""}`}>
            <ul>
              <li>
                <Link to="/" onClick={closeSidebar}>
                  Início
                </Link>
              </li>
              <li>
                <Link to="/sobre" onClick={closeSidebar}>
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/respiracoes" onClick={closeSidebar}>
                  Respirações
                </Link>
              </li>
              <li>
                <Link to="/quiz" onClick={closeSidebar}>
                  Quiz
                </Link>
              </li>
              <li>
                <button type="button" onClick={onLogout}>
                  Sair
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
