import "./ProductsOverview.css";
import data from "../data";
import AddToCartButton from "./AddToCartButton";

const ProductsOverview = () => {
    const filteredProducts = data.filter(product => [1, 2, 3, 4].includes(product.id));

    return (
        <div className="products-overview">
            {filteredProducts.map((product) => {
                const { id, image, name, description, price } = product;
                return (
                    <div className="product-item" key={id}>
                        <img src={image} alt={name} />
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <p className="price">{price}<span className="currency">KČ</span></p>
                        <AddToCartButton />
                    </div>
                );
            })}
        </div>
    )
}

export default ProductsOverview;