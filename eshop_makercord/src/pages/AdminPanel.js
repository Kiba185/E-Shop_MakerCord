import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import products from '../data';
import { users } from '../data';
import './AdminPanel.css';

const AdminPanel = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('products');
  const [productList, setProductList] = useState(products);
  const [userList, setUserList] = useState(users);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  // Debug
  console.log('AdminPanel render - user:', user);

  // Check if user is admin
  if (!user) {
    return <div className="admin-panel">
      <h1>Přístup odepřen</h1>
      <p>Nejste přihlášeni. <a href="/user-profile">Přihlaste se zde.</a></p>
      <p>Debug: user je null/undefined</p>
    </div>;
  }

  if (!user.isAdmin) {
    return <div className="admin-panel">
      <h1>Přístup odepřen</h1>
      <p>Nemáte administrátorská práva.</p>
      <p>Debug: user není admin, email: {user.email}, isAdmin: {user.isAdmin}</p>
    </div>;
  }

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleSaveProduct = () => {
    if (editingProduct.id) {
      // Update existing product
      setProductList(productList.map(p => p.id === editingProduct.id ? editingProduct : p));
    } else {
      // Add new product
      const newId = Math.max(...productList.map(p => p.id)) + 1;
      setProductList([...productList, { ...editingProduct, id: newId }]);
    }
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    setProductList(productList.filter(p => p.id !== id));
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
  };

  const handleSaveUser = () => {
    if (editingUser.id) {
      setUserList(userList.map(u => u.id === editingUser.id ? editingUser : u));
    } else {
      const newId = Math.max(...userList.map(u => u.id)) + 1;
      setUserList([...userList, { ...editingUser, id: newId }]);
    }
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    setUserList(userList.filter(u => u.id !== id));
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      
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
          <button onClick={() => setEditingProduct({})}>Přidat produkt</button>
          
          <div className="product-list">
            {productList.map(product => (
              <div key={product.id} className="product-item">
                <img src={product.image} alt={product.name} style={{width: '50px', height: '50px'}} />
                <div>
                  <h3>{product.name}</h3>
                  <p>Cena: {product.price} Kč</p>
                  <p>Hodnocení: {product.rating}/5</p>
                </div>
                <div className="actions">
                  <button onClick={() => handleEditProduct(product)}>Upravit</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>Smazat</button>
                </div>
              </div>
            ))}
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
                onChange={(e) => setEditingProduct({...editingProduct, price: parseInt(e.target.value)})}
              />
              <input
                type="number"
                placeholder="Hodnocení"
                value={editingProduct.rating || ''}
                onChange={(e) => setEditingProduct({...editingProduct, rating: parseInt(e.target.value)})}
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
              <button onClick={handleSaveProduct}>Uložit</button>
              <button onClick={() => setEditingProduct(null)}>Zrušit</button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="admin-section">
          <h2>Správa uživatelů</h2>
          <button onClick={() => setEditingUser({})}>Přidat uživatele</button>
          
          <div className="user-list">
            {userList.map(user => (
              <div key={user.id} className="user-item">
                <div>
                  <h3>{user.firstName} {user.lastName}</h3>
                  <p>Email: {user.email}</p>
                  <p>Admin: {user.isAdmin ? 'Ano' : 'Ne'}</p>
                </div>
                <div className="actions">
                  <button onClick={() => handleEditUser(user)}>Upravit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Smazat</button>
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
              <label>
                <input
                  type="checkbox"
                  checked={editingUser.isAdmin || false}
                  onChange={(e) => setEditingUser({...editingUser, isAdmin: e.target.checked})}
                />
                Admin
              </label>
              <button onClick={handleSaveUser}>Uložit</button>
              <button onClick={() => setEditingUser(null)}>Zrušit</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;