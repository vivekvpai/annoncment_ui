import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ApiServices } from "../utilities/ApiServices";

const Login: React.FC = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validation - in a real app, you would validate with a backend
    if (!userEmail.trim() || !password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      await ApiServices.login({ user_email: userEmail, password: password })
        .then((response: any) => {
          console.log(response);
          login(response.user_id);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      setError("Failed to log in. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user_email">User Email</label>
          <input
            type="text"
            id="user_email"
            className="form-control"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <div className="auth-footer">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
