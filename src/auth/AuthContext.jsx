import React, { createContext, useContext, useState } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const loginDemo = () => setUser({ id: "demo", name: "Demo User" });
  const logout = () => setUser(null);

  return (
    <AuthCtx.Provider value={{ user, loginDemo, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
