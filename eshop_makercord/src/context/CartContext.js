import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      setCart((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, quantity } : p))
    );}
  };

  const totalItems = cart.reduce((sum, p) => sum + (p.quantity || 0), 0);

  // DPH a slevový kód
  const VAT_RATE = 0.21; // 21% DPH 
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCode, setAppliedCode] = useState(null);

  const promoCodes = {
    MAKERCORD10: 0.1,
    WELCOME5: 0.05,
  };

  const applyPromoCode = (code) => {
    if (!code) return false;
    const key = code.trim().toUpperCase();
    const pct = promoCodes[key];
    if (pct || pct === 0) {
      setDiscountPercent(pct);
      setAppliedCode(key);
      return true;
    }
    return false;
  };

  const clearPromoCode = () => {
    setDiscountPercent(0);
    setAppliedCode(null);
  };

  const totalBeforeDiscount = cart.reduce((sum, p) => sum + (p.price * (p.quantity || 0)), 0);
  const vatAmount = totalBeforeDiscount * VAT_RATE;
  const subtotal = totalBeforeDiscount - vatAmount;
  const shippingAmount = 0;
  const paymentMethodAmount = 0;
  const discountAmount = totalBeforeDiscount * discountPercent;
  const total = totalBeforeDiscount - discountAmount + shippingAmount + paymentMethodAmount;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        subtotal,
        vatAmount,
        totalBeforeDiscount,
        discountAmount,
        shippingAmount,
        paymentMethodAmount,  
        total,
        appliedCode,
        applyPromoCode,
        clearPromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
