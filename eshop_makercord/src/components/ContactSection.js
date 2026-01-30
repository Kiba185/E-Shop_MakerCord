import "./ContactSection.css"

const ContactSection = () => {
  return <section className="contact-section">
    <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button onClick={() => alert("Message sent!")}>Send Message</button>
    </form>
</section>
}

export default ContactSection
