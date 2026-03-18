import "./ProductsCarousel.css";
import { useEffect, useState } from "react";
import data from "../data";
import ProductCard from "./ProductCard";

const ProductsCarousel = () => {
    const [index, setIndex] = useState(8);

    return (
        <div className="products-carousel">
            <div className="carousel-content" >
                {data.map((product, productIndex) => {
                    let mainClass = "c0"

                    if (productIndex === index){
                        mainClass = "c0"
                    }
                    
                    if (productIndex === index + 1 || productIndex === (index + 1 - data.length)){
                        mainClass = "c1"
                    }

                    if (productIndex === index + 2 || productIndex === (index + 2 - data.length)){
                        mainClass = "c2"
                    }

                    if (productIndex === index + 3 || productIndex === (index + 3 - data.length)){
                        mainClass = "c3"
                    }

                    if (productIndex === index + 4 || productIndex === (index + 4 - data.length)){
                        mainClass = "c4"
                    }
                    
                    if (productIndex === index + 5){
                        mainClass = "c5"
                    }
                    
                    return <div className={`carousel-item ${mainClass}`} key={product.id}>
                        <ProductCard product={product} />
                        <p>{product.id}</p>
                    </div>
                })}
            </div>
        </div>
    );
};

export default ProductsCarousel;