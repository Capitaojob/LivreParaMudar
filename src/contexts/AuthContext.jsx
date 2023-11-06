/* eslint-disable */
import http from "../http";
import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext({
  token: "",
  onLogin: (email, senha) => null,
  onLogout: () => null,
});
AuthContext.displayName = "AuthContext";

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(sessionStorage.getItem("authToken") || null);
  // const [serverResponse, setServerResponse] = useState(null);

  async function handleLogin(email, password) {
    try {
      if (!email || !password) {
        throw new Error("Sem login ou senha. Favor preencher o campo de login para continuar!");
      }
      const response = await http.post("api/login", { email, password });
      const { token } = await response.data;

      setToken(token);
      sessionStorage.setItem("authToken", token);

      // setServerResponse("Login bem-sucedido!");
      const origin = location.state?.from?.pathname || "/";
      console.log("Origin: ", origin);
      navigate(origin);
    } catch (error) {
      throw error.response?.data.error ? error.response.data.error : error.message;
    }
  }

  function handleLogout() {
    setToken(null);
    sessionStorage.removeItem("authToken");
  }

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
