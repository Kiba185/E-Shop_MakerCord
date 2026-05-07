import "./HamMenu.css";

import { NavLink } from "react-router-dom";

import logo from "../../images/logo.png";
import { LuPhone } from "react-icons/lu";
import { GrCart } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";

const HamHeader = ({ open, closeMenu }) => {
  const { totalItems } = useCart();
  const { currentUser, isLoggedIn } = useUser();

  return (
    <section className={`ham-header ${open ? "active" : ""}`}>
      <div className="ham-header-top">
        <button type="button" className="ham-close" onClick={closeMenu} aria-label="Zavřít menu">
          ×
        </button>
      </div>
      <nav className="ham-links">
        <NavLink to="/" className="ham-link" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="ham-logo" />
        </NavLink>
        <NavLink to="/contact" className="ham-link" onClick={closeMenu}>
          <LuPhone />
        </NavLink>
        <NavLink to="/cart" className="ham-link" onClick={closeMenu}>
          <GrCart />
          {totalItems > 0 && <span className="nav-badge">{totalItems}</span>}
        </NavLink>
        {currentUser?.isAdmin && (
          <NavLink to="/admin" className="ham-link" onClick={closeMenu}>
            <MdOutlineAdminPanelSettings />
          </NavLink>
        )}
        <NavLink
          to="/user-profile"
          className={`ham-link user-link ${isLoggedIn ? "logged-in" : ""}`}
          onClick={closeMenu}>
          <IoPersonOutline />
        </NavLink>
      </nav>
    </section>
  );
};
export default HamHeader;
