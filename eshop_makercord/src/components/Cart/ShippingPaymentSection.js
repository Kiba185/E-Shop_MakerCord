import "./ShippingPaymentSection.css";
import { useCart } from "../../context/CartContext";

const ShippingPaymentSection = () => {
    const {
        shippingMethod,
        setShippingMethod,
        paymentMethod,
        setPaymentMethod,
        shippingOptions,
        paymentOptions,
    } = useCart();

    const fmt = (price) => `${price} Kč`;

    return (
        <section className="shipping-payment-section">
            <div className="shipping-method">
                <h3>Způsob dodání</h3>
                <form>
                    <label className={`shipping-payment-option ${shippingMethod === "pickup" ? "selected" : ""}`} htmlFor="shipping2">
                        <input type="radio" id="shipping2" name="shipping" value="pickup" checked={shippingMethod === "pickup"} onChange={(e) => setShippingMethod(e.target.value)} />
                        <span>Osobní odběr - {shippingOptions.pickup.price === 0 ? "Zdarma" : fmt(shippingOptions.pickup.price)} (Vyzdvihnutí na prodejně)</span>
                    </label>
                    <label className={`shipping-payment-option ${shippingMethod === "courier" ? "selected" : ""}`} htmlFor="shipping1">
                        <input type="radio" id="shipping1" name="shipping" value="courier" checked={shippingMethod === "courier"} onChange={(e) => setShippingMethod(e.target.value)} />
                        <span>Kurýrní služba - {fmt(shippingOptions.courier.price)} (Doručení do 2-4 pracovních dnů)</span>
                    </label>
                </form>
            </div>
            <div className="payment-method">
                <h3>Způsob platby</h3>
                <form>
                    <label className={`shipping-payment-option ${paymentMethod === "card" ? "selected" : ""}`} htmlFor="payment1">
                        <input type="radio" id="payment1" name="payment" value="card" checked={paymentMethod === "card"} onChange={(e) => setPaymentMethod(e.target.value)} />
                        <span>Platba kartou online - {paymentOptions.card.price === 0 ? "Zdarma" : fmt(paymentOptions.card.price)}</span>
                    </label>
                    <label className={`shipping-payment-option ${paymentMethod === "cod" ? "selected" : ""}`} htmlFor="payment2">
                        <input type="radio" id="payment2" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={(e) => setPaymentMethod(e.target.value)} />
                        <span>Dobírka - Platba při převzetí (příplatek {fmt(paymentOptions.cod.price)})</span>
                    </label>
                </form>
            </div>
        </section>
    );
}

export default ShippingPaymentSection;
