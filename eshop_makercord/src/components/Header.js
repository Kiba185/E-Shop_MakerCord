import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="header-top">
        <img src="../images/logo.png" alt="" />
        <input id="searchbar" type="search" placeholder="Search..." />
        <ul className="nav-links">
            <li><a href="."><img src="../images/contact_icon.png" alt="" /></a></li>
            <li><a href="."><img src="" alt="" /></a></li>
            <li><a href="."><img src="" alt="" /></a></li>
            <li><a href="."><img src="" alt="" /></a></li>
        </ul>
      </div>
      <div className="header-bottom" />
    </header>
  );
};

export default Header;