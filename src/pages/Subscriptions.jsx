// src/pages/Subscriptions.jsx
import React from "react";
import { useCart } from "../cart/CartContext.jsx";

const PLANS = [
  { id: "basic",  title: "Basic Subscription",  price: 4.99,  type: "subscription" },
  { id: "pro",    title: "Pro Subscription",    price: 9.99,  type: "subscription" },
  { id: "gold",   title: "Gold Subscription",   price: 14.99, type: "subscription" },
  // merch / add-ons
  { id: "tee",    title: "EZ Tech T-Shirt",     price: 25.99, type: "accessory"   },
  { id: "hoodie", title: "StreamList Hoodie",   price: 39.99, type: "accessory"   },
  { id: "cap",    title: "Logo Cap",            price: 18.00, type: "accessory"   },
  { id: "mug",    title: "Coffee Mug",          price: 12.00, type: "accessory"   },
];

export default function Subscriptions() {
  const { add } = useCart();

  return (
    <div style={{ padding: 16, color: "#fff" }}>
      <h1>Subscriptions & Add-ons</h1>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
        {PLANS.map(p => (
          <li key={p.id} style={{ padding: 12, border: "1px solid #333", borderRadius: 8, maxWidth: 380 }}>
            <div style={{ fontWeight: 600 }}>{p.title}</div>
            <div style={{ opacity: 0.8 }}>${p.price.toFixed(2)} · {p.type}</div>
            <button
              data-testid="add-to-cart"
              aria-label={`Add ${p.title} to cart`}
              onClick={() => add({ id: p.id, title: p.title, price: p.price, type: p.type })}
              style={{ marginTop: 8, background: "#e50914", color: "#fff", border: 0, padding: "8px 12px", borderRadius: 8, cursor: "pointer" }}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
