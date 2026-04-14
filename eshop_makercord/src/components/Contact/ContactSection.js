import "./ContactSection.css"

const ContactSection = () => {
  return <section className="contact-section">
    <div className="contact-info">
        <h2>Kontaktujte nás</h2>
        <p>Máte dotazy ohledně našich produktů<br/>nebo potřebujete pomoc s objednávkou? Neváhejte nás kontaktovat!</p>
        <p><strong>Email:</strong> <a href="mailto:kontakt@makercord.cz">kontakt@makercord.cz</a></p>
        <p><strong>Telefon:</strong> +420 123 456 789</p>
        <p><strong>Adresa:</strong> Ulice 123, Město, PSČ</p>
    </div>
    <form className="contact-form">
        <input type="text" placeholder="Vaše jméno" required />
        <input type="email" placeholder="Váš e-mail" required />
        <textarea placeholder="Vaše zpráva" required></textarea>
        <button type="button" onClick={() => alert("Zpráva odeslána!")}>Odeslat zprávu</button>
    </form>
</section>
}

export default ContactSection
