import "./ProductsCarousel.css";
import { useEffect, useState } from "react";
import data from "../../data";
import ProductCard from "./ProductCard";

const ProductsCarousel = () => {
    const [index, setIndex] = useState(9);
    const carouselData = data.slice(0, 8);

    useEffect(() => {
        if (index > carouselData.length - 1 + 9){
            setIndex(9)
        }
    }, [index, carouselData.length])

    useEffect(() => {
        let setIntervalID = setInterval(() => {
            setIndex(index + 1)
        }, 3000)
        return () => clearInterval(setIntervalID)
    }, [index])

    return (
        <div className="products-carousel">
            <div className="carousel-content" >
                {carouselData.map((product, productIndex) => {
                    let mainClass = "c5"

                    if ((index - 1 > carouselData.length - 1 && productIndex === (index) % carouselData.length)){
                        mainClass = "c0"
                    }  
                    
                    if ((index > carouselData.length - 1 && productIndex === (index + 1) % carouselData.length)){
                        mainClass = "c1"
                    }

                    if ((index + 1 > carouselData.length - 1 && productIndex === (index + 2) % carouselData.length)){
                        mainClass = "c2"
                    }

                    if ((index + 2 > carouselData.length - 1 && productIndex === (index + 3) % carouselData.length)){
                        mainClass = "c3"
                    }

                    if ((index + 3 > carouselData.length - 1 && productIndex === (index + 4) % carouselData.length)){
                        mainClass = "c4"
                    }
                    
                    if ((index + 4 > carouselData.length - 1 && productIndex === (index + 5) % carouselData.length)){
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