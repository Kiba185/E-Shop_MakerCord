import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useProducts } from '../context/ProductContext';
import './AdminPanel.css';

const AdminPanel = () => {
  const { currentUser, users, saveUser, deleteUser } = useUser();
  const { products, saveProduct, deleteProduct } = useProducts();
  const [activeTab, setActiveTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState(null);

  if (!currentUser) {
    return <div className="admin-panel">
      <h1>Přístup odepřen</h1>
      <p>Nejste přihlášeni. <a href="/user-profile">Přihlaste se zde.</a></p>
    </div>;
  }

  if (!currentUser.isAdmin) {
    return <div className="admin-panel">
      <h1>Přístup odepřen</h1>
      <p>Nemáte administrátorská práva.</p>
    </div>;
  }

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
    setMessage(null);
  };

  const handleSaveProduct = () => {
    const result = saveProduct(editingProduct);

    if (!result.ok) {
      setMessage({ type: 'error', text: result.message });
      return;
    }

    setEditingProduct(null);
    setMessage({ type: 'success', text: 'Produkt byl uložen.' });
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
    setMessage({ type: 'success', text: 'Produkt byl smazán.' });
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
    setMessage(null);
  };

  const handleSaveUser = () => {
    const result = saveUser(editingUser);

    if (!result.ok) {
      setMessage({ type: 'error', text: result.message });
      return;
    }

    setEditingUser(null);
    setMessage({ type: 'success', text: 'Uživatel byl uložen.' });
  };

  const handleDeleteUser = (id) => {
    const result = deleteUser(id);

    if (!result.ok) {
      setMessage({ type: 'error', text: result.message });
      return;
    }

    setMessage({ type: 'success', text: 'Uživatel byl smazán.' });
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      {message && <div className={`admin-message ${message.type}`}>{message.text}</div>}
      
      <div className="admin-tabs">
        <button 
          className={activeTab === 'products' ? 'active' : ''} 
          onClick={() => setActiveTab('products')}
        >
          Produkty
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          Uživatelé
        </button>
      </div>

      {activeTab === 'products' && (
        <div className="admin-section">
          <h2>Správa produktů</h2>
          <button type="button" onClick={() => { setEditingProduct({ rating: 0 }); setMessage(null); }}>Přidat produkt</button>
          
          <div className="product-list">
            {products.length > 0 ? products.map(product => (
              <div key={product.id} className="product-item">
                {product.image ? <img src={product.image} alt={product.name} /> : <div className="product-image-placeholder" />}
                <div>
                  <h3>{product.name}</h3>
                  <p>Cena: {product.price} Kč</p>
                  <p>Hodnocení: {product.rating}/5</p>
                </div>
                <div className="actions">
                  <button type="button" onClick={() => handleEditProduct(product)}>Upravit</button>
                  <button type="button" onClick={() => handleDeleteProduct(product.id)}>Smazat</button>
                </div>
              </div>
            )) : <p>Žádné produkty nejsou uložené.</p>}
          </div>

          {editingProduct && (
            <div className="edit-form">
              <h3>{editingProduct.id ? 'Upravit produkt' : 'Přidat produkt'}</h3>
              <input
                type="text"
                placeholder="Název"
                value={editingProduct.name || ''}
                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
              />
              <textarea
                placeholder="Popis"
                value={editingProduct.description || ''}
                onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
              />
              <input
                type="number"
                placeholder="Cena"
                value={editingProduct.price || ''}
                onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
              />
              <input
                type="number"
                placeholder="Hodnocení"
                min="0"
                max="5"
                step="0.1"
                value={editingProduct.rating || ''}
                onChange={(e) => setEditingProduct({...editingProduct, rating: Number(e.target.value)})}
              />
              <input
                type="text"
                placeholder="Barva"
                value={editingProduct.color || ''}
                onChange={(e) => setEditingProduct({...editingProduct, color: e.target.value})}
              />
              <input
                type="text"
                placeholder="Typ"
                value={editingProduct.type || ''}
                onChange={(e) => setEditingProduct({...editingProduct, type: e.target.value})}
              />
              <input
                type="text"
                placeholder="URL obrázku"
                value={editingProduct.image || ''}
                onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
              />
              <button type="button" onClick={handleSaveProduct}>Uložit</button>
              <button type="button" onClick={() => setEditingProduct(null)}>Zrušit</button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="admin-section">
          <h2>Správa uživatelů</h2>
          <button type="button" onClick={() => { setEditingUser({ isAdmin: false }); setMessage(null); }}>Přidat uživatele</button>
          
          <div className="user-list">
            {users.map(user => (
              <div key={user.id} className="user-item">
                <div>
                  <h3>{user.firstName} {user.lastName}</h3>
                  <p>Email: {user.email}</p>
                  <p>Admin: {user.isAdmin ? 'Ano' : 'Ne'}</p>
                </div>
                <div className="actions">
                  <button type="button" onClick={() => handleEditUser(user)}>Upravit</button>
                  <button type="button" onClick={() => handleDeleteUser(user.id)}>Smazat</button>
                </div>
              </div>
            ))}
          </div>

          {editingUser && (
            <div className="edit-form">
              <h3>{editingUser.id ? 'Upravit uživatele' : 'Přidat uživatele'}</h3>
              <input
                type="text"
                placeholder="Jméno"
                value={editingUser.firstName || ''}
                onChange={(e) => setEditingUser({...editingUser, firstName: e.target.value})}
              />
              <input
                type="text"
                placeholder="Příjmení"
                value={editingUser.lastName || ''}
                onChange={(e) => setEditingUser({...editingUser, lastName: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email"
                value={editingUser.email || ''}
                onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
              />
              <input
                type="password"
                placeholder="Heslo"
                value={editingUser.password || ''}
                onChange={(e) => setEditingUser({...editingUser, password: e.target.value})}
              />
              <input
                type="tel"
                placeholder="Telefon"
                value={editingUser.phone || ''}
                onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
              />
              <label>
                <input
                  type="checkbox"
                  checked={editingUser.isAdmin || false}
                  onChange={(e) => setEditingUser({...editingUser, isAdmin: e.target.checked})}
                />
                Admin
              </label>
              <button type="button" onClick={handleSaveUser}>Uložit</button>
              <button type="button" onClick={() => setEditingUser(null)}>Zrušit</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
