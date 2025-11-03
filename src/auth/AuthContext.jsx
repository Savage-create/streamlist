import { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on boot (so refreshes keep you signed in)
  useEffect(() => {
    const raw = localStorage.getItem("streamlist:user");
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  // --- “OAuth” stubs for demo purposes ---
  const signInWithGoogle = async () => {
    // In a real app you’d call Google OAuth. For this class demo,
    // set a pretend user then persist it.
    const mockUser = { id: "uid_123", name: "Timothy Savage", provider: "google" };
    setUser(mockUser);
    localStorage.setItem("streamlist:user", JSON.stringify(mockUser));
  };

  const signInAsGuest = () => {
    const mockUser = { id: "guest", name: "Guest", provider: "guest" };
    setUser(mockUser);
    localStorage.setItem("streamlist:user", JSON.stringify(mockUser));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("streamlist:user");
  };

  return (
    <AuthCtx.Provider value={{ user, loading, signInWithGoogle, signInAsGuest, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
