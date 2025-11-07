import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminRegister: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("⚠️ Please fill all fields.");
      return;
    }

    try {
      const res = await axios.post("/admin/register", { name, email, password });
      setMessage(res.data || "✅ Admin registered successfully!");
      setName("");
      setEmail("");
      setPassword("");

      // Redirect to admin login after success
      setTimeout(() => navigate("/admin/login"), 1200);
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data || "❌ Registration failed.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #C3B1E1, #A1C4FD)",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "450px", borderRadius: "15px" }}
      >
        <div className="text-center mb-3">
          <h3 className="fw-bold text-primary">Admin Registration</h3>
          <p className="text-muted small">
            Create an admin account to manage the system
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control rounded-3"
              placeholder="Enter your name"
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
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="Create a password"
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
                onClick={() => navigate("/admin/login")}
                style={{
                  color: "#0d6efd",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Login here
              </span>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
