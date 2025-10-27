import { useCart } from "../cart/CartContext";

export default function Cart() {
  const { items, setQty, remove, total } = useCart();
  return (
    <div>
      <h1 className="h1">Cart</h1>
      {items.length === 0 ? <p className="subtle">Cart is empty.</p> : (
        <ul className="stack">
          {items.map(it =>
            <li key={it.id} className="card" style={{display:"grid", gridTemplateColumns:"1fr auto auto auto", gap:12, alignItems:"center"}}>
              <div>
                <div style={{fontWeight:600}}>{it.name}</div>
                <div className="subtle">{it.type}</div>
              </div>
              <div className="subtle">${it.price.toFixed(2)}</div>
              <div>
                <input type="number" min="1" value={it.qty} onChange={e=>setQty(it.id, e.target.value)} className="qty" />
              </div>
              <button className="btn2" onClick={()=>remove(it.id)}>Remove</button>
            </li>
          )}
        </ul>
      )}
      <div style={{marginTop:18, fontWeight:700}}>Total: ${total.toFixed(2)}</div>
    </div>
  );
}
