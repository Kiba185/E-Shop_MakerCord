import "./ProductsOverview.css";
import data from "../data";

const ProductsOverview = () => {
    return (
        <div className="products-overview">
            {data.map((product) => {
                const { id, image, name, description, price } = product;
                return (
                    <div className="product-item" key={id}>
                        <img src={image} alt={name} />
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <p>Price: ${price}</p>
                        <button>Add to Cart</button>
                    </div>
                );
            })}
        </div>
    )
}

export default ProductsOverview;