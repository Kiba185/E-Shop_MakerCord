import "./HamMenu.css";

import { NavLink } from "react-router-dom";

import logo from "../../images/logo.png";
import { LuPhone } from "react-icons/lu";
import { GrCart } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineGTranslate } from "react-icons/md";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";
import { useUser } from "../../context/UserContext";

const HamHeader = () => {
  const { totalItems, popupToggle, popupVersion, setPopupToggle } = useCart();
  const { isLoggedIn } = useUser();

    return(
        <section className="ham-header">
            <nav className="ham-links">
                <NavLink to="/contact" className="cart-link"><LuPhone /></NavLink>
                <NavLink to="/cart" className="cart-link">
                    <GrCart />
                    {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </NavLink>
                <NavLink to="/user-profile" className={`cart-link user-link ${isLoggedIn ? "logged-in" : ""}`}><IoPersonOutline /></NavLink>
                <NavLink to="/translation" className="cart-link"><MdOutlineGTranslate /></NavLink>
            </nav>
        </section>
    );
};
export default HamHeader;