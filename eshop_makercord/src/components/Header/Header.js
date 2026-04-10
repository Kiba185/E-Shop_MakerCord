import "./Header.css";

import { NavLink } from "react-router-dom";

import logo from "../../images/logo.png";
import { LuPhone } from "react-icons/lu";
import { GrCart } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineGTranslate } from "react-icons/md";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";

import HamMenu from "./HamMenu";

const Header = () => {
  const { totalItems, popupToggle, popupVersion, setPopupToggle } = useCart();
  const { isLoggedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!popupToggle) return;

    const timeoutId = setTimeout(() => {
      setPopupToggle(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [popupToggle, popupVersion, setPopupToggle]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoClick = (event) => {
    if (window.innerWidth <= 1024) {
      event.preventDefault();
      toggleMenu();
    }
  };

  return (
    <>
      <HamMenu open={isMenuOpen} closeMenu={closeMenu} totalItems={totalItems} isLoggedIn={isLoggedIn} />
      <header>
        <div className="header-top">
          <NavLink to="/" onClick={handleLogoClick} className="logo-link">
            <img src={logo} className="logo" alt="Logo" />
          </NavLink>
          <input id="searchbar" type="search" placeholder="Hledat..." />
          <nav className="nav-links">
            <NavLink to="/contact" className="nav-link"><LuPhone /></NavLink>
            <NavLink to="/cart" className="nav-link">
              <GrCart />
              {totalItems > 0 && <span className="nav-badge">{totalItems}</span>}
            </NavLink>
            <NavLink to="/user-profile" className={`nav-link user-link ${isLoggedIn ? "logged-in" : ""}`}><IoPersonOutline /></NavLink>
          </nav>
        </div>
        <div className="header-bottom" />
        <div className={`cart-popup ${popupToggle ? "active" : ""}`}>
          <p>Produkt přidán do košíku</p>
        </div>
      </header>
    </>
  );
};
export default Header;
