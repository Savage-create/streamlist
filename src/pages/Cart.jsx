import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext.jsx";

export default function Cart() {
  const { items, removeItem, setQty } = useCart();

  const total = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );

  const hasAnything = items.length > 0;

  return (
    <div style={{ padding: 16 }}>
      <h1>Cart</h1>
      {items.map((it) => (
        <div key={it.id} style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 600 }}>{it.title}</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>{it.type}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
            <button onClick={() => removeItem(it.id)}>Remove</button>
            <input
              type="number"
              min={1}
              value={it.qty}
              onChange={(e) => setQty(it.id, Number(e.target.value || 1))}
              style={{ width: 64 }}
            />
            <span>${(it.price * it.qty).toFixed(2)}</span>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 12, fontWeight: 700 }}>Total: ${total.toFixed(2)}</div>

      <div style={{ marginTop: 20 }}>
        <Link
          to={hasAnything ? "/checkout" : "#"}
          aria-disabled={!hasAnything}
          onClick={(e) => !hasAnything && e.preventDefault()}
          style={{
            padding: "10px 14px",
            background: hasAnything ? "#e50914" : "#666",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
