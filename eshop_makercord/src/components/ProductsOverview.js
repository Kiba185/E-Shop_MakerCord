import "../components/ProductsOverview.css";
import data from "../data";
import React, {useState, useEffect} from "react";
import ProductCard from "./ProductCard";
import Slider from '@mui/material/Slider';

const ProductsOverview = () => {
    let [sortOrder, setSortOrder] = useState("recommended");
    return (
        <div className="products-overview">
            <div className="filter-section">
                <h3>Filtr</h3>
                <div className="filters">
                    <div className="price-filter">
                        <h4>Cena:</h4>
                        <Slider defaultValue={[10, 50]}
                                min={"0"}
                                max={"100"}
                                disableSwap />
                        <div className="min-label">
                            <p>10,-</p>
                        </div>
                        <div className="max-label">
                            <p>4500,-</p>
                        </div>
                    </div>
                    <div className="type-filter">

                    </div>
                    <div className="color-filter">
                        <h4>Barva:</h4>
                        <input type="checkbox" id="red"></input>
                        <label for="red">Červená</label>
                        <input type="checkbox" id="green"></input>
                        <label for="green">Zelená</label>
                        <input type="checkbox" id="blue"></input>
                        <label for="blue">Modrá</label>
                        <input type="checkbox" id="white"></input>
                        <label for="white">Bílá</label>
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