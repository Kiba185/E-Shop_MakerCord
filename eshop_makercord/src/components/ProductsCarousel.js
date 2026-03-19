import "./ProductsCarousel.css";
import { useEffect, useState } from "react";
import data from "../data";
import ProductCard from "./ProductCard";

const ProductsCarousel = () => {
    const [index, setIndex] = useState(9);

    useEffect(() => {
        if (index > data.length - 1 + 9){
            setIndex(9)
        }
    }, [index])

    // useEffect(() => {
    //     let setIntervalID = setInterval(() => {
    //         setIndex(index + 1)
    //     }, 1000)
    //     return () => clearInterval(setIntervalID)
    // }, [index])

    return (
        <div className="products-carousel">
            <div className="carousel-content" >
                {data.map((product, productIndex) => {
                    let mainClass = "c5"

                    if ((index - 1 > data.length - 1 && productIndex === (index) % data.length)){
                        mainClass = "c0"
                    }
                    
                    if ((index > data.length - 1 && productIndex === (index + 1) % data.length)){
                        mainClass = "c1"
                    }

                    if ((index + 1 > data.length - 1 && productIndex === (index + 2) % data.length)){
                        mainClass = "c2"
                    }

                    if ((index + 2 > data.length - 1 && productIndex === (index + 3) % data.length)){
                        mainClass = "c3"
                    }

                    if ((index + 3 > data.length - 1 && productIndex === (index + 4) % data.length)){
                        mainClass = "c4"
                    }
                    
                    if ((index + 4 > data.length - 1 && productIndex === (index + 5) % data.length)){
                        mainClass = "c5"
                    }
                    
                    return <div className={`carousel-item ${mainClass}`} key={product.id}>
                        <ProductCard product={product} />
                    </div>
                })}
            </div>
        </div>
    );
};

export default ProductsCarousel;