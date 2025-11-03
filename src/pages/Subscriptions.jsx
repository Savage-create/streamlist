import { useCart } from "../cart/CartContext";
import "../styles.css";
import catalog from "../catalog"; // src/catalog.js must `export default list`

// normalize the instructor data into a consistent shape
const normalize = (items = []) =>
  items.map((r, idx) => {
    const id = r.id ?? idx;
    const name = r.service ?? `Item ${idx + 1}`;
    const desc = r.serviceInfo ?? "";
    const price = Number(r.price ?? 0);
    const img = r.img ?? "";
    const type = (name || "").toLowerCase().includes("subscription")
      ? "subscription"
      : "accessory";
    return { id, name, desc, price, img, type };
  });

const data = normalize(catalog);
const subs = data.filter((x) => x.type === "subscription");
const accs = data.filter((x) => x.type === "accessory");

export default function Subscriptions() {
  const { add, warning, clearWarning } = useCart();

  return (
    <div>
      <h1 className="h1">Subscriptions</h1>

      {warning && (
        <div className="warn" onClick={clearWarning}>
          {warning}
        </div>
      )}

      <ul className="grid">
        {subs.map((p) => (
          <li key={p.id} className="card">
            <img
              src={p.img}
              alt={p.name}
              style={{ width: 80, marginBottom: 8, borderRadius: 10 }}
            />
            <div style={{ fontWeight: 600 }}>{p.name}</div>
            <div className="subtle">{p.desc}</div>
            <div style={{ margin: "8px 0" }}>${p.price.toFixed(2)}</div>
            <button className="btn" onClick={() => add(p)}>
              Add
            </button>
          </li>
        ))}
      </ul>

      <h2 className="h1" style={{ marginTop: 24 }}>
        Accessories
      </h2>
      <ul className="grid">
        {accs.map((p) => (
          <li key={p.id} className="card">
            <img
              src={p.img}
              alt={p.name}
              style={{ width: 80, marginBottom: 8, borderRadius: 10 }}
            />
            <div style={{ fontWeight: 600 }}>{p.name}</div>
            <div className="subtle">{p.desc}</div>
            <div style={{ margin: "8px 0" }}>${p.price.toFixed(2)}</div>
            <button className="btn" onClick={() => add(p)}>
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
