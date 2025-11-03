// src/cart/CartContext.jsx
import { createContext, useContext, useState, useMemo, useCallback } from "react";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { id, name, price, qty, type }
  const [warning, setWarning] = useState("");

  // Add item logic
  const add = useCallback(
    (product) => {
      const hasSubscription = items.some((i) => i.type === "subscription");

      if (product.type === "subscription" && hasSubscription) {
        setWarning("Only one subscription is allowed at a time.");
        return;
      }

      setItems((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing) {
          // Accessories can increase qty, subscription stays at 1
          return prev.map((i) =>
            i.id === product.id
              ? { ...i, qty: i.type === "subscription" ? 1 : i.qty + 1 }
              : i
          );
        }
        // New item
        return [...prev, { ...product, qty: 1 }];
      });

      setWarning(""); // clear previous warning if any
    },
    [items]
  );

  // Remove item
  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setWarning("");
  }, []);

  // Set quantity
  const setQty = useCallback((id, qty) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, qty: i.type === "subscription" ? 1 : Math.max(1, +qty || 1) }
          : i
      )
    );
  }, []);

  // Clear warnings
  const clearWarning = useCallback(() => setWarning(""), []);

  // Total calculation
  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const value = {
    items,
    add,
    remove,
    setQty,
    warning,
    clearWarning,
    total,
  };

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const context = useContext(CartCtx);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
