import "./CartProductList.css";
import { useCart } from "../../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";

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
                    <div className="cart-product-left">
                        <img src={product.image} alt={product.name} className="cart-product-image" />
                        <h4 className="cart-product-name">{product.name}</h4>
                    </div>
                    <div className="cart-product-right">
                        <div className="cart-product-controls">
                            <button className="qty-btn" onClick={() => updateQuantity(product.id, Math.max(0, product.quantity - 1))}>-</button>
                            <span className="cart-product-quantity">{product.quantity} <span className="unit">ks</span></span>
                            <button className="qty-btn" onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
                        </div>
                        <div className="cart-product-price">{product.price} <span className="currency">Kč</span></div>
                        <button title="Odebrat" className="remove-button" onClick={() => removeFromCart(product.id)}><FaRegTrashAlt /></button>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default CartProductList;