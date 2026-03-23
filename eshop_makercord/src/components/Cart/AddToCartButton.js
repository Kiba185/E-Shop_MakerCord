import "./AddToCartButton.css";
import { useCart } from "../../context/CartContext";

const AddToCartButton = ({ onAddToCart, product, setPopupToggle, popupToggle }) => {
    const { addToCart } = useCart();

    const handleClick = () => {
        setPopupToggle(popupToggle = true)
        if (onAddToCart) onAddToCart();
        else if (product) addToCart(product);
    };

    return (
        <button className="add-to-cart-button" onClick={handleClick}>
            Přidat do košíku
        </button>
    );
};

export default AddToCartButton;