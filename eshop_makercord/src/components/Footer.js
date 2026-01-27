import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="footer-links">
                <a href="/about">About Us</a>
                <a href="/contact">Contact</a>
                <a href="/privacy">Privacy Policy</a>
            </div>
            <p>© 2024 MakerCord. All rights reserved.</p>   
        </footer>
    );
}

export default Footer;