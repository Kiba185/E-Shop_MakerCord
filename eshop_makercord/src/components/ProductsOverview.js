import "./ProductsOverview.css";
import data from "../data";

const ProductsOverview = () => {
    return (
        <div className="products-overview">
            {data.map((product) => {
                const { image, name, description, price } = product;
                return (
                    <div className="product-item" key={product.id}>
                        <img src={image} alt={name} />
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <p>Price: ${price}</p>
                    </div>
                );
            })}
        </div>
    )
}

export default ProductsOverview;