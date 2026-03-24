import "./AddToCartButton.css";
import { useCart } from "../../context/CartContext";

const AddToCartButton = ({ onAddToCart, product }) => {
    const { addToCart, showCartPopup } = useCart();

    const handleClick = () => {
        if (onAddToCart) onAddToCart();
        else if (product) addToCart(product);

        showCartPopup();
    };

    return (
        <button className="add-to-cart-button" onClick={handleClick}>
            Přidat do košíku
        </button>
    );
};

export default AddToCartButton;
