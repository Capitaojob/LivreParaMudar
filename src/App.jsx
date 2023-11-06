import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Breathings from "./pages/Breathings";
import Footer from "./components/Footer";
import Error404 from "./pages/Error404";
import BreathingExercise from "./pages/Breathings/BreathingExercise";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import AuthContextProvider, { useAuth } from "./contexts/AuthContext";
import QuizForm from "./pages/Quiz/QuizForm";
import { useEffect, useState } from "react";
import http from "./http";
import PanicButton from "./components/PanicButton";
import Modal from "./components/Modal";
import StyledButton from "./components/StyledButton";
import About from "./pages/About";
import ForgotPassword from "./pages/Login/ForgotPassword";

export default function App() {
  const [isPanicActive, setIsPanicActive] = useState(false);

  function handlePanicClick() {
    setIsPanicActive(true);
  }

  function closeModal() {
    setIsPanicActive(false);
  }

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inicio"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sobre"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route path="/respiracoes">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Breathings />
                </ProtectedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <BreathingExercise />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/quiz">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <QuizForm />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <ProtectedComponent>
          <PanicButton onClick={handlePanicClick} />
          {isPanicActive && (
            <Modal onClose={closeModal} title="Botão De Pânico Ativado!" subtitle="Você apertou o botão de pânico, como posso te ajudar?">
              <div>
                <h5>Ataque de Pânico</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ea quos magni soluta quo, nostrum nam quidem? Cupiditate
                  reprehenderit temporibus fuga alias amet, nam iste, id facilis odit quia quibusdam enim consectetur atque explicabo consequuntur
                  magni perferendis dicta recusandae mollitia sint! Molestiae quisquam eligendi cupiditate fugiat blanditiis ducimus facere officia?
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis dolore debitis velit unde accusantium id explicabo perspiciatis
                  doloremque, facilis quae minima tempore impedit eligendi harum nam quo deleniti. Eius, error.
                </p>
                <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "10px" }}>
                  <StyledButton variation="solid" type="button">
                    Ver Respiração
                  </StyledButton>
                  <StyledButton variation="solid" type="button">
                    Ver Óleos
                  </StyledButton>
                </div>
              </div>
              <div>
                <h5>Crise de Ansiedade</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque officia consequatur repellat adipisci ex dolorem rem explicabo
                  ratione voluptates assumenda, quis molestias ab vitae, cum nemo vero accusamus blanditiis recusandae!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ea quos magni soluta quo, nostrum nam quidem? Cupiditate
                  reprehenderit temporibus fuga alias amet, nam iste, id facilis odit quia quibusdam enim consectetur atque explicabo consequuntur
                  magni perferendis dicta recusandae mollitia sint! Molestiae quisquam eligendi cupiditate fugiat blanditiis ducimus facere officia?
                </p>
                <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "10px" }}>
                  <StyledButton variation="solid" type="button">
                    Ver Respiração
                  </StyledButton>
                  <StyledButton variation="solid" type="button">
                    Ver Óleos
                  </StyledButton>
                </div>
              </div>
            </Modal>
          )}
        </ProtectedComponent>
        <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

const ProtectedComponent = ({ children }) => {
  const { token } = useAuth();

  return token ? children : <></>;
};

const ProtectedRoute = ({ children }) => {
  const { token, onLogout } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await http.get("/api/protected", config);
        console.log(response);

        const currentTimestampMilliseconds = Date.now();
        const currentTimestampSeconds = Math.floor(currentTimestampMilliseconds / 1000);

        if (response.data.user.exp < currentTimestampSeconds) {
          onLogout();
        }
      } catch (error) {
        console.error("Erro na Autenticação:", error);
        onLogout();
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, onLogout]);

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return isLoading ? <div>Carregando...</div> : children;
};
