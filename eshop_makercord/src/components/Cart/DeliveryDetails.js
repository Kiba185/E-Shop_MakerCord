import "./DeliveryDetails.css";
import { useCart } from "../../context/CartContext";

const DeliveryDetails = () => {
  const { deliveryDetails, setDeliveryDetails } = useCart();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="delivery-details-section">
        <div className="contact-details">
            <h3>Kontaktní údaje</h3>
            <form>
                <input type="text" name="firstName" placeholder="Jméno" value={deliveryDetails.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Příjmení" value={deliveryDetails.lastName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="E-mail" value={deliveryDetails.email} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Telefon" value={deliveryDetails.phone} onChange={handleChange} required />
            </form>
        </div>
        <div className="billing-address">
            <h3>Dodací adresa</h3>
            <form>
                <input type="text" name="street" placeholder="Ulice" value={deliveryDetails.street} onChange={handleChange} required />
                <input type="text" name="streetNumber" placeholder="Číslo popisné" value={deliveryDetails.streetNumber} onChange={handleChange} required />
                <input type="text" name="city" placeholder="Město" value={deliveryDetails.city} onChange={handleChange} required />
                <input type="text" name="postalCode" placeholder="PSČ" value={deliveryDetails.postalCode} onChange={handleChange} required />
                <select name="country" value={deliveryDetails.country} onChange={handleChange} required>
                    <option value="cz">Česká republika</option>
                    <option value="sk">Slovensko</option>
                </select>
            </form>
        </div>
    </section>
  )
}

export default DeliveryDetails
