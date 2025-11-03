const API = "https://api.themoviedb.org/3";
const KEY = import.meta.env.VITE_TMDB_KEY;

async function getJSON(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

export async function searchMovies(query, page = 1, signal) {
  if (!query?.trim()) return { results: [], total_results: 0 };
  const url = `${API}/search/movie?api_key=${KEY}&query=${encodeURIComponent(query)}&page=${page}`;
  return getJSON(url, signal);
}

export async function getMovie(id, signal) {
  const url = `${API}/movie/${id}?api_key=${KEY}`;
  return getJSON(url, signal);
}

export async function getCategory(kind = "popular", page = 1, signal) {
  const safe = ["popular", "top_rated", "now_playing", "upcoming"].includes(
    kind,
  )
    ? kind
    : "popular";
  const url = `${API}/movie/${safe}?api_key=${KEY}&page=${page}`;
  return getJSON(url, signal);
}
