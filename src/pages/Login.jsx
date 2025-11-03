import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login() {
  const { user, signInWithGoogle, signInAsGuest } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", padding: 24 }}>
      <h1>Sign in to StreamList</h1>
      <p>Access to the app requires authentication.</p>
      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <button
          onClick={signInWithGoogle}
          style={{ padding: "10px 14px", background: "#e50914", color: "#fff", border: 0, borderRadius: 8 }}
        >
          Continue with Google (demo)
        </button>
        <button
          onClick={signInAsGuest}
          style={{ padding: "10px 14px", background: "#2f2f2f", color: "#fff", border: 0, borderRadius: 8 }}
        >
          Continue as Guest (demo)
        </button>
      </div>
    </div>
  );
}
