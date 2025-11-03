import { createContext, useContext, useEffect, useMemo, useState } from "react";

const Ctx = createContext(null);
const LS_KEY = "cart.v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [warning, setWarning] = useState("");

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  function add(item) {
    // Enforce: only one subscription item in cart
    if (item.type === "subscription") {
      const hasDifferentSub = items.some(
        (i) => i.type === "subscription" && i.id !== item.id,
      );
      if (hasDifferentSub) {
        setWarning("Only one subscription can be in the cart at a time.");
        return;
      }
    }
    setItems((xs) => {
      const i = xs.findIndex((x) => x.id === item.id);
      if (i >= 0) {
        const next = xs.slice();
        next[i] = { ...xs[i], qty: xs[i].qty + 1 };
        return next;
      }
      return [...xs, { ...item, qty: 1 }];
    });
  }
  function remove(id) {
    setItems((xs) => xs.filter((x) => x.id !== id));
  }
  function setQty(id, qty) {
    const q = Math.max(1, Number(qty) || 1);
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, qty: q } : x)));
  }
  function clearWarning() {
    setWarning("");
  }

  const count = useMemo(() => items.reduce((n, x) => n + x.qty, 0), [items]);
  const total = useMemo(
    () => items.reduce((n, x) => n + x.qty * x.price, 0),
    [items],
  );

  const value = {
    items,
    add,
    remove,
    setQty,
    count,
    total,
    warning,
    clearWarning,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useCart = () => useContext(Ctx);
