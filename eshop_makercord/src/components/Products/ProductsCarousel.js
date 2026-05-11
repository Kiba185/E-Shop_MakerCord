import "./ProductsCarousel.css";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "../../context/ProductContext";

const ProductsCarousel = () => {
    const { products } = useProducts();
    
    // 1. Nový state pro uložení zamíchaných produktů
    const [shuffledProducts, setShuffledProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // 2. Zamíchání produktů (spustí se po načtení dat z kontextu)
    useEffect(() => {
        // Kontrola: Zamícháme pouze pokud máme data z kontextu a ještě jsme nemíchali
        if (products && products.length > 0 && shuffledProducts.length === 0) {
            
            // Vytvoříme mělkou kopii pole, abychom nemutovali originální data z kontextu
            const shuffled = [...products];
            
            // Fisher-Yates algoritmus pro spolehlivé náhodné proházení
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            
            setShuffledProducts(shuffled);
        }
    }, [products, shuffledProducts.length]);

    // 3. Časovač rotace
    useEffect(() => {
        if (shuffledProducts.length === 0) return;

        const intervalID = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % shuffledProducts.length);
        }, 3000);

        return () => clearInterval(intervalID);
    }, [shuffledProducts.length]);

    // Ošetření, dokud nejsou data zamíchaná a připravená
    if (shuffledProducts.length === 0) {
        return null;
    }

    const N = shuffledProducts.length;

    return (
        <div className="products-carousel">
            <div className="carousel-content">
                {/* Mapujeme přes zamíchané produkty místo originálních */}
                {shuffledProducts.map((product, i) => {
                    let mainClass = "c5"; 

                    if (N >= 6) {
                        if (i === (currentIndex - 1 + N) % N) {
                            mainClass = "c0";
                        } else if (i === currentIndex) {
                            mainClass = "c1";
                        } else if (i === (currentIndex + 1) % N) {
                            mainClass = "c2";
                        } else if (i === (currentIndex + 2) % N) {
                            mainClass = "c3";
                        } else if (i === (currentIndex + 3) % N) {
                            mainClass = "c4";
                        } else if (i === (currentIndex + 4) % N) {
                            mainClass = "c5";
                        }
                    }

                    return (
                        <div className={`carousel-item ${mainClass}`} key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductsCarousel;