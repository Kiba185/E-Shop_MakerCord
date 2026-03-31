import "./Header.css";

import { NavLink } from "react-router-dom";

import logo from "../../images/logo.png";
import { LuPhone } from "react-icons/lu";
import { GrCart } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineGTranslate } from "react-icons/md";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";
import { useUser } from "../../context/UserContext";

import HamMenu from "./HamMenu";

const Header = () => {
  const { totalItems, popupToggle, popupVersion, setPopupToggle } = useCart();
  const { isLoggedIn } = useUser();

  useEffect(() => {
    if (!popupToggle) return;

    const timeoutId = setTimeout(() => {
      setPopupToggle(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [popupToggle, popupVersion, setPopupToggle]);

  return (
    <header>
      <HamMenu> </HamMenu>
      <div className="header-top">
        <NavLink to="/"><img src={logo} className="logo" alt="Logo" /></NavLink>
        <input id="searchbar" type="search" placeholder="Hledat..." />
        <nav className="nav-links">
          <NavLink to="/contact" className="cart-link"><LuPhone /></NavLink>
          <NavLink to="/cart" className="cart-link">
            <GrCart />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </NavLink>
          <NavLink to="/user-profile" className={`cart-link user-link ${isLoggedIn ? "logged-in" : ""}`}><IoPersonOutline /></NavLink>
          <NavLink to="/translation" className="cart-link"><MdOutlineGTranslate /></NavLink>
        </nav>
      </div>
      <div className="header-bottom" />
      <div className={`cart-popup ${popupToggle ? "active" : ""}`}>
            <p>Produkt přidán do košíku</p>
      </div>
    </header>
  );
};
export default Header;
