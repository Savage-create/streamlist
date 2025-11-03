import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Subscriptions from "./pages/Subscriptions.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.tsx";
import { AuthProvider, useAuth } from "./auth/AuthContext.jsx";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function TopNav() {
  const { user, logout } = useAuth();
  return (
    <nav style={{ display:"flex", gap:12, padding:12 }}>
      <Link to="/">StreamList</Link>
      <Link to="/search">Search</Link>
      <Link to="/subscriptions">Subscriptions</Link>
      <Link to="/cart">Cart</Link>
      {user && <button onClick={logout} style={{ marginLeft:"auto" }}>Logout</button>}
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TopNav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/movies" element={<PrivateRoute><Movies /></PrivateRoute>} />
        <Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
        <Route path="/subscriptions" element={<PrivateRoute><Subscriptions /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
