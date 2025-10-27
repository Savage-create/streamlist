import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { storage } from "./services/storage";
import SearchPage from "./pages/SearchPage";
import MoviePage from "./pages/MoviePage";
import Subscriptions from "./pages/Subscriptions";
import Cart from "./pages/Cart";
import { useCart } from "./cart/CartContext";

function Nav() {
  const l = useLocation();
  const { count } = useCart();
  useEffect(() => { storage.setLastView(l.pathname + l.search); }, [l]);
  return (
    <div className="nav">
      <Link className="brand" to="/search">StreamList</Link>
      <Link to="/search">Search</Link>
      <Link to="/subscriptions">Subscriptions</Link>
      <Link to="/cart">Cart ({count})</Link>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <div className="wrap">
        <Routes>
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}
