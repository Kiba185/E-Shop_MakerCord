import "../Cart/ShippingPaymentSection.css"

const DeliveryDetails = () => {
  return (
    <section className="delivery-details-section">
        <div className="contact-details">
            <h3>Kontaktní údaje</h3>
            <form>
                <input type="text" placeholder="Jméno" required />
                <input type="text" placeholder="Příjmení" required />
                <input type="email" placeholder="E-mail" required />
                <input type="tel" placeholder="Telefon" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
            </form>
        </div>
        <div className="billing-address">
            <h3>Dodací adresa</h3>
            <form>
                <input type="text" placeholder="Ulice" required />
                <input type="text" placeholder="Číslo popisné" required />
                <input type="text" placeholder="Město" required />
                <input type="text" placeholder="PSČ" required />
                <select required>
                    <option value="cz">Česká republika</option>
                    <option value="sk">Slovensko</option>
                </select>
            </form>
        </div>
    </section>
  )
}

export default DeliveryDetails
