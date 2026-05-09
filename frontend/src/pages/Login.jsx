import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (isSignUp) {
        if (!name || !email || !password) {
          setErrorMessage("Please fill in all fields");
          setLoading(false);
          return;
        }
        const result = await register(email, password, name);
        if (result.success) {
          setSuccessMessage("Account created successfully! Redirecting...");
          setTimeout(() => {
            navigate(location.state?.from || "/dashboard");
          }, 1500);
        } else {
          setErrorMessage(result.error);
        }
      } else {
        if (!email || !password) {
          setErrorMessage("Please fill in all fields");
          setLoading(false);
          return;
        }
        const result = await login(email, password);
        if (result.success) {
          setSuccessMessage("Login successful! Redirecting...");
          setTimeout(() => {
            navigate(location.state?.from || "/dashboard");
          }, 1500);
        } else {
          setErrorMessage(result.error);
        }
      }
    } catch (err) {
      setErrorMessage(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="auth-page"
      style={{ paddingTop: "6rem", paddingBottom: "3rem" }}
    >
      <section className="section">
        <div
          style={{
            maxWidth: "450px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ textAlign: "center" }}
          >
            <h1 style={{ marginBottom: "0.5rem", fontSize: "2rem" }}>
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
              {isSignUp
                ? "Join us to start your career journey"
                : "Sign in to continue your learning"}
            </p>
            {redirectMessage && !isSignUp && (
              <div
                style={{
                  margin: "0 auto 1rem",
                  maxWidth: "420px",
                  padding: "0.85rem 1rem",
                  borderRadius: "10px",
                  background: "rgba(108, 99, 255, 0.12)",
                  border: "1px solid rgba(108, 99, 255, 0.25)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                }}
              >
                {redirectMessage}
              </div>
            )}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              padding: "2rem",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)",
            }}
          >
            {isSignUp && (
              <div style={{ position: "relative" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  Full Name
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <FaUser
                    style={{ color: "var(--accent-purple)", opacity: 0.6 }}
                  />
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      color: "var(--text-primary)",
                      outline: "none",
                      fontSize: "1rem",
                    }}
                  />
                </div>
              </div>
            )}

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                Email Address
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <FaEnvelope
                  style={{ color: "var(--accent-purple)", opacity: 0.6 }}
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    color: "var(--text-primary)",
                    outline: "none",
                    fontSize: "1rem",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                Password
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <FaLock
                  style={{ color: "var(--accent-purple)", opacity: 0.6 }}
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    color: "var(--text-primary)",
                    outline: "none",
                    fontSize: "1rem",
                  }}
                />
              </div>
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: "0.75rem 1rem",
                  background: "rgba(255, 59, 48, 0.15)",
                  border: "1px solid rgba(255, 59, 48, 0.3)",
                  borderRadius: "8px",
                  color: "#FF3B30",
                  fontSize: "0.9rem",
                }}
              >
                {errorMessage}
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: "0.75rem 1rem",
                  background: "rgba(52, 211, 153, 0.15)",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  borderRadius: "8px",
                  color: "#34D399",
                  fontSize: "0.9rem",
                }}
              >
                {successMessage}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "0.875rem",
                fontSize: "1rem",
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading
                ? "Processing..."
                : isSignUp
                  ? "Create Account"
                  : "Sign In"}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ textAlign: "center" }}
          >
            <p
              style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}
            >
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMessage("");
                setSuccessMessage("");
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--accent-purple)",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {isSignUp ? "Sign In Instead" : "Create Account"}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
