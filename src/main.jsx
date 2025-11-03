import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";
import { CartProvider } from "./cart/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>,
);

// Register service worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("Service worker registered"))
      .catch((err) => console.warn("SW registration failed:", err));
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.getRegistrations().then((existing) => {
      const hasSW = existing.some(
        (r) => r.active && r.active.scriptURL.includes("service-worker.js"),
      );
      if (!hasSW) {
        navigator.serviceWorker
          .register("/service-worker.js")
          .catch(console.error);
      }
    });
  });
}
