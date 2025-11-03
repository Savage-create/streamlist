import { useState } from "react";
export default function Home() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  function add(e) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    console.log("[StreamList] Added:", t);
    setItems([{ id: crypto.randomUUID(), title: t }, ...items]);
    setText("");
  }
  return (
    <div>
      <h1>StreamList</h1>
      <form onSubmit={add} className="row">
        <input
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a movie or show"
        />
        <button className="btn" type="submit">
          Add
        </button>
      </form>
      <div className="list">
        {items.length === 0 ? (
          <div className="page-placeholder">No items</div>
        ) : (
          items.map((x) => (
            <div className="item" key={x.id}>
              <span>{x.title}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
