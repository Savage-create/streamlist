import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext.jsx";

export default function Cart() {
  const { items, total, remove, setQty } = useCart();
  const isEmpty = items.length === 0;

  return (
    <div style={{ padding: 16, color: "#fff" }}>
      <h1>Cart</h1>
      {isEmpty && <p>Your cart is empty.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map(it => (
          <li key={it.id} style={{ marginBottom: 12 }}>
            <strong>{it.title}</strong> – ${it.price.toFixed(2)}<br />
            <button onClick={() => remove(it.id)} style={{ background:"#e50914", color:"#fff", border:0, padding:"4px 8px", marginTop:6 }}>Remove</button>
          </li>
        ))}
      </ul>

      <div>Total: ${total.toFixed(2)}</div>

      <Link to="/checkout">
        <button disabled={isEmpty}
          style={{
            marginTop: 12,
            background: isEmpty ? "#555" : "#e50914",
            color:"#fff",
            border:0,
            padding:"8px 12px",
            borderRadius:8,
            cursor: isEmpty ? "not-allowed" : "pointer"
          }}>
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
}
