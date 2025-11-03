import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { safeSet } from "./services/storage";

import MoviePage from "./pages/MoviePage";
import SearchPage from "./pages/SearchPage";
import Subscriptions from "./pages/Subscriptions";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import { useCart } from "./cart/CartContext";

function Nav() {
  const location = useLocation();
  const { count } = useCart?.() ?? { count: 0 };

  useEffect(() => {
    safeSet("lastView", { path: location.pathname, search: location.search });
  }, [location]);

  return (
    <nav className="nav">
      <Link className="brand" to="/">
        StreamList
      </Link>
      <Link to="/search">Search</Link>
      <Link to="/subscriptions">Subscriptions</Link>
      <Link to="/cart">Cart ({count})</Link>
    </nav>
  );
}

export default function App() {
  return (
    <div className="wrap">
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/search" replace />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/cart" element={<Cart />} />
        {/* Catch-all for 404s */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
