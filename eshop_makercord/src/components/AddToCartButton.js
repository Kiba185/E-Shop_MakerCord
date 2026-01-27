import "./AddToCartButton.css";

const AddToCartButton = ({ onAddToCart }) => {
    return (
        <button className="add-to-cart-button" onClick={onAddToCart}>
            ADD TO CART
        </button>
    );
};

export default AddToCartButton;