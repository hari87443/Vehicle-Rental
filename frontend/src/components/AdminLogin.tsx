import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("⚠️ Please fill all fields.");
      return;
    }

    try {
      const res = await axios.post("/admin/login", { email, password });

      if (res.data === "Admin login successful") {
        setMessage("✅ Login successful!");
        setTimeout(() => navigate("/vehicles"), 1200);
      } else {
        setMessage(res.data);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Login failed. Check your credentials.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #B993D6, #8CA6DB)",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "15px" }}
      >
        <div className="text-center mb-3">
          <h3 className="fw-bold text-primary">Admin Login</h3>
          <p className="text-muted small">
            Sign in to manage your vehicle system
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control rounded-3"
              placeholder="Enter admin email"
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
              placeholder="Enter password"
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
            Login
          </button>

          <div className="text-center mt-3">
            <small className="text-muted">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/admin/register")}
                style={{
                  color: "#0d6efd",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Register here
              </span>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
