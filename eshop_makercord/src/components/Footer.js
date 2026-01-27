import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <ul className="footer-links">
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
            <p>© 2024 MakerCord. All rights reserved.</p>   
        </footer>
    );
}

export default Footer;