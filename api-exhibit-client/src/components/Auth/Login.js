import React, { useState } from "react";
import apiClient from "../../services/api";
import "../AuthStyles.css";

const Login = () => {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        role === "admin"
          ? `/auth/adminLogin/${email}/${password}`
          : role === "operator"
          ? `/auth/busOperatorLogin/${email}/${password}`
          : `/auth/commutorLogin/${email}/${password}`;
      const { data } = await apiClient.post(endpoint);
      localStorage.setItem("token", data.token);
      setSuccess("Login successful! Redirecting...");
      setError("");
      setTimeout(() => {
        // Redirect based on role
        window.location.href = `/${role}`;
      }, 1500);
    } catch (err) {
      setError(err.response?.data || "Login failed!");
      setSuccess("");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <div className="role-selector">
        <button
          className={role === "admin" ? "active" : ""}
          onClick={() => setRole("admin")}
        >
          Admin
        </button>
        <button
          className={role === "operator" ? "active" : ""}
          onClick={() => setRole("operator")}
        >
          Bus Operator
        </button>
        <button
          className={role === "commuter" ? "active" : ""}
          onClick={() => setRole("commuter")}
        >
          Commuter
        </button>
      </div>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default Login;
