// src/pages/Cart.jsx
import { useCart } from "../cart/CartContext";

export default function Cart() {
  const { items, total, setQty, remove } = useCart();

  return (
    <div>
      <h1 className="h1">Cart</h1>

      {items.length === 0 ? (
        <div className="subtle">Your cart is empty.</div>
      ) : (
        <ul className="cartList">
          {items.map((i) => (
            <li key={i.id} className="cartRow">
              <div className="cartTitle">
                <strong>{i.name}</strong>
                <div className="subtle">{i.type}</div>
              </div>

              <div className="cartPrice">${i.price.toFixed(2)}</div>

              <div className="cartQty">
                {i.type === "subscription" ? (
                  <input
                    type="number"
                    value={1}
                    readOnly
                    className="qty"
                    title="Subscriptions are limited to 1"
                  />
                ) : (
                  <input
                    type="number"
                    min={1}
                    value={i.qty}
                    onChange={(e) => setQty(i.id, e.target.value)}
                    className="qty"
                  />
                )}
              </div>

              <button className="btn danger" onClick={() => remove(i.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 16, fontWeight: 700 }}>
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}
