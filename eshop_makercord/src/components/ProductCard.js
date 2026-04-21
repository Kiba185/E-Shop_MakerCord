import AddToCartButton from "../components/Cart/AddToCartButton";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { image, name, description, price } = product;
  return (
      <div className="product-card">
        <Link to={`/product/${product.id}`}>
          <img src={image} alt={name} />
          <h3>{name}</h3>
          <p>{description}</p>
          <p className="price">{price}<span className="currency">Kč</span></p>
        </Link>
        <AddToCartButton product={product} />
      </div>
    
  );
};

export default ProductCard;