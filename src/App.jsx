import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "./auth/AuthContext.jsx";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import Subscriptions from "./pages/Subscriptions.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.tsx";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="app">
      <nav style={{ display: "flex", gap: 14, padding: "10px 14px" }}>
        <Link to="/">StreamList</Link>
        <Link to="/search">Search</Link>
        <Link to="/subscriptions">Subscriptions</Link>
        <Link to="/cart">Cart</Link>
      </nav>

      <Routes>
        {/* Public: only /login should be reachable when signed out */}
        <Route path="/login" element={<Login />} />

        {/* Everything else requires auth */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <PrivateRoute>
              <Movies />
            </PrivateRoute>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <PrivateRoute>
              <MoviePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <PrivateRoute>
              <Subscriptions />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
