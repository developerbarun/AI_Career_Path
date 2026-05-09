import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ProgressProvider } from "./context/ProgressContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Particles from "./components/Particles";
import Home from "./pages/Home";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";
import CareerQuiz from "./pages/CareerQuiz";
import Resources from "./pages/Resources";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import GeneratedPathDetail from "./pages/GeneratedPathDetail";
import Login from "./pages/Login";

function App() {
  useEffect(() => {
    // Optional: any app-wide setup
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProgressProvider>
          <Particles />
          <Navbar />
          <main style={{ position: "relative", zIndex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/:slug" element={<CareerDetail />} />
              <Route path="/careers/:slug/quiz" element={<CareerQuiz />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/path/:pathId"
                element={
                  <ProtectedRoute>
                    <GeneratedPathDetail />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
