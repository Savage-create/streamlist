const KEY = "streamlist.recents";
const LIMIT = 10;

export function safeGet(k, fallback) {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
export function safeSet(k, v) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {
    /* ignore */
  }
}
export function getRecents() {
  return safeGet(KEY, []);
}
export function addRecent(term) {
  const t = term.trim();
  if (!t) return getRecents();
  const cur = getRecents().filter((x) => x.toLowerCase() !== t.toLowerCase());
  const next = [t, ...cur].slice(0, LIMIT);
  safeSet(KEY, next);
  return next;
}
