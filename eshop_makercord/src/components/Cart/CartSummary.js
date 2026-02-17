import "./CartSummary.css";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

const CartSummary = ({ setOrderStatus, orderStatus, products }) => {
  const {
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
  } = useCart();

  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);

  const handleApply = () => {
    const ok = applyPromoCode(code);
    if (ok) {
      setMessage({ type: "success", text: `Kód ${code.toUpperCase()} byl použit.` });
    } else {
      setMessage({ type: "error", text: "Neplatný slevový kód." });
    }
  };

  const handleClear = () => {
    clearPromoCode();
    setCode("");
    setMessage(null);
  };

  const handleContinue = () => {
    if (!products || products.length > 0) {
      setOrderStatus(orderStatus >= 4 ? 4 : orderStatus + 1);
    }
  };

  const handleBack = () => {
    setOrderStatus(
      orderStatus <= 1 ? 1 : orderStatus - 1

    );
  }

  const fmt = (n) => n?.toFixed(2) ?? "0.00";

  return (
    <section className="cart-summary">
      <h3>Souhrn objednávky</h3>

      <div className="summary-row">
        <span>Celkem bez DPH</span>
        <span>{fmt(subtotal)} Kč</span>
      </div>

      <div className="summary-row">
        <span>DPH</span>
        <span>{fmt(vatAmount)} Kč</span>
      </div>

      <div className="summary-row">
        <span>Celkem</span>
        <span>{fmt(totalBeforeDiscount)} Kč</span>
      </div>

      {discountAmount > 0 && (
        <div className="summary-row discount">
          <span>Sleva ({appliedCode})</span>
          <span>-{fmt(discountAmount)} Kč</span>
        </div>
      )}

      {orderStatus >= 2 && (
        <div className="summary-row">
          <span>Dopravné</span>
          <span>{fmt(shippingAmount)} Kč</span>
        </div>
      )}

      {orderStatus >= 2 && (
        <div className="summary-row">
          <span>Způsob platby</span>
          <span>{fmt(paymentMethodAmount)} Kč</span>
        </div>
      )}

      <div className="summary-row total">
        <strong>Cena celkem</strong>
        <strong>{fmt(total)} Kč</strong>
      </div>

      <div className="promo">
        <label htmlFor="promo">Slevový kód</label>
        <div className="promo-controls">
          <input id="promo" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Zadejte kód" />
          <button className="apply" onClick={handleApply}>Použít</button>
        </div>
        {appliedCode && (
          <div className="applied">
            <span>Kód <strong>{appliedCode}</strong> použit.</span>
            <button className="clear" onClick={handleClear}>Odebrat</button>
          </div>
        )}
        {message && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <div className="summary-actions">
          <button className={`back ${orderStatus === 1 ? 'deactive' : ''}`} onClick={handleBack}>Zpět</button>
          <button className={`continue ${!products || products.length === 0 ? 'deactive' : ''}`} onClick={handleContinue}>Pokračovat</button>
        </div>
      </div>
    </section>
  );
};

export default CartSummary;
