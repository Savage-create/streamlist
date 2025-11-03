const BASE = "https://api.themoviedb.org/3";
async function request(p, a = {}) {
  const u = new URL(BASE + p);
  u.searchParams.set("api_key", import.meta.env.VITE_TMDB_KEY);
  for (const [k, v] of Object.entries(a)) u.searchParams.set(k, String(v));
  const r = await fetch(u);
  if (!r.ok) throw new Error("TMDB " + r.status);
  return r.json();
}
export const tmdb = {
  searchMovies: (q, p = 1) => request("/search/movie", { query: q, page: p }),
  movieDetails: (id) => request(`/movie/${id}`),
  movieWatchProviders: (id) => request(`/movie/${id}/watch/providers`),
};
