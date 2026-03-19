import "../components/ProductsOverview.css";
import data from "../data";
import React, {useState, useEffect} from "react";
import ProductCard from "./ProductCard";

const ProductsOverview = () => {
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
                {data.map((product) => {
                return (
                    <div className="product-item" key={product.id}>
                        <ProductCard product={product}/>
                    </div>
                );
                })}
            </div>    
        </div>
    )
}

export default ProductsOverview;