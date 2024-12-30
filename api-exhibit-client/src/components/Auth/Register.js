import React, { useState } from "react";
import apiClient from "../../services/api";
import "../AuthStyles.css";

const Register = () => {
  const [role, setRole] = useState("admin");
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        role === "admin"
          ? "/auth/adminRegister"
          : role === "operator"
          ? "/auth/busOperatorRegister"
          : "/auth/commuterRegister";
      const { data } = await apiClient.post(endpoint, formData);
      setMessage(data);
      setError("");
    } catch (err) {
      setError(err.response?.data || "Registration failed!");
      setMessage("");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
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
      <form onSubmit={handleRegister} className="auth-form">
        {role === "operator" && (
          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            onChange={handleInputChange}
            required
          />
        )}
        <input
          type="text"
          name={role === "commuter" ? "firstName" : "userName"}
          placeholder={role === "commuter" ? "First Name" : "userName"}
          onChange={handleInputChange}
          required
        />
        {role === "commuter" && (
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleInputChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Register;
