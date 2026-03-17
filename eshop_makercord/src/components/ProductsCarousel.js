import "./ProductsCarousel.css";
import { useEffect, useState } from "react";
import data from "../data";
import ProductCard from "./ProductCard";

const ProductsCarousel = () => {
    const [index, setIndex] = useState(0);

    // Tvůj původní interval zůstává beze změny
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="products-carousel">
            {/* Přidán vnitřní pás, který se posouvá pomocí CSS a tvého indexu */}
            <div 
                className="carousel-track" 
                style={{ transform: `translateX(-${index * 25}%)` }} 
            >
                {data.map((product) => (
                    // Přidán obal pro správnou šířku karty
                    <div className="carousel-item" key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsCarousel;