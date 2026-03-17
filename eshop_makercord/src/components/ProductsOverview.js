import "../components/ProductsOverview.css";
import data from "../data";
import AddToCartButton from "./AddToCartButton";
import React, {useState} from "react";

const ProductsOverview = () => {
    const filteredProducts = data.filter(product => [1, 2, 3, 4, 5, 6].includes(product.id));
    let [sortOrder, setSortOrder] = useState("recommended");
    return (
        <div className="products-overview">
            <div className="filter-section">
                <h3>Filtr</h3>
                <div className="filters">
                    <div className="price-filter">

                    </div>
                    <div className="type-filter">

                    </div>
                    <div className="color-filter">

                    </div>
                </div>
            </div>
            <div className="sorting-section">
                <button className={sortOrder === "recommended" ? "checked" : ""} id="sort-recommended" value="recommended" onClick={() => (setSortOrder("recommended"))}>Doporučujeme</button>
                <button className={sortOrder === "cheapest" ? "checked" : ""}  id="sort-cheapest" value="cheapest" onClick={() => (setSortOrder("cheapest"))}>Nejlevnější</button>
                <button className={sortOrder === "expensive" ? "checked" : ""}  id="sort-expensive" value="expensive" onClick={() => (setSortOrder("expensive"))}>Nejdražší</button>
            </div>
            <div className="products-list">
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
            </div>    
        </div>
    )
}

export default ProductsOverview;