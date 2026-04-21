import { useParams } from 'react-router-dom';
import data from "../data";
import "./Product.css";
import AddToCartButton from "../components/Cart/AddToCartButton";

const Product = () => {
    const { id } = useParams();
    const product = data.find(p => p.id === Number(id));

    return <main className="product-page">
        <section className="product-details">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-content">
                <div className="product-header">
                    <h1>{product.name}</h1>
                    <p className="category-tag">ID produktu: {product.id}</p>
                </div>
                <div className="product-price">
                    <p className="price">{product.price}<span className="currency">Kč</span></p>
                </div>
                <div className="product-description">
                    <h3>Popis produktu</h3>
                    <p>{product.description}</p>
                </div>
                <AddToCartButton product={product} />
            </div>
        </section>
    </main>
};

export default Product;