import { Link } from "react-router-dom";
import { FiBox, FiHome, FiMail, FiMap, FiShoppingCart, FiUser } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import PageHeading from "../components/PageHeading";
import { useProducts } from "../context/ProductContext";
import { useUser } from "../context/UserContext";
import "./SiteMap.css";

const primaryLinks = [
  {
    title: "Domovská stránka",
    description: "Úvod, doporučené produkty a rychlý vstup do nabídky.",
    to: "/",
    icon: <FiHome />,
  },
  {
    title: "Produkty",
    description: "Kompletní katalog s filtrováním podle ceny, barvy a typu.",
    to: "/products",
    icon: <FiBox />,
  },
  {
    title: "Košík",
    description: "Přehled vybraných produktů, doprava, platba a dokončení objednávky.",
    to: "/cart",
    icon: <FiShoppingCart />,
  },
  {
    title: "Kontakt",
    description: "Kontaktní informace a formulář pro dotazy k objednávkám.",
    to: "/contact",
    icon: <FiMail />,
  },
];

const accountLinks = [
  {
    title: "Uživatelský profil",
    description: "Přihlášení, registrace a správa kontaktních údajů.",
    to: "/user-profile",
    icon: <FiUser />,
  },
  {
    title: "Mapa stránek",
    description: "Přehled všech důležitých částí webu na jednom místě.",
    to: "/site-map",
    icon: <FiMap />,
  },
];

const SiteMap = () => {
  const { products } = useProducts();
  const { currentUser } = useUser();
  const featuredProducts = products.slice(0, 6);
  const productTypes = [...new Set(products.map((product) => product.type).filter(Boolean))];

  return (
    <main className="site-map-page">
      <PageHeading>Mapa stránek</PageHeading>

      <section className="site-map-hero">
        <p className="site-map-kicker">Přehled MakerCord</p>
        <h1>Najděte rychle správnou část obchodu</h1>
        <p>
          Mapa stránek spojuje hlavní navigaci, zákaznické účty, katalog i produktové
          detaily do jednoho čistého přehledu.
        </p>
      </section>

      <section className="site-map-layout">
        <div className="site-map-main">
          <div className="site-map-section">
            <div className="site-map-section-header">
              <h2>Hlavní stránky</h2>
              <span>{primaryLinks.length} odkazy</span>
            </div>
            <div className="site-map-grid">
              {primaryLinks.map((item) => (
                <Link to={item.to} className="site-map-card" key={item.to}>
                  <span className="site-map-icon">{item.icon}</span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="site-map-section">
            <div className="site-map-section-header">
              <h2>Účet a orientace</h2>
              <span>{accountLinks.length + (currentUser?.isAdmin ? 1 : 0)} odkazy</span>
            </div>
            <div className="site-map-grid">
              {accountLinks.map((item) => (
                <Link to={item.to} className="site-map-card" key={item.to}>
                  <span className="site-map-icon">{item.icon}</span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                </Link>
              ))}
              {currentUser?.isAdmin && (
                <Link to="/admin" className="site-map-card">
                  <span className="site-map-icon"><MdOutlineAdminPanelSettings /></span>
                  <span>
                    <strong>Administrace</strong>
                    <small>Správa produktů, uživatelů a obsahu obchodu.</small>
                  </span>
                </Link>
              )}
            </div>
          </div>

          <div className="site-map-section">
            <div className="site-map-section-header">
              <h2>Vybrané produkty</h2>
              <span>{products.length} produktů v katalogu</span>
            </div>
            <div className="site-map-product-list">
              {featuredProducts.map((product) => (
                <Link to={`/product/${product.id}`} className="site-map-product" key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <span>
                    <strong>{product.name}</strong>
                    <small>{product.type} · {product.price} Kč</small>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <aside className="site-map-sidebar">
          <div className="site-map-summary">
            <h2>Struktura katalogu</h2>
            <dl>
              <div>
                <dt>Produkty</dt>
                <dd>{products.length}</dd>
              </div>
              <div>
                <dt>Typy</dt>
                <dd>{productTypes.length}</dd>
              </div>
              <div>
                <dt>Účet</dt>
                <dd>{currentUser ? "Přihlášen" : "Nepřihlášen"}</dd>
              </div>
            </dl>
          </div>

          <div className="site-map-types">
            <h2>Typy produktů</h2>
            <div>
              {productTypes.map((type) => (
                <Link to="/products" key={type}>{type}</Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default SiteMap;
