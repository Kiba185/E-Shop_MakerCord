import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Product from './pages/Product';
import Cart from './pages/Cart';
import UserProfile from './pages/UserProfile';
import SiteMap from './pages/SiteMap'
import Error from './pages/Error';
import SharedLayout from './pages/SharedLayout';
import AdminPanel from './pages/AdminPanel';

const App = () => {
    return <Routes>
        <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/site-map" element={<SiteMap />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<Error />} />
        </Route>
    </Routes>;
};

export default App;