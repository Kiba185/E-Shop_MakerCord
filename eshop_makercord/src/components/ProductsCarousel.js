import "./ProductsCarousel.css";
import { useEffect, useState } from "react";
import data from "../data";
import ProductCard from "./ProductCard";

const ProductsCarousel = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < 0){
            setIndex(data.length - 1)
        }
        else if (index > data.length - 1){
            setIndex(0)
        }
    }, [index])

    useEffect(() => {
        setInterval(() => {
            setIndex(index + 1)
        }, 3000);
    }, [index])

    return (
        <div className="products-carousel">
            <div className="carousel-content" >
                {data.map((product, productIndex) => {
                    let mainClass = "c5"

                    if (productIndex === index){
                        mainClass = "c0"
                    }
                    
                    if (productIndex === index + 1){
                        mainClass = "c1"
                    }

                    if (productIndex === index + 2){
                        mainClass = "c2"
                    }

                    if (productIndex === index + 3){
                        mainClass = "c3"
                    }

                    if (productIndex === index + 4){
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