import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Cart from './pages/Cart';
import UserProfile from './pages/UserProfile';
import Error from './pages/Error';
import SharedLayout from './pages/SharedLayout';

const App = () => {
    return <Routes>
        <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="*" element={<Error />} />
        </Route>
    </Routes>;
};

export default App;