import "./Header.css";
import logo from "../images/logo.png";
import contact_icon from "../images/contact_icon.png";
import cart_icon from "../images/cart_icon.png";
import profile_icon from "../images/profile_icon.png";
import translation_icon from "../images/translation_icon.png";

const Header = () => {
  return (
    <header>
      <div className="header-top">
        <img src={logo} className="logo" alt="Logo" />
        <input id="searchbar" type="search" placeholder="Search..." />
        <ul className="nav-links">
          <li><a href="."><img src={contact_icon} alt="Contact" /></a></li>
          <li><a href="."><img src={cart_icon} alt="Cart" /></a></li>
          <li><a href="."><img src={profile_icon} alt="Profile" /></a></li>
          <li><a href="."><img src={translation_icon} alt="Translation" /></a></li>
        </ul>
      </div>
      <div className="header-bottom" />
    </header>
  );
};
export default Header;