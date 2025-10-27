import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { storage } from "./services/storage";
import SearchPage from "./pages/SearchPage";
import MoviePage from "./pages/MoviePage";

function Nav() {
  const l = useLocation();
  useEffect(() => { storage.setLastView(l.pathname + l.search); }, [l]);
  return (
    <div className="nav">
      <Link className="brand" to="/search">StreamList</Link>
      <Link to="/search">Search</Link>
      <a href="https://github.com/Savage-create/streamlist">GitHub</a>
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
        </Routes>
      </div>
    </>
  );
}
