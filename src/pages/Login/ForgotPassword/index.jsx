// ForgotPassword.js
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUpWarning from "../../../components/PopUpWarning";
import waves from "/svgs/waves.svg";
import style from "../Login.module.css";
import http from "../../../http";

export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentCode, setCurrentCode] = useState("");
  const [warn, setWarn] = useState("Erro");
  const [message, setMessage] = useState("");
  const inputRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const buttonRef = useRef();
  const navigate = useNavigate();

  const handleForgotPassword = async (email) => {
    if (currentStep === 0) {
      try {
        const response = await http.post("api/send-code", { email });
        console.log("Response: ", response);
        const { code } = await response.data;
        console.log(code);
        setCurrentCode(code);
      } catch (error) {
        setWarn("Erro!");
        setMessage(
          error.data === "Network Error"
            ? "O erro foi do nosso lado! Aguarde alguns instantes enquanto resolvemos o problema"
            : error.response.data.error
        );
        return;
      }

      setCurrentEmail(inputRef.current.value);
      titleRef.current.innerText = "Código Enviado! Verifique seu Email.";
      descriptionRef.current.innerText = "Verifique o código enviado por email e copie-o abaixo para redefinir a senha.";
      buttonRef.current.innerText = "Verificar código";
    } else if (currentStep === 1) {
      if (currentCode === inputRef.current.value) {
        titleRef.current.innerText = "Código Válido! Digite a nova senha.";
        descriptionRef.current.innerText = "Digite a nova senha que você deseja usar para a sua conta.";
        buttonRef.current.innerText = "Submeter";
      } else {
        setWarn("Erro!");
        setMessage("Código inválido, tente novamente.");
        return;
      }
    } else if (currentStep === 2) {
      if (inputRef.current.value.length < 6 || !/[A-Za-z]/.test(inputRef.current.value) || !/\d/.test(inputRef.current.value)) {
        setWarn("Ops!");
        setMessage(
          "A senha digitada precisa ter no mínimo 6 caracteres, com ao menos 1 letra maiúscula, 1 letra minúscula e 1 número! Tente novamente"
        );
        return;
      }
      const newPassword = inputRef.current.value;
      const response = await http.post("api/update-password", { email: currentEmail, newPassword });
      if (!response.error && !response.data.error) {
        setWarn("Sucesso!");
        setMessage(response.data.success + ". Redirecionando você para o login.");

        setTimeout(() => {
          navigate("/");
        }, 2500);

        return;
      } else {
        setWarn("Erro!");
        setMessage("Erro ao atualizar sua senha. Favor, tente novamente");
        return;
      }
    }

    inputRef.current.value = "";
    setMessage("");
    setCurrentStep(currentStep + 1);
  };

  return (
    <main className={style.login__main}>
      <div className={style.center__container}>
        <img src={waves} alt="Waves" className={style.wave} />
        <div className={style.login__container}>
          <div>
            <h2 ref={titleRef}>Esqueceu sua senha?</h2>
            <p ref={descriptionRef}>Informe seu endereço de e-mail para receber o código de recuperação de senha.</p>
          </div>
          <form>
            {currentStep === 0 ? (
              <input autoComplete="on" type="email" id="email" name="email" ref={inputRef} placeholder="Seu Email" required />
            ) : (
              <input type="text" id="input" name="input" ref={inputRef} placeholder="" required />
            )}
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleForgotPassword(inputRef.current.value);
              }}
              ref={buttonRef}
            >
              Enviar Código
            </button>
          </form>
        </div>
        {message !== "" && <PopUpWarning warn={warn} description={message} />}
      </div>
    </main>
  );
}
