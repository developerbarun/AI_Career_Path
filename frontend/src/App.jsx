import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "./context/ProgressContext";
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

function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Particles />
        <Navbar />
        <main style={{ position: "relative", zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:slug" element={<CareerDetail />} />
            <Route path="/careers/:slug/quiz" element={<CareerQuiz />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/path/:pathId" element={<GeneratedPathDetail />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ProgressProvider>
  );
}

export default App;
