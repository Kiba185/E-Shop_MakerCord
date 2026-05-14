import "./Summary.css";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

const countryLabels = {
  cz: "Česka republika",
  sk: "Slovensko",
};

const Summary = ({ setOrderStatus, onCompleteOrder }) => {
  const {
    cart,
    deliveryDetails,
    shippingMethod,
    paymentMethod,
    shippingOptions,
    paymentOptions,
    subtotal,
    vatAmount,
    totalBeforeDiscount,
    discountAmount,
    shippingAmount,
    paymentMethodAmount,
    total,
    appliedCode,
  } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fmt = (n) => `${n?.toFixed(2) ?? "0.00"} Kč`;
  const fullName = `${deliveryDetails.firstName} ${deliveryDetails.lastName}`.trim();
  const fullAddress = `${deliveryDetails.street} ${deliveryDetails.streetNumber}`.trim();
  const country = countryLabels[deliveryDetails.country] ?? deliveryDetails.country;

  const handleCompleteOrder = () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      onCompleteOrder?.();
      setIsSubmitting(false);
    }, 1800);
  };

  return (
    <section className="order-summary-panel">
      <div className="order-summary-header">
        <div>
          <h3>Souhrn objednávky</h3>
          <p className="order-summary-description">
            Zkontrolujte všechny údaje před dokončením objednávky.
          </p>
        </div>
      </div>

      <div className="order-summary-grid">
        <div className="order-summary-card order-summary-totals">
          <h4>Cenový přehled</h4>

          <div className="order-summary-row">
            <span>Celkem bez DPH</span>
            <strong>{fmt(subtotal)}</strong>
          </div>

          <div className="order-summary-row">
            <span>DPH</span>
            <strong>{fmt(vatAmount)}</strong>
          </div>

          <div className="order-summary-row">
            <span>Mezisoučet</span>
            <strong>{fmt(totalBeforeDiscount)}</strong>
          </div>

          {discountAmount > 0 && (
            <div className="order-summary-row discount">
              <span>Sleva ({appliedCode})</span>
              <strong>-{fmt(discountAmount)}</strong>
            </div>
          )}

          <div className="order-summary-row">
            <span>Doprava</span>
            <strong>{shippingAmount === 0 ? "Zdarma" : fmt(shippingAmount)}</strong>
          </div>

          <div className="order-summary-row">
            <span>Platba</span>
            <strong>{paymentMethodAmount === 0 ? "Zdarma" : fmt(paymentMethodAmount)}</strong>
          </div>

          <div className="order-summary-row total">
            <span>Celkem k úhradě</span>
            <strong>{fmt(total)}</strong>
          </div>
        </div>

        <div className="order-summary-card order-summary-contact">
          <h4>Kontakt a doručení</h4>
          <div className="order-summary-info">
            <div className="order-summary-info-block">
              <span>Kontakt</span>
              <strong>{fullName}</strong>
              <p>{deliveryDetails.email}</p>
              <p>{deliveryDetails.phone}</p>
            </div>

            <div className="order-summary-info-block">
              <span>Dodací adresa</span>
              <strong>{fullAddress}</strong>
              <p>{deliveryDetails.city}, {deliveryDetails.postalCode}</p>
              <p>{country}</p>
            </div>

            <div className="order-summary-info-block">
              <span>Doprava</span>
              <strong>{shippingOptions[shippingMethod]?.label ?? "-"}</strong>
              <p>{shippingAmount === 0 ? "Zdarma" : fmt(shippingAmount)}</p>
            </div>

            <div className="order-summary-info-block">
              <span>Platba</span>
              <strong>{paymentOptions[paymentMethod]?.label ?? "-"}</strong>
              <p>{paymentMethodAmount === 0 ? "Bez příplatku" : fmt(paymentMethodAmount)}</p>
            </div>
          </div>
        </div>

        <div className="order-summary-card order-summary-products">
          <h4>Objednané položky</h4>
          <div className="order-summary-items">
            {cart.map((product) => (
              <div key={product.id} className="order-summary-item">
                <div>
                  <strong>{product.name}</strong>
                  <p>{product.quantity} ks x {fmt(product.price)}</p>
                </div>
                <strong>{fmt(product.price * product.quantity)}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="order-summary-actions">
        <button type="button" className="summary-action back" onClick={() => setOrderStatus(3)} disabled={isSubmitting}>Zpět</button>
        <button type="button" className={`summary-action complete ${isSubmitting ? "loading" : ""}`} onClick={handleCompleteOrder} disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="summary-action-loader">
              <span className="summary-loader-dot" />
              <span className="summary-loader-dot" />
              <span className="summary-loader-dot" />
            </span>
          ) : ("Dokončit objednavku")}
        </button>
      </div>
    </section>
  );
};

export default Summary;
