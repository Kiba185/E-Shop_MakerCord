import "./Header.css";

import { Link, NavLink, useNavigate } from "react-router-dom";

import logo from "../../images/logo.png";
import { LuPhone } from "react-icons/lu";
import { GrCart } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useCart } from "../../context/CartContext";
import { useEffect, useMemo, useRef, useState } from "react";
import { useProducts } from "../../context/ProductContext";
import { useUser } from "../../context/UserContext";

import HamMenu from "./HamMenu";

const Header = () => {
  const { totalItems, popupToggle, popupVersion, setPopupToggle } = useCart();
  const { currentUser, isLoggedIn } = useUser();
  const { products } = useProducts();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchCloseTimeout = useRef(null);

  const normalizeSearchValue = (value) =>
    value
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const searchResults = useMemo(() => {
    const query = normalizeSearchValue(searchQuery.trim());

    if (!query) return [];

    return products
      .filter((product) => {
        const searchableValues = [
          product.name,
          product.description,
          product.type,
          ...(product.colors || []),
          ...(product.parameters || []).flatMap((parameter) => [
            parameter.label,
            parameter.value,
          ]),
        ];

        return searchableValues
          .filter(Boolean)
          .some((value) => normalizeSearchValue(value).includes(query));
      })
      .slice(0, 6);
  }, [products, searchQuery]);

  const hasSearchQuery = searchQuery.trim().length > 0;

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

  useEffect(() => {
    return () => {
      if (searchCloseTimeout.current) {
        clearTimeout(searchCloseTimeout.current);
      }
    };
  }, []);

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

  const openSearch = () => {
    if (searchCloseTimeout.current) {
      clearTimeout(searchCloseTimeout.current);
    }

    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    searchCloseTimeout.current = setTimeout(() => {
      setIsSearchOpen(false);
    }, 120);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (searchResults.length === 0) {
      setIsSearchOpen(hasSearchQuery);
      return;
    }

    navigate(`/product/${searchResults[0].id}`);
    clearSearch();
  };

  return (
    <>
      <HamMenu open={isMenuOpen} closeMenu={closeMenu} totalItems={totalItems} isLoggedIn={isLoggedIn} />
      <header>
        <div className="header-top">
          <NavLink to="/" onClick={handleLogoClick} className="logo-link">
            <img src={logo} className="logo" alt="Logo" />
          </NavLink>
          <form className="header-search" role="search" onSubmit={handleSearchSubmit}>
            <input
              id="searchbar"
              type="search"
              placeholder="Hledat produkty..."
              autoComplete="off"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={openSearch}
              onBlur={closeSearch}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  clearSearch();
                  event.currentTarget.blur();
                }
              }}
            />
            {isSearchOpen && hasSearchQuery && (
              <div className="search-results" aria-live="polite">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <Link
                      to={`/product/${product.id}`}
                      className="search-result"
                      key={product.id}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={clearSearch}
                    >
                      <img src={product.image} alt={product.name} />
                      <span>
                        <strong>{product.name}</strong>
                        <small>{product.type} · {product.price} Kč</small>
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="search-empty">Žádný produkt nenalezen.</p>
                )}
              </div>
            )}
          </form>
          <nav className="nav-links">
            <NavLink to="/contact" className="nav-link"><LuPhone /></NavLink>
            <NavLink to="/cart" className="nav-link">
              <GrCart />
              {totalItems > 0 && <span className="nav-badge">{totalItems}</span>}
            </NavLink>
            {currentUser?.isAdmin && (
              <NavLink to="/admin" className="nav-link admin-nav-link" title="Administrace">
                <MdOutlineAdminPanelSettings />
              </NavLink>
            )}
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
