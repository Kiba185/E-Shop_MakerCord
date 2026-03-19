import "./ProductsCarousel.css";
import { useEffect, useState } from "react";
import data from "../data";
import ProductCard from "./ProductCard";

const ProductsCarousel = () => {
    const [index, setIndex] = useState(0);

    // useEffect(() => {
    //     if (index > data.length - 1){
    //         setIndex(0)
    //     }
    // }, [index])

    // useEffect(() => {
    //     setInterval(() => {
    //         setIndex(index + 1)
    //     }, 3000);
    // }, [index])

    return (
        <div className="products-carousel">
            <div className="carousel-content" >
                {data.map((product, productIndex) => {
                    let mainClass = "c5"

                    if (productIndex === index){
                        mainClass = "c0"
                    }
                    
                    if (productIndex === index + 1 || index > data.length - 1 && productIndex === (index + 1) % data.length){
                        mainClass = "c1"
                    }

                    if (productIndex === index + 2 || index + 1 > data.length - 1 && productIndex === (index + 2) % data.length){
                        mainClass = "c2"
                    }

                    if (productIndex === index + 3 || index + 2 > data.length - 1 && productIndex === (index + 3) % data.length){
                        mainClass = "c3"
                    }

                    if (productIndex === index + 4 || index + 3 > data.length - 1 && productIndex === (index + 4) % data.length){
                        mainClass = "c4"
                    }
                    
                    if (productIndex === index + 5 || index + 4 > data.length - 1 && productIndex === (index + 5) % data.length){
                        mainClass = "c5"
                    }
                    
                    return <div className={`carousel-item ${mainClass}`} key={product.id}>
                        <ProductCard product={product} />
                        <p>{product.id}</p>
                    </div>
                })}
                
            </div>
            <button className="prev-button" onClick={() => setIndex(index - 1)}>Prev</button>
            <button className="next-button" onClick={() => setIndex(index + 1)}>Next</button>
        </div>
    );
};

export default ProductsCarousel;