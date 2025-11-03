# AI Testing Report – StreamList (INT499 Week 4 – Part 1)

**Tool used:** AI code assistant (ChatGPT/VS Code integration).  
**Date:** <today>  
**Repo:** https://github.com/Savage-create/streamlist

## What the AI analyzed

- React app (Vite) with search, lists, local storage, and TMDB API usage.
- Components in `src/` including routing and search UI.

## Findings & Recommendations

1. **Search spam + jank**
   - Add input debounce (~300ms) and cancel in-flight requests with `AbortController`.
   - _Why:_ Prevents many fetches per keystroke and “sticky” old results.

2. **Error / empty states**
   - Wrap fetch in try/catch, show loading, show friendly message on 0 results, show retry on network error.

3. **LocalStorage safety**
   - Guard `JSON.parse` with try/catch; fall back to defaults on corrupt data.

4. **404 / bad route handling**
   - Add a `NotFound` route (`path="*"`). Guard detail pages when ID is invalid.

5. **Accessibility**
   - Provide meaningful `alt` for posters, `aria-live="polite"` for result counts, ensure keyboard focus styles.

6. **Performance hygiene**
   - Use `loading="lazy"` on images; memoize large lists; avoid unnecessary renders.

7. **Keys & env**
   - Keep TMDB key in `.env` (e.g., `VITE_TMDB_KEY=`). Ensure `.env` is in `.gitignore`.

## Changes I accepted (implemented)

- Debounced search + abort controller
- Loading/error/empty UI enhancements
- Safe localStorage helpers
- `NotFound` route
- a11y tweaks (alt text, aria-live, focus outline)
- Lazy images

## Changes I deferred (not implemented yet)

- Server-side proxy for TMDB (out of scope for this week)
- Deeper refactor of state structure

## Test Evidence (manual)

- Before: rapid typing triggered many requests; blank UI on errors.
- After: requests settle; visible loading; retry; 404 page on bad route; no console errors from JSON parse.

## Commit Log (summary)

- feat(search): debounce + abort controller; loading/error/empty states
- chore(storage): safe JSON helpers
- feat(router): NotFound route
- feat(a11y): alt text, aria-live; lazy images
