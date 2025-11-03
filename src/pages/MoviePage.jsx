import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { tmdb } from "../services/tmdb";
import { storage } from "../services/storage";

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const [m, p] = await Promise.all([
        tmdb.movieDetails(id),
        tmdb.movieWatchProviders(id),
      ]);
      setMovie(m);
      setProviders(p?.results?.US || null);
    })();
  }, [id]);

  if (!movie) return <p className="subtle">Loading…</p>;
  const fav = storage.isFavorite(Number(id));

  return (
    <div>
      <Link to="/search">← Back</Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "160px 1fr",
          gap: 16,
          alignItems: "start",
          marginTop: 12,
        }}
      >
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.title}
            width="160"
            height="240"
            style={{ objectFit: "cover", borderRadius: 12 }}
          />
        ) : (
          <div
            style={{
              width: 160,
              height: 240,
              background: "#222",
              borderRadius: 12,
            }}
          />
        )}

        <div>
          <h1 className="h1" style={{ marginTop: 0 }}>
            {movie.title}
          </h1>
          <p className="subtle" style={{ marginTop: 6 }}>
            {movie.overview}
          </p>
          <button
            className="btn"
            style={{ marginTop: 10 }}
            onClick={() => storage.toggleFavorite(Number(id))}
          >
            {fav ? "Favorited ✓" : "Add to Favorites"}
          </button>
        </div>
      </div>

      <div className="section">
        <h2>Where to watch (US)</h2>
        {providers?.flatrate?.length ? (
          <div className="providers">
            {providers.flatrate.map((x) => (
              <span key={x.provider_id} className="provider">
                {x.logo_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w45${x.logo_path}`}
                    alt={x.provider_name}
                    width="20"
                    height="20"
                    loading="lazy"
                  />
                )}
                <span>{x.provider_name}</span>
              </span>
            ))}
          </div>
        ) : (
          <p className="subtle">No provider data.</p>
        )}
      </div>
    </div>
  );
}
