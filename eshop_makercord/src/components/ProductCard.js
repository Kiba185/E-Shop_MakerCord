import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }) => {
  const { image, name, description, price } = product;
  return (
    <div className="product-item">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>{description}</p>
        <p className="price">{price}<span className="currency">Kč</span></p>
        <AddToCartButton product={product} />
    </div>
  );
};

export default ProductCard;