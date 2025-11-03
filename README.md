HEAD

# StreamList

Student: Timothy Savage  
Course INT499 Week 5 StreamList

Minimal movie finder built with Vite + React Router. Searches TMDB, shows details, and persists recent searches and favorites in LocalStorage.

## Features

- Search movies via TMDB (v3)
- Detail page with basic US watch providers
- Recent searches and favorites (LocalStorage)
- Clean dark UI

## Tech

React, Vite, React Router, TMDB API (v3), LocalStorage.

## Quick Start

1. Clone this repo
2. Create `.env` from `.env.example` and paste your TMDB v3 key
3. `npm install`
4. `npm run dev`

```env
VITE_TMDB_KEY=YOUR_TMDB_V3_KEY
e9411dd (Docs: add README, MIT license, env example)

```

## Week 5 – Final Presentation Part 1

This submission includes:
- PWA enablement (manifest + service worker) so the app is installable.
- Login gate (unauthenticated users are redirected to /login).
- Protected routes for the main app.
- Cart Checkout flow with a demo credit card form.
- Card number validation for the format **1234 5678 9012 3456**.
- Local-only demo storage of the payment object (localStorage: streamlist:card).

**How to run**
1. 
pm install
2. 
pm run dev open http://localhost:5173
3. Sign in (demo button), add a subscription to cart, go to Cart, click Proceed to Checkout, fill demo card, and click Pay Now.
