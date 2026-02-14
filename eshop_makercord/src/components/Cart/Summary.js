import "../Cart/ShippingPaymentSection.css"

const Summary = () => {
  return (
    <section className="cart-summary">
        <h3>Souhrn objednávky</h3>
        <div className="summary-item">
            <span>Celková cena:</span>
            <span>1234 Kč</span>
        </div>
        <div className="summary-item">
            <span>Doprava:</span>
            <span>99 Kč</span>
        </div>
        <div className="summary-item total">
            <span>Celkem k úhradě:</span>
            <span>1333 Kč</span>
        </div>
    </section>
  )
}

export default Summary
