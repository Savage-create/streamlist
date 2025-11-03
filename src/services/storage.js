// src/services/storage.js

// Low-level helpers
export function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// Convenience helpers for arrays
export function getArray(key) {
  return safeGet(key, []);
}

export function pushToArray(key, item, limit = 10) {
  const prev = getArray(key);
  if (item == null || item === "") return prev;
  const next = [item, ...prev.filter((x) => x !== item)].slice(0, limit);
  safeSet(key, next);
  return next;
}

// Back-compat API your pages can call
export const storage = {
  get: safeGet,
  set: safeSet,
  recentSearches() {
    return getArray("recentSearches");
  },
  addRecentSearch(term) {
    return pushToArray("recentSearches", term, 10);
  },
};
