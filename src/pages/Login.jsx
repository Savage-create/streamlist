import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login() {
  const { loginDemo } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = () => {
    loginDemo();
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: 100, color: "#fff" }}>
      <h1>Sign in to StreamList</h1>
      <p style={{ opacity: 0.8 }}>Demo login (no real OAuth)</p>
      <button
        onClick={handleDemoLogin}
        style={{
          marginTop: 20,
          background: "#e50914",
          color: "#fff",
          padding: "10px 16px",
          border: 0,
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Continue as Guest
      </button>
    </div>
  );
}
