import React from "react";
import { storage } from "../services/storage";

// Small local debounce hook (no imports needed)
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// Try to use your existing services/tmdb.js if it exports searchMovies(query, {signal})
async function searchApi(query, signal) {
  try {
    const mod = await import("../services/tmdb.js");
    if (typeof mod.searchMovies === "function") {
      const data = await mod.searchMovies(query, { signal });
      // normalize: return array of results
      if (Array.isArray(data)) return data;
      if (data && Array.isArray(data.results)) return data.results;
    }
  } catch {
    // ignore and try direct fetch fallback
  }

  // Fallback direct TMDB fetch (requires VITE_TMDB_KEY in .env)
  const key = import.meta.env.VITE_TMDB_KEY;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${encodeURIComponent(
    query,
  )}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return Array.isArray(data.results) ? data.results : [];
}

export default function SearchPage() {
  const [query, setQuery] = React.useState("");
  const debounced = useDebouncedValue(query, 300);

  const [results, setResults] = React.useState([]);
  const [recent, setRecent] = React.useState(() => storage.recentSearches());
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const abortRef = React.useRef(null);

  React.useEffect(() => {
    if (!debounced) {
      setResults([]);
      return;
    }

    // cancel previous request if still running
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const items = await searchApi(debounced, controller.signal);
        setResults(items);

        // record recent term
        const updated = storage.addRecentSearch(debounced);
        setRecent(updated);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message || "Search failed");
      } finally {
        setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, [debounced]);

  return (
    <section style={{ padding: "1rem" }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies"
        aria-label="Search movies"
      />
      <button onClick={() => setQuery(query)}>Search</button>

      {isLoading && <p aria-live="polite">Loading…</p>}
      {error && <div role="alert">Something went wrong: {error}</div>}
      {!isLoading && !error && debounced && results.length === 0 && (
        <p aria-live="polite">No results.</p>
      )}

      {recent.length > 0 && (
        <div style={{ margin: "0.5rem 0" }}>
          <strong>Recent:</strong>{" "}
          {recent.map((r) => (
            <button
              key={r}
              onClick={() => setQuery(r)}
              style={{ marginRight: 6 }}
            >
              {r}
            </button>
          ))}
        </div>
      )}

      <div className="grid">
        {results.map((m) => (
          <article key={m.id} tabIndex={0} style={{ outlineOffset: 2 }}>
            <img
              loading="lazy"
              src={
                m.poster_path
                  ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
                  : "/placeholder-poster.png"
              }
              alt={m.title ? `${m.title} poster` : "Poster not available"}
              style={{ width: 160, height: "auto" }}
            />
            <h3>{m.title || "Untitled"}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
