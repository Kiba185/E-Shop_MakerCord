import "./Header.css";

import { NavLink } from "react-router-dom";

import logo from "../../images/logo.png";
import contact_icon from "../../images/contact_icon.png";
import cart_icon from "../../images/cart_icon.png";
import profile_icon from "../../images/profile_icon.png";
import translation_icon from "../../images/translation_icon.png";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const { totalItems } = useCart();

  return (
    <header>
      <div className="header-top">
        <NavLink to="/"><img src={logo} className="logo" alt="Logo" /></NavLink>
        <input id="searchbar" type="search" placeholder="Hledat..." />
        <nav className="nav-links">
          <NavLink to="/contact"><img src={contact_icon} alt="Kontakt" /></NavLink>
          <NavLink to="/cart" className="cart-link">
            <img src={cart_icon} alt="Košík" />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </NavLink>
          <NavLink to="/user-profile"><img src={profile_icon} alt="Profil" /></NavLink>
          <NavLink to="/translation"><img src={translation_icon} alt="Překlad" /></NavLink>
        </nav>
      </div>
      <div className="header-bottom" />
    </header>
  );
};
export default Header;