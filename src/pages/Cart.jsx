// src/pages/Cart.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext.jsx";

export default function Cart() {
  const { items, total, remove } = useCart();
  const isEmpty = items.length === 0;

  console.log("CART items:", items); // sanity log

  return (
    <div style={{ padding: 16, color: "#fff" }}>
      <h1>Cart</h1>

      {isEmpty ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((it) => (
            <li key={it.id} style={{ marginBottom: 12 }}>
              <strong>{it.title}</strong> – ${it.price.toFixed(2)}
              <div>
                <button
                  onClick={() => remove(it.id)}
                  style={{
                    marginTop: 6,
                    background: "#e50914",
                    color: "#fff",
                    border: 0,
                    padding: "6px 10px",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 8, fontWeight: 600 }}>Total: ${total.toFixed(2)}</div>

      <Link to="/checkout" style={{ display: "inline-block" }}>
        <button
          id="go-checkout"
          data-testid="go-checkout"
          disabled={isEmpty}
          style={{
            marginTop: 12,
            background: isEmpty ? "#555" : "#e50914",
            color: "#fff",
            border: 0,
            padding: "10px 14px",
            borderRadius: 8,
            cursor: isEmpty ? "not-allowed" : "pointer",
          }}
        >
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
}
