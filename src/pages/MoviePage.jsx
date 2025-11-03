import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovie } from "../services/tmdb";

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const ctrl = new AbortController();
    setStatus("loading");
    getMovie(id, ctrl.signal)
      .then((d) => {
        setMovie(d);
        setStatus("ready");
      })
      .catch((e) => {
        if (e.name !== "AbortError") setStatus("error");
      });
    return () => ctrl.abort();
  }, [id]);

  if (status === "loading")
    return (
      <div className="wrap">
        <p>Loading…</p>
      </div>
    );
  if (status === "error")
    return (
      <div className="wrap">
        <p>Could not load this movie.</p>
      </div>
    );
  if (!movie)
    return (
      <div className="wrap">
        <p>Not found.</p>
      </div>
    );

  return (
    <main className="detail">
      <Link to="/search" className="back">
        ← Back to search
      </Link>
      <h1>{movie.title}</h1>
      <div className="detail-wrap">
        <img
          loading="lazy"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/poster-fallback.png"
          }
          alt={movie.title}
        />
        <section>
          <p>
            <strong>Release:</strong> {movie.release_date || "—"}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average?.toFixed?.(1) ?? "—"}
          </p>
          <p style={{ marginTop: "1rem" }}>
            {movie.overview || "No overview."}
          </p>
        </section>
      </div>
    </main>
  );
}
