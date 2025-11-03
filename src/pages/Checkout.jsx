import React, { useState } from "react";
import { useCart } from "../cart/CartContext.jsx";

export default function Checkout() {
  const { total } = useCart();
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePay = () => {
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(card)) {
      alert("Card must be in format 1234 5678 9012 3456");
      return;
    }
    const data = { name, card, exp, cvv, date: new Date().toISOString() };
    localStorage.setItem("streamlist:card", JSON.stringify(data));
    alert("Payment saved locally (demo only)");
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", color: "#fff" }}>
      <h1>Checkout</h1>
      <div style={{ marginBottom: 10 }}>Total due: ${total.toFixed(2)}</div>

      <label>Name on card</label>
      <input value={name} onChange={e=>setName(e.target.value)} style={{ width:"100%", marginBottom:10 }} />

      <label>Card number</label>
      <input value={card} onChange={e=>setCard(e.target.value)} placeholder="1234 5678 9012 3456" style={{ width:"100%", marginBottom:10 }} />

      <label>Exp (MM/YY)</label>
      <input value={exp} onChange={e=>setExp(e.target.value)} style={{ width:"100%", marginBottom:10 }} />

      <label>CVV</label>
      <input value={cvv} onChange={e=>setCvv(e.target.value)} style={{ width:"100%", marginBottom:20 }} />

      <button onClick={handlePay} style={{ width:"100%", padding:"10px", background:"#e50914", color:"#fff", border:0, borderRadius:6 }}>
        Pay Now
      </button>
    </div>
  );
}
