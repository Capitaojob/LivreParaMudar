import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Instagram, MessageCircle } from "react-feather";
import { Link } from "react-router-dom";
import PopUpWarning from "../../components/PopUpWarning";
import waves from "/svgs/waves.svg";
import style from "./Login.module.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");
  const [warn, setWarn] = useState("Erro");
  const { onLogin } = useAuth();

  return (
    <main className={style.login__main}>
      <div className={style.center__container}>
        <img src={waves} alt="Waves" className={style.wave} />
        <div className={style.login__container}>
          <div>
            <h2>{getGreeting()}, bem-vindo(a) de volta!</h2>
          </div>
          <form>
            <input autoComplete="on" type="email" id="email" name="email" ref={emailRef} placeholder="Seu Email" required />
            <input type="password" id="password" name="password" ref={passwordRef} minLength="5" placeholder="Sua senha" required />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleLogin(emailRef.current.value, passwordRef.current.value, onLogin, setMessage, setWarn);
                setMessage("Realizando login");
                setWarn("Aguarde");
              }}
            >
              Login
            </button>
          </form>
          <h5>
            <Link to="/forgot-password">Esqueceu sua senha?</Link>
          </h5>
          <h4>Não tem uma conta, porém quer fazer parte da nossa comunidade? Entre em contato conosco!</h4>
          <div className={style.links}>
            <a href="https://www.instagram.com/luciana_angotti/" title="Conheça nosso Instagram!">
              <Instagram />
            </a>
            <a
              href="https://wa.me/5516994017765?text=Ola!%20Gostaria%20de%20saber%20mais%20sobre%20como%20fazer%20parte%20do%20Livre%20Para%20Mudar,%20poderia%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F"
              title="Entre em contato pelo Whatsapp"
            >
              <MessageCircle />
            </a>
          </div>
        </div>
        {message !== "" && <PopUpWarning warn={warn} description={message} />}
      </div>
    </main>
  );
}

async function handleLogin(email, password, onLogin, setMessage, setWarn) {
  try {
    await onLogin(email, password);
  } catch (error) {
    setWarn("Erro!");
    setMessage(error === "Network Error" ? "O erro foi do nosso lado! Aguarde alguns instantes enquanto resolvemos o problema" : error);
  }
}

function getGreeting() {
  const now = new Date();
  const hour = now.getHours();

  return hour >= 5 && hour > 12 ? "Bom-dia" : hour >= 12 && hour < 18 ? "Boa-Tarde" : "Boa-Noite";
}
