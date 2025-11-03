import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import Subscriptions from "./pages/Subscriptions.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <>
      <nav className="nav">
        <Link to="/" className="brand">
          StreamList
        </Link>
        <Link to="/search">Search</Link>
        <Link to="/subscriptions">Subscriptions</Link>
        <Link to="/cart">Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
