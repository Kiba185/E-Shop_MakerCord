import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
const CHECKOUT_STORAGE_KEY = "cartCheckout";
const CART_STORAGE_KEY = "cart";

const defaultDeliveryDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  streetNumber: "",
  city: "",
  postalCode: "",
  country: "cz",
};

const readStorageJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};

export const CartProvider = ({ children }) => {
  const shippingOptions = {
    pickup: { label: "Osobní odběr", price: 0 },
    courier: { label: "Kurýrní služba", price: 150 },
  };

  const paymentOptions = {
    card: { label: "Platba kartou online", price: 0 },
    cod: { label: "Dobírka", price: 50 },
  };

  const promoCodes = {
    MAKERCORD10: 0.1,
    WELCOME5: 0.05,
  };

  const [cart, setCart] = useState(() => readStorageJSON(CART_STORAGE_KEY, []));
  const storedCheckout = readStorageJSON(CHECKOUT_STORAGE_KEY, {});

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

  const [shippingMethod, setShippingMethod] = useState(() =>
    shippingOptions[storedCheckout.shippingMethod] ? storedCheckout.shippingMethod : "pickup"
  );
  const [paymentMethod, setPaymentMethod] = useState(() =>
    paymentOptions[storedCheckout.paymentMethod] ? storedCheckout.paymentMethod : "card"
  );
  const [deliveryDetails, setDeliveryDetails] = useState(() => ({
    ...defaultDeliveryDetails,
    ...(storedCheckout.deliveryDetails || {}),
  }));

  // DPH a slevový kód
  const VAT_RATE = 0.21; // 21% DPH 
  const initialAppliedCode = typeof storedCheckout.appliedCode === "string"
    ? storedCheckout.appliedCode.trim().toUpperCase()
    : null;
  const initialDiscountPercent = initialAppliedCode ? (promoCodes[initialAppliedCode] ?? 0) : 0;
  const [discountPercent, setDiscountPercent] = useState(initialDiscountPercent);
  const [appliedCode, setAppliedCode] = useState(initialAppliedCode);

  useEffect(() => {
    try {
      localStorage.setItem(
        CHECKOUT_STORAGE_KEY,
        JSON.stringify({
          shippingMethod,
          paymentMethod,
          deliveryDetails,
          appliedCode,
        })
      );
    } catch (e) {}
  }, [shippingMethod, paymentMethod, deliveryDetails, appliedCode]);

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
  const shippingAmount = shippingOptions[shippingMethod]?.price ?? 0;
  const paymentMethodAmount = paymentOptions[paymentMethod]?.price ?? 0;
  const discountAmount = totalBeforeDiscount * discountPercent;
  const total = totalBeforeDiscount - discountAmount + shippingAmount + paymentMethodAmount;
  const isDeliveryDetailsComplete = Object.entries(deliveryDetails).every(([key, value]) => {
    if (key === "country") return Boolean(value);
    return String(value).trim() !== "";
  });

  // cart popup
  const [popupToggle, setPopupToggle] = useState(false);
  const [popupVersion, setPopupVersion] = useState(0);

  const showCartPopup = () => {
    setPopupToggle(true);
    setPopupVersion((prev) => prev + 1);
  };

  const resetCheckoutState = () => {
    setCart([]);
    setShippingMethod("pickup");
    setPaymentMethod("card");
    setDeliveryDetails(defaultDeliveryDetails);
    setDiscountPercent(0);
    setAppliedCode(null);

    try {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(CHECKOUT_STORAGE_KEY);
    } catch (e) {}
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        shippingOptions,
        paymentOptions,
        shippingMethod,
        setShippingMethod,
        paymentMethod,
        setPaymentMethod,
        deliveryDetails,
        setDeliveryDetails,
        isDeliveryDetailsComplete,
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
        popupToggle,
        setPopupToggle,
        popupVersion,
        showCartPopup,
        resetCheckoutState,
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
