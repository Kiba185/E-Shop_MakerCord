import { useParams } from 'react-router-dom';
import data from "../data";
import "./Product.css";
import AddToCartButton from "../components/Cart/AddToCartButton";

const Product = () => {
    const { id } = useParams();
    const product = data.find(p => p.id === Number(id));
    const parameters = product?.parameters || [];

    if (!product) {
        return (
            <main className="product-page">
                <section className="product-details product-details-empty">
                    <h1>Produkt nebyl nalezen</h1>
                    <p>Zkuste se vrátit do nabídky a vybrat jiný produkt.</p>
                </section>
            </main>
        );
    }

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
                {parameters.length > 0 && (
                    <div className="product-parameters">
                        <h3>Parametry</h3>
                        <dl className="product-parameters-list">
                            {parameters.map((parameter) => (
                                <div className="product-parameter" key={parameter.label}>
                                    <dt>{parameter.label}</dt>
                                    <dd>{parameter.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                )}
                <AddToCartButton product={product} />
            </div>
        </section>
    </main>
};

export default Product;
