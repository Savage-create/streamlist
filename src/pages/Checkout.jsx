import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cart/CartContext.jsx";

function formatCard(value) {
  // Keep digits, group into 4s
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export default function Checkout() {
  const { items, clear } = useCart?.() ?? { items: [], clear: () => {} };
  const navigate = useNavigate();

  const total = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [exp, setExp] = useState(""); // MM/YY
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    if (items.length === 0) {
      // Nothing to pay for; bounce back to cart so the demo is tidy
      navigate("/cart", { replace: true });
    }
  }, [items.length, navigate]);

  const valid =
    /^(\d{4}\s){3}\d{4}$/.test(number) && // 1234 5678 9012 3456
    /^[0-1]\d\/\d{2}$/.test(exp) &&
    /^\d{3,4}$/.test(cvv) &&
    name.trim().length > 2;

  const saveCardToLocalStorage = () => {
    const payload = { name, number, exp, last4: number.slice(-4) };
    localStorage.setItem("streamlist:card", JSON.stringify(payload));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valid) return;
    saveCardToLocalStorage();
    clear?.();
    alert("Payment captured (demo). Card saved to localStorage.");
    navigate("/", { replace: true });
  };

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: 16 }}>
      <h1>Checkout</h1>
      <p>Total due: <strong>${total.toFixed(2)}</strong></p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, marginTop: 12 }}>
        <label>
          Name on card
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Q. Public"
            required
          />
        </label>

        <label>
          Card number
          <input
            inputMode="numeric"
            autoComplete="cc-number"
            value={number}
            onChange={(e) => setNumber(formatCard(e.target.value))}
            placeholder="1234 5678 9012 3456"
            required
          />
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label>
            Exp (MM/YY)
            <input
              inputMode="numeric"
              autoComplete="cc-exp"
              value={exp}
              onChange={(e) => {
                let v = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
                if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                setExp(v);
              }}
              placeholder="08/28"
              required
            />
          </label>

          <label>
            CVV
            <input
              inputMode="numeric"
              autoComplete="cc-csc"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="123"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={!valid}
          style={{
            marginTop: 8,
            padding: "10px 14px",
            background: valid ? "#e50914" : "#666",
            color: "#fff",
            border: 0,
            borderRadius: 8,
            cursor: valid ? "pointer" : "not-allowed",
          }}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}
