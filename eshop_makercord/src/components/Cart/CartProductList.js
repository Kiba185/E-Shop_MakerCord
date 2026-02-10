import "./CartProductList.css";
import { useCart } from "../../context/CartContext";

const CartProductList = ({ products }) => {
    const { updateQuantity, removeFromCart } = useCart();

    if (!products || products.length === 0) {
        return (
            <section className="cart-product-list">
                <p className="cart-product-list-empty">Váš košík je prázdný.</p>
            </section>
        );
    }

    return (
        <section className="cart-product-list">
            {products.map((product) => (
                <div key={product.id} className="cart-product-item">
                    <img src={product.image} alt={product.name} className="cart-product-image" />
                    <div className="cart-product-main">
                        <h4 className="cart-product-name">{product.name}</h4>
                        <div className="cart-product-controls">
                            <button className="qty-btn" onClick={() => updateQuantity(product.id, Math.max(1, product.quantity - 1))}>-</button>
                            <span className="cart-product-quantity">{product.quantity} <span className="unit">ks</span></span>
                            <button className="qty-btn" onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
                        </div>
                    </div>
                    <div className="cart-product-right">
                        <div className="cart-product-price">{product.price.toFixed(0)} <span className="currency">Kč</span></div>
                        <button title="Odebrat" className="remove-button" onClick={() => removeFromCart(product.id)}>🗑️</button>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default CartProductList;