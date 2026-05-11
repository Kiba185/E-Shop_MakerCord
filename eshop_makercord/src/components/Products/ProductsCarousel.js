import React, { useEffect, useState } from "react";
import "./ProductsCarousel.css";
import ProductCard from "./ProductCard";
import { useProducts } from "../../context/ProductContext";

const ProductsCarousel = () => {
    const { products } = useProducts();
    const [shuffledProducts, setShuffledProducts] = useState([]);
    
    // Stav pro šířku a detekci
    const [visibleItems, setVisibleItems] = useState(4);
    // Začínáme až ZA klony, takže první index není 0, ale odpovídá počtu klonů (visibleItems)
    const [currentIndex, setCurrentIndex] = useState(4); 
    // Přepínač, kterým budeme na zlomek vteřiny vypínat plynulost, abychom udělali tajný skok
    const [isTransitioning, setIsTransitioning] = useState(true);

    // 1. Zamíchání produktů (Fisher-Yates)
    useEffect(() => {
        if (products && products.length > 0 && shuffledProducts.length === 0) {
            const shuffled = [...products];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            setShuffledProducts(shuffled);
        }
    }, [products, shuffledProducts.length]);

    // 2. Responzivita
    useEffect(() => {
        const handleResize = () => {
            let visible = 4;
            if (window.innerWidth <= 600) visible = 1;
            else if (window.innerWidth <= 1000) visible = 2;
            else if (window.innerWidth <= 1400) visible = 3;
            
            setVisibleItems(visible);
            // Při změně okna raději resetujeme index na první reálný produkt
            setCurrentIndex(visible); 
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 3. Automatická rotace
    useEffect(() => {
        if (shuffledProducts.length === 0) return;

        const interval = setInterval(() => {
            setIsTransitioning(true); // Před každým krokem zapneme animaci
            setCurrentIndex((prev) => prev + 1);
        }, 3500);

        return () => clearInterval(interval);
    }, [shuffledProducts.length]);

    // 4. TAJNÝ NEVIDITELNÝ SKOK
    useEffect(() => {
        if (shuffledProducts.length === 0) return;

        // Pokud jsme plynule dojeli na úplně první klon na pravé straně
        if (currentIndex === shuffledProducts.length + visibleItems) {
            // Počkáme 700ms, než plynulá animace CSS úplně dojede na místo
            const timeout = setTimeout(() => {
                setIsTransitioning(false); // Vypneme animaci
                setCurrentIndex(visibleItems); // A bleskově (neviditelně) skočíme zpět na první reálnou kartu
            }, 700); 

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, shuffledProducts.length, visibleItems]);

    if (shuffledProducts.length === 0) return null;

    // Vytvoření celého pásu: [KLONY NA ZAČÁTKU] + [REÁLNÉ PRODUKTY] + [KLONY NA KONCI]
    const clonesStart = shuffledProducts.slice(-visibleItems);
    const clonesEnd = shuffledProducts.slice(0, visibleItems);
    const trackItems = [...clonesStart, ...shuffledProducts, ...clonesEnd];

    return (
        <div 
            className="products-carousel-container" 
            style={{ "--current-index": currentIndex }}
        >
            <div 
                className="carousel-track"
                style={{ 
                    // Tady React dynamicky řídí, jestli se pás posune plynule, nebo okamžitě (při tajném skoku)
                    transition: isTransitioning ? "transform 0.7s cubic-bezier(0.45, 0, 0.55, 1)" : "none" 
                }}
            >
                {trackItems.map((product, index) => {
                    // Kontrola viditelnosti pro správné vypínání stínů na krajích
                    const isVisible = index >= currentIndex && index < currentIndex + visibleItems;

                    return (
                        // Klíč musí obsahovat i index, protože díky klonům se ID produktů opakují!
                        <div 
                            className={`carousel-item ${!isVisible ? "hidden-shadow" : ""}`} 
                            key={`${product.id}-${index}`}
                        >
                            <div className="carousel-item-inner">
                                <ProductCard product={product} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductsCarousel;