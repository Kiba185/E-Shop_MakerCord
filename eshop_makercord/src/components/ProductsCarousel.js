import "./ProductsCarousel.css";
import data from "../data";
import AddToCartButton from "./AddToCartButton";

const ProductsCarousel = () => {
    const filteredProducts = data.filter(product => [1, 2, 3, 4].includes(product.id));

    return (
        <div className="products-carousel">
            {filteredProducts.map((product) => {
                const { id, image, name, description, price } = product;
                return (
                    <div className="product-item" key={id}>
                        <img src={image} alt={name} />
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <p className="price">{price}<span className="currency">Kč</span></p>
                        <AddToCartButton product={product} />
                    </div>
                );
            })}
            <div className="view-all">
                <a href="/products">Zobrazit všechny produkty</a>
            </div>
        </div>
    )
}

export default ProductsCarousel;