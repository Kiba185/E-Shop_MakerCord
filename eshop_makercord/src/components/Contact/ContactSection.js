import "./ContactSection.css"

const ContactSection = () => {
  return <section className="contact-section">
    <form className="contact-form">
        <input type="text" placeholder="Vaše jméno" required />
        <input type="email" placeholder="Váš e-mail" required />
        <textarea placeholder="Vaše zpráva" required></textarea>
        <button type="button" onClick={() => alert("Zpráva odeslána!")}>Odeslat zprávu</button>
    </form>
</section>
}

export default ContactSection
