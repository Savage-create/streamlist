import { Link } from "react-router-dom";

export default function Row({ title, items = [] }) {
  if (!items.length) return null;
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="strip">
        {items.map((m) => (
          <Link
            key={m.id}
            to={`/movie/${m.id}`}
            className="tile"
            aria-label={`Open details for ${m.title}`}
          >
            <img
              loading="lazy"
              src={
                m.poster_path
                  ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
                  : "/poster-fallback.png"
              }
              alt={m.title || "Movie poster"}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
