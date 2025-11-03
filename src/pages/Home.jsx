import { useEffect, useState } from "react";
import Row from "../components/Row.jsx";
import { getCategory } from "../services/tmdb";

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [top, setTop] = useState([]);
  const [now, setNow] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const ctrl = new AbortController();
    Promise.all([
      getCategory("popular", 1, ctrl.signal),
      getCategory("top_rated", 1, ctrl.signal),
      getCategory("now_playing", 1, ctrl.signal),
    ])
      .then(([a, b, c]) => {
        setPopular(a.results || []);
        setTop(b.results || []);
        setNow(c.results || []);
        setStatus("ready");
      })
      .catch((e) => {
        if (e.name !== "AbortError") setStatus("error");
      });
    return () => ctrl.abort();
  }, []);

  if (status === "loading")
    return (
      <div className="wrap">
        <p>Loading…</p>
      </div>
    );
  if (status === "error")
    return (
      <div className="wrap">
        <p>Could not load rows.</p>
      </div>
    );

  return (
    <div className="wrap">
      <Row title="Popular" items={popular} />
      <Row title="Top Rated" items={top} />
      <Row title="Now Playing" items={now} />
    </div>
  );
}
