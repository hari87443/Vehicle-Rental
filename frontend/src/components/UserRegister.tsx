import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";

const UserRegister: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage("⚠️ Please fill all fields.");
      return;
    }

    try {
      await axios.post("/api/users/register", { name, email, password });
      setMessage("✅ Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/user/login"), 1200);
    } catch (err) {
      console.error(err);
      setMessage("❌ Registration failed. Try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #74ABE2, #5563DE)",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "15px" }}
      >
        <div className="text-center mb-3">
          <h3 className="fw-bold text-primary">User Registration</h3>
          <p className="text-muted small">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control rounded-3"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control rounded-3"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="Create your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <div
              className={`alert text-center py-2 ${
                message.includes("✅") ? "alert-success" : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-3 fw-semibold"
          >
            Register
          </button>

          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/user/login")}
                style={{
                  color: "#0d6efd",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Login
              </span>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
