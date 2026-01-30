import "./Header.css";

import { NavLink } from "react-router-dom";

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
        <nav className="nav-links">
          <NavLink to="/contact"><img src={contact_icon} alt="Contact" /></NavLink>
          <NavLink to="/cart"><img src={cart_icon} alt="Cart" /></NavLink>
          <NavLink to="/UserProfile"><img src={profile_icon} alt="Profile" /></NavLink>
          <NavLink to="/translation"><img src={translation_icon} alt="Translation" /></NavLink>
        </nav>
      </div>
      <div className="header-bottom" />
    </header>
  );
};
export default Header;