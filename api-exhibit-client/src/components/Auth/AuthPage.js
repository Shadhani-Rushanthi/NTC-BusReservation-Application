import React from "react";
import Login from "./Login";
import Register from "./Register";

const AuthPage = () => {
  return (
    <div className="auth-container">
      <h1>Authentication</h1>
      <div className="auth-section">
        <Login />
        <Register />
      </div>
    </div>
  );
};

export default AuthPage;
