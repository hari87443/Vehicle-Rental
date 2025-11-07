
import React, { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UserLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/login", { email, password });

      const user = res.data;

      if (user && user.id) {
        localStorage.setItem("userId", user.id.toString());
        localStorage.setItem("username", user.name); // ✅ updated (backend sends 'name')
        localStorage.setItem("email", user.email);

        setMessage("✅ Login successful!");
        setTimeout(() => navigate("/UserBooking"), 1000);
      } else {
        setMessage("⚠️ Invalid user data from server");
      }
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Invalid email or password");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #74ABE2, #5563DE)",
      }}
    >
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}>
        <div className="text-center mb-3">
          <h3 className="fw-bold text-primary">User Login</h3>
          <p className="text-muted small">Welcome back! Please login to continue</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control rounded-3"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <div
              className={`alert text-center py-2 ${
                message.includes("✅")
                  ? "alert-success"
                  : "alert-danger"
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
                onClick={() => navigate("/user/register")}
                style={{ color: "#0d6efd", cursor: "pointer", fontWeight: "500" }}
              >
                Register
              </span>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;



