import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiBox, FiShield, FiStar, FiTruck } from "react-icons/fi";
import "./Product.css";
import AddToCartButton from "../components/Cart/AddToCartButton";
import { useProducts } from "../context/ProductContext";

const Product = () => {
    const { id } = useParams();
    const { products: data } = useProducts();
    const product = data.find(p => p.id === Number(id));
    const parameters = product?.parameters || [];
    const rating = Math.max(0, Math.min(5, Math.round(product?.rating || 0)));
    const detailParameters = product ? [
        { label: "Typ", value: product.type, featured: true },
        { label: "Barva", value: product.color, featured: true },
        ...parameters,
    ].filter((parameter) => parameter.value) : [];

    if (!product) {
        return (
            <main className="product-page">
                <section className="product-details product-details-empty">
                    <FiBox />
                    <h1>Produkt nebyl nalezen</h1>
                    <p>Zkuste se vrátit do nabídky a vybrat jiný produkt.</p>
                    <Link to="/products">Zpět na produkty</Link>
                </section>
            </main>
        );
    }

    return <main className="product-page">
        <Link to="/products" className="product-back-link">
            <FiArrowLeft />
            Zpět na produkty
        </Link>

        <section className="product-details">
            <div className="product-gallery">
                <div className="product-image">
                    <img src={product.image} alt={product.name} />
                </div>
            </div>

            <div className="product-content">
                <div className="product-header">
                    <p className="category-tag">Produkt #{product.id}</p>
                    <h1>{product.name}</h1>
                    <div className="product-rating" aria-label={`Hodnocení ${product.rating} z 5`}>
                        {Array.from({ length: 5 }, (_, index) => (
                            <FiStar key={index} className={index < rating ? "filled" : ""} />
                        ))}
                        <span>{product.rating}/5</span>
                    </div>
                </div>

                <div className="product-purchase-card">
                    <div className="product-price">
                        <p className="price">{product.price}<span className="currency">Kč</span></p>
                        <span>Včetně DPH</span>
                    </div>
                    <AddToCartButton product={product} />
                </div>

                <div className="product-service-list">
                    <div>
                        <FiTruck />
                        <span>Rychlé odeslání po objednání</span>
                    </div>
                    <div>
                        <FiShield />
                        <span>Ručně vyráběný paracord doplněk</span>
                    </div>
                </div>

                <div className="product-description">
                    <h3>Popis produktu</h3>
                    <p>{product.description}</p>
                </div>

                {detailParameters.length > 0 && (
                    <div className="product-parameters">
                        <h3>Parametry</h3>
                        <dl className="product-parameters-list">
                            {detailParameters.map((parameter, index) => (
                                <div
                                    className={`product-parameter`}
                                    key={`${parameter.label}-${index}`}
                                >
                                    <dt>{parameter.label}</dt>
                                    <dd>{parameter.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                )}
            </div>
        </section>
    </main>
};

export default Product;
