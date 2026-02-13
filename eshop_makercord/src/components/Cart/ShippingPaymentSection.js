import "./ShippingPaymentSection.css";
import React, {useState} from "react";

const ShippingPaymentSection = () => {

    const [shippingMethod, setShippingMethod] = useState("pickup");
    const [paymentMethod, setPaymentMethod] = useState("card");

    const handleShippingChange = (e) => {
        setShippingMethod(e.target.value);
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };



    return (
        <section className="shipping-payment-section">
            <div className="shipping-method">
                <h3>Způsob dodání</h3>
                <form>
                    <div className="shipping-option">
                        <input type="radio" id="shipping2" name="shipping" value="pickup" checked={shippingMethod === "pickup"} onChange={handleShippingChange} />
                        <label htmlFor="shipping2">Osobní odběr - Zdarma (Vyzdvihnutí na prodejně)</label>
                    </div>
                    <div className="shipping-option">
                        <input type="radio" id="shipping1" name="shipping" value="courier" checked={shippingMethod === "courier"} onChange={handleShippingChange} />
                        <label htmlFor="shipping1">Kurýrní služba - 150 Kč (Doručení do 2-4 pracovních dnů) </label>
                    </div>
                </form>
            </div>
            <div className="payment-method">
                <h3>Způsob platby</h3>
                <form>
                    <div className="payment-option">
                        <input type="radio" id="payment1" name="payment" value="card" defaultChecked />
                        <label htmlFor="payment1">Platba kartou online</label>
                    </div>
                    <div className="payment-option">
                        <input type="radio" id="payment2" name="payment" value="cod" />
                        <label htmlFor="payment2">Dobírka - Platba při převzetí (příplatek 50 Kč)</label>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default ShippingPaymentSection;