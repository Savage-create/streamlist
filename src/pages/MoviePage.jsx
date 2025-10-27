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
      const [m, p] = await Promise.all([tmdb.movieDetails(id), tmdb.movieWatchProviders(id)]);
      setMovie(m);
      setProviders(p?.results?.US || null);
    })();
  }, [id]);

  if (!movie) return <p className="subtle">Loading…</p>;
  const fav = storage.isFavorite(Number(id));

  return (
    <div>
      <Link to="/search">← Back</Link>
      <h1 className="h1">{movie.title}</h1>
      <p className="subtle">{movie.overview}</p>
      <button className="btn" onClick={()=>storage.toggleFavorite(Number(id))}>
        {fav ? "Favorited ✓" : "Add to Favorites"}
      </button>

      <div className="section">
        <h2>Where to watch (US)</h2>
        {providers?.flatrate?.length ? (
          <ul>{providers.flatrate.map(x => <li key={x.provider_id}>{x.provider_name}</li>)}</ul>
        ) : <p className="subtle">No provider data.</p>}
      </div>
    </div>
  );
}
