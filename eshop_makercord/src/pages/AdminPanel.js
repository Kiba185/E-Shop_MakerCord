import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiPlus, FiSearch, FiTrash2, FiX } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import PageHeading from "../components/PageHeading/PageHeading";
import { useUser } from "../context/UserContext";
import { useProducts } from "../context/ProductContext";
import "./AdminPanel.css";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  rating: 0,
  colors: [],
  type: "",
  image: "",
  detailImage: "",
  parameters: [],
};

const emptyUser = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  isAdmin: false,
};

const AdminPanel = () => {
  const { currentUser, users, saveUser, deleteUser } = useUser();
  const { products, saveProduct, deleteProduct } = useProducts();
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [productQuery, setProductQuery] = useState("");
  const [userQuery, setUserQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const query = productQuery.trim().toLowerCase();
    if (!query) return products;

    return products.filter((product) =>
      [product.name, product.description, ...product.colors, product.type]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    );
  }, [productQuery, products]);

  const filteredUsers = useMemo(() => {
    const query = userQuery.trim().toLowerCase();
    if (!query) return users;

    return users.filter((user) =>
      [user.firstName, user.lastName, user.email, user.phone]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [userQuery, users]);

  if (!currentUser) {
    return (
      <main className="admin-page">
        <PageHeading>Administrace</PageHeading>
        <section className="admin-access">
          <MdOutlineAdminPanelSettings />
          <h1>Přístup odepřen</h1>
          <p>Pro správu obchodu se nejdříve přihlaste administrátorským účtem.</p>
          <Link to="/user-profile" className="admin-primary-link">Přejít na přihlášení</Link>
        </section>
      </main>
    );
  }

  if (!currentUser.isAdmin) {
    return (
      <main className="admin-page">
        <PageHeading>Administrace</PageHeading>
        <section className="admin-access">
          <MdOutlineAdminPanelSettings />
          <h1>Přístup odepřen</h1>
          <p>Aktuální účet nemá oprávnění ke správě produktů a uživatelů.</p>
        </section>
      </main>
    );
  }

  const openProductEditor = (product = emptyProduct) => {
    setActiveTab("products");
    setEditingProduct({
      ...emptyProduct,
      ...product,
      price: product.price ?? "",
      parameters: Array.isArray(product.parameters) ? product.parameters : [],
    });
    setEditingUser(null);
    setMessage(null);
  };

  const openUserEditor = (user = emptyUser) => {
    setActiveTab("users");
    setEditingUser({ ...emptyUser, ...user });
    setEditingProduct(null);
    setMessage(null);
  };

  const closeEditors = () => {
    setEditingProduct(null);
    setEditingUser(null);
  };

  const updateProductField = (field, value) => {
    setEditingProduct((prev) => ({ ...prev, [field]: value }));
  };

  const updateUserField = (field, value) => {
    setEditingUser((prev) => ({ ...prev, [field]: value }));
  };

  const updateParameter = (index, field, value) => {
    setEditingProduct((prev) => ({
      ...prev,
      parameters: prev.parameters.map((parameter, parameterIndex) =>
        parameterIndex === index ? { ...parameter, [field]: value } : parameter
      ),
    }));
  };

  const addParameter = () => {
    setEditingProduct((prev) => ({
      ...prev,
      parameters: [...prev.parameters, { label: "", value: "" }],
    }));
  };

  const removeParameter = (index) => {
    setEditingProduct((prev) => ({
      ...prev,
      parameters: prev.parameters.filter((_, parameterIndex) => parameterIndex !== index),
    }));
  };

  const handleSaveProduct = (event) => {
    event.preventDefault();
    const payload = {
      ...editingProduct,
      price: Number(editingProduct.price),
      rating: Number(editingProduct.rating),
      parameters: editingProduct.parameters.filter(
        (parameter) => parameter.label.trim() && parameter.value.trim()
      ),
    };
    const result = saveProduct(payload);

    if (!result.ok) {
      setMessage({ type: "error", text: result.message });
      return;
    }

    setEditingProduct(null);
    setMessage({ type: "success", text: "Produkt byl uložen a je ihned vidět v nabídce." });
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
    if (editingProduct?.id === id) setEditingProduct(null);
    setMessage({ type: "success", text: "Produkt byl smazán." });
  };

  const handleSaveUser = (event) => {
    event.preventDefault();
    const result = saveUser(editingUser);

    if (!result.ok) {
      setMessage({ type: "error", text: result.message });
      return;
    }

    setEditingUser(null);
    setMessage({ type: "success", text: "Uživatel byl uložen." });
  };

  const handleDeleteUser = (id) => {
    const result = deleteUser(id);

    if (!result.ok) {
      setMessage({ type: "error", text: result.message });
      return;
    }

    if (editingUser?.id === id) setEditingUser(null);
    setMessage({ type: "success", text: "Uživatel byl smazán." });
  };

  return (
    <main className="admin-page">
      <PageHeading>Administrace</PageHeading>

      <section className="admin-hero">
        <div>
          <p className="admin-kicker">MakerCord backoffice</p>
          <h1>Správa obchodu</h1>
          <p>
            Produkty i uživatele upravíte na jednom místě. Změny se promítnou do katalogu,
            detailu produktu a zákaznických účtů.
          </p>
        </div>
        <div className="admin-stats" aria-label="Přehled administrace">
          <div>
            <strong>{products.length}</strong>
            <span>produktů</span>
          </div>
          <div>
            <strong>{users.length}</strong>
            <span>uživatelů</span>
          </div>
          <div>
            <strong>{users.filter((user) => user.isAdmin).length}</strong>
            <span>adminů</span>
          </div>
        </div>
      </section>

      {message && <div className={`admin-message ${message.type}`}>{message.text}</div>}

      <section className="admin-workspace">
        <div className="admin-toolbar">
          <div className="admin-tabs" aria-label="Sekce administrace">
            <button
              type="button"
              className={activeTab === "products" ? "active" : ""}
              onClick={() => setActiveTab("products")}
            >
              Produkty
            </button>
            <button
              type="button"
              className={activeTab === "users" ? "active" : ""}
              onClick={() => setActiveTab("users")}
            >
              Uživatelé
            </button>
          </div>

          {activeTab === "products" ? (
            <button type="button" className="admin-add-button" onClick={() => openProductEditor()}>
              <FiPlus />
              Přidat produkt
            </button>
          ) : (
            <button type="button" className="admin-add-button" onClick={() => openUserEditor()}>
              <FiPlus />
              Přidat uživatele
            </button>
          )}
        </div>

        <div className="admin-content">
          <div className="admin-list-panel">
            {activeTab === "products" ? (
              <>
                <div className="admin-search">
                  <FiSearch />
                  <input
                    type="search"
                    placeholder="Hledat produkt, barvu nebo typ"
                    value={productQuery}
                    onChange={(event) => setProductQuery(event.target.value)}
                  />
                </div>

                <div className="admin-list">
                  {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                    <article className="admin-row product-row" key={product.id}>
                      {product.image ? (
                        <img src={product.image} alt={product.name} />
                      ) : (
                        <div className="admin-image-placeholder" />
                      )}
                      <div className="admin-row-main">
                        <h2>{product.name}</h2>
                        <p>{product.type} · {(product.colors || []).join(", ")} · {product.price} Kč</p>
                      </div>
                      <div className="admin-row-actions">
                        <button type="button" onClick={() => openProductEditor(product)} aria-label="Upravit produkt">
                          <FiEdit2 />
                        </button>
                        <button type="button" className="danger" onClick={() => handleDeleteProduct(product.id)} aria-label="Smazat produkt">
                          <FiTrash2 />
                        </button>
                      </div>
                    </article>
                  )) : (
                    <p className="admin-empty">Žádný produkt neodpovídá hledání.</p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="admin-search">
                  <FiSearch />
                  <input
                    type="search"
                    placeholder="Hledat uživatele nebo e-mail"
                    value={userQuery}
                    onChange={(event) => setUserQuery(event.target.value)}
                  />
                </div>

                <div className="admin-list">
                  {filteredUsers.map((user) => (
                    <article className="admin-row user-row" key={user.id}>
                      <div className="admin-avatar">
                        {(user.firstName?.[0] || "?").toUpperCase()}
                      </div>
                      <div className="admin-row-main">
                        <h2>{user.firstName} {user.lastName}</h2>
                        <p>{user.email} · {user.isAdmin ? "Administrátor" : "Zákazník"}</p>
                      </div>
                      <div className="admin-row-actions">
                        <button type="button" onClick={() => openUserEditor(user)} aria-label="Upravit uživatele">
                          <FiEdit2 />
                        </button>
                        <button type="button" className="danger" onClick={() => handleDeleteUser(user.id)} aria-label="Smazat uživatele">
                          <FiTrash2 />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className={`admin-editor ${editingProduct || editingUser ? "active" : ""}`}>
            {!editingProduct && !editingUser && (
              <div className="admin-editor-empty">
                <MdOutlineAdminPanelSettings />
                <h2>Vyberte položku k úpravě</h2>
                <p>Editor se otevře po kliknutí na upravit nebo přidat.</p>
              </div>
            )}

            {editingProduct && (
              <form className="admin-form" onSubmit={handleSaveProduct}>
                <div className="admin-form-header">
                  <div>
                    <p className="admin-kicker">Produkt</p>
                    <h2>{editingProduct.id ? "Upravit produkt" : "Nový produkt"}</h2>
                  </div>
                  <button type="button" className="admin-icon-button" onClick={closeEditors} aria-label="Zavřít editor">
                    <FiX />
                  </button>
                </div>

                <label>
                  Název
                  <input value={editingProduct.name} onChange={(event) => updateProductField("name", event.target.value)} />
                </label>
                <label className="full-width">
                  Popis
                  <textarea value={editingProduct.description} onChange={(event) => updateProductField("description", event.target.value)} />
                </label>
                <div className="admin-form-grid">
                  <label>
                    Cena v Kč
                    <input type="number" min="1" value={editingProduct.price} onChange={(event) => updateProductField("price", event.target.value)} />
                  </label>
                  <label>
                    Hodnocení
                    <input type="number" min="0" max="5" step="0.1" value={editingProduct.rating} onChange={(event) => updateProductField("rating", event.target.value)} />
                  </label>
                  <label>
                    Barvy (oddělené čárkou)
                    <input 
                      value={(editingProduct.colors || []).join(", ")} 
                      onChange={(event) => updateProductField("colors", event.target.value.split(",").map(c => c.trim()).filter(Boolean))} 
                      placeholder="např. modrá, bílá, zelená"
                    />
                  </label>
                  <label>
                    Typ
                    <input value={editingProduct.type} onChange={(event) => updateProductField("type", event.target.value)} />
                  </label>
                </div>
                <label>
                  URL obrázku na kartě
                  <input value={editingProduct.image} onChange={(event) => updateProductField("image", event.target.value)} />
                </label>
                <label>
                  URL obrázku v detailu
                  <input value={editingProduct.detailImage} onChange={(event) => updateProductField("detailImage", event.target.value)} />
                </label>

                <div className="admin-parameters">
                  <div className="admin-parameters-header">
                    <h3>Parametry</h3>
                    <button type="button" onClick={addParameter}>
                      <FiPlus />
                      Přidat parametr
                    </button>
                  </div>
                  {editingProduct.parameters.length > 0 ? editingProduct.parameters.map((parameter, index) => (
                    <div className="admin-parameter-row" key={`${parameter.label}-${index}`}>
                      <input placeholder="Název" value={parameter.label} onChange={(event) => updateParameter(index, "label", event.target.value)} />
                      <input placeholder="Hodnota" value={parameter.value} onChange={(event) => updateParameter(index, "value", event.target.value)} />
                      <button type="button" onClick={() => removeParameter(index)} aria-label="Odebrat parametr">
                        <FiTrash2 />
                      </button>
                    </div>
                  )) : (
                    <p>Parametry nejsou vyplněné.</p>
                  )}
                </div>

                <div className="admin-form-actions">
                  <button type="submit" className="admin-submit">Uložit produkt</button>
                  <button type="button" className="admin-secondary" onClick={closeEditors}>Zrušit</button>
                </div>
              </form>
            )}

            {editingUser && (
              <form className="admin-form" onSubmit={handleSaveUser}>
                <div className="admin-form-header">
                  <div>
                    <p className="admin-kicker">Uživatel</p>
                    <h2>{editingUser.id ? "Upravit uživatele" : "Nový uživatel"}</h2>
                  </div>
                  <button type="button" className="admin-icon-button" onClick={closeEditors} aria-label="Zavřít editor">
                    <FiX />
                  </button>
                </div>

                <div className="admin-form-grid">
                  <label>
                    Jméno
                    <input value={editingUser.firstName} onChange={(event) => updateUserField("firstName", event.target.value)} />
                  </label>
                  <label>
                    Příjmení
                    <input value={editingUser.lastName} onChange={(event) => updateUserField("lastName", event.target.value)} />
                  </label>
                </div>
                <label>
                  E-mail
                  <input type="email" value={editingUser.email} onChange={(event) => updateUserField("email", event.target.value)} />
                </label>
                <div className="admin-form-grid">
                  <label>
                    Telefon
                    <input type="tel" value={editingUser.phone} onChange={(event) => updateUserField("phone", event.target.value)} />
                  </label>
                  <label>
                    Heslo
                    <input type="text" value={editingUser.password} onChange={(event) => updateUserField("password", event.target.value)} />
                  </label>
                </div>
                <label className="admin-check">
                  <input
                    type="checkbox"
                    checked={editingUser.isAdmin}
                    onChange={(event) => updateUserField("isAdmin", event.target.checked)}
                  />
                  Administrátorský účet
                </label>

                <div className="admin-form-actions">
                  <button type="submit" className="admin-submit">Uložit uživatele</button>
                  <button type="button" className="admin-secondary" onClick={closeEditors}>Zrušit</button>
                </div>
              </form>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
};

export default AdminPanel;
