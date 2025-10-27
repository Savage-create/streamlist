import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { tmdb } from "../services/tmdb";
import { storage } from "../services/storage";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { const initial = params.get("q"); if (initial) doSearch(initial); }, []);

  async function doSearch(term) {
    const query = term.trim();
    if (!query) return;
    setLoading(true);
    try {
      const res = await tmdb.searchMovies(query);
      setData(res);
      storage.addRecentSearch(query);
      setParams({ q: query });
    } finally { setLoading(false); }
  }

  return (
    <div>
      <form className="row" onSubmit={(e)=>{e.preventDefault(); doSearch(q);}}>
        <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search movies…" />
        <button className="btn">Search</button>
      </form>

      <div className="chips">
        {storage.recentSearches().map(s =>
          <button className="chip" key={s} onClick={()=>{ setQ(s); doSearch(s); }}>{s}</button>
        )}
      </div>

      {loading && <p className="subtle">Loading…</p>}

      {data && (
        <ul className="grid">
          {data.results?.map(m => (
            <li key={m.id} className="card">
              <div style={{fontWeight:600}}>{m.title}</div>
              <div className="subtle">{m.release_date}</div>
              <Link to={`/movie/${m.id}`} style={{marginTop:8, display:"inline-block"}}>View details →</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
