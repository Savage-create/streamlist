import { useEffect, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/tmdb";
import Movies from "./Movies";
import { addRecent, getRecents } from "../services/storage";

function useDebounced(value, delay = 350) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [recents, setRecents] = useState(() => getRecents());
  const abortRef = useRef(null);
  const debounced = useDebounced(q, 350);
  const chips = useMemo(() => recents.slice(0, 5), [recents]);

  useEffect(() => {
    if (!debounced.trim()) {
      setStatus("idle");
      setItems([]);
      return;
    }
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setStatus("loading");
    searchMovies(debounced, 1, ctrl.signal)
      .then((d) => {
        const r = d?.results || [];
        setItems(r);
        setStatus(r.length ? "ready" : "empty");
      })
      .catch((e) => {
        if (e.name !== "AbortError") setStatus("error");
      });
    return () => ctrl.abort();
  }, [debounced]);

  function submit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    setRecents(addRecent(q));
  }
  function clickChip(term) {
    setQ(term);
    setRecents(addRecent(term));
  }

  return (
    <main className="wrap">
      <form onSubmit={submit} style={{ marginBottom: 12 }}>
        <input
          placeholder="Search movies"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search movies"
        />
        <button type="submit">Search</button>
      </form>

      {chips.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <strong>Recent: </strong>
          {chips.map((c) => (
            <button
              key={c}
              className="secondary"
              style={{ marginRight: 6 }}
              onClick={() => clickChip(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {status === "idle" && <p>Type a title to begin.</p>}
      {status === "loading" && <p aria-live="polite">Loading…</p>}
      {status === "error" && <p>Something went wrong. Try again.</p>}
      {status === "empty" && <p>No results for “{debounced}”.</p>}
      {status === "ready" && <Movies items={items} />}
    </main>
  );
}
