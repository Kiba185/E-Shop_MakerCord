import "./Header.css";

import { NavLink } from "react-router-dom";

import logo from "../../images/logo.png";
import { LuPhone } from "react-icons/lu";
import { GrCart } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineGTranslate } from "react-icons/md";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const { totalItems } = useCart();

  return (
    <header>
      <div className="header-top">
        <NavLink to="/"><img src={logo} className="logo" alt="Logo" /></NavLink>
        <input id="searchbar" type="search" placeholder="Hledat..." />
        <nav className="nav-links">
          <NavLink to="/contact" className="cart-link"><LuPhone /></NavLink>
          <NavLink to="/cart" className="cart-link">
            <GrCart />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </NavLink>
          <NavLink to="/user-profile" className="cart-link"><IoPersonOutline /></NavLink>
          <NavLink to="/translation" className="cart-link"><MdOutlineGTranslate /></NavLink>
        </nav>
      </div>
      <div className="header-bottom" />
    </header>
  );
};
export default Header;