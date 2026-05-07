import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <ul className="footer-links">
                <li><a href="/">Domovsá stránka</a></li>
                <li><a href="/cart">Košík</a></li>
                <li><a href="/products">Produkty</a></li>
                <li><a href="/contact">Kontakt</a></li>
                <li><a href="/site-map">Mapa stránek</a></li>
            </ul>
            <p>© 2026 MakerCord.</p>   
        </footer>
    );
}

export default Footer;