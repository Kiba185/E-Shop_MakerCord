import "./ProductsOverview.css";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "../../context/ProductContext";

const PRODUCTS_PER_PAGE = 12;
const colorPreviewMap = {
  "černá": "#1f1f1f",
  "červená": "#cf2f2f",
  "zelená": "#3f8f4f",
  "modrá": "#2f66cf",
  "šedá": "#777777",
  "bílá": "#f3f3f3",
  "oranžová": "#f07a22",
  "růžová": "#e85b91",
  "béžová": "#b59a6d",
  "limetková": "#a8c927",
};

const sortLabels = {
  recommended: "Dle doporučení",
  cheapest: "Nejlevnější",
  expensive: "Nejdražší",
};

const ProductsOverview = () => {
  const { products: data } = useProducts();
  const maxPrice = useMemo(
    () => (data.length > 0 ? Math.max(...data.map((product) => product.price)) : 0),
    [data]
  );
  const availableColors = useMemo(() => [...new Set(data.map((product) => product.color).filter(Boolean))], [data]);
  const availableTypes = useMemo(() => [...new Set(data.map((product) => product.type).filter(Boolean))], [data]);

  const [sortOrder, setSortOrder] = useState("recommended");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(maxPrice);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleColorToggle = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color]
    );
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedMaxPrice(maxPrice);
    setSelectedColors([]);
    setSelectedTypes([]);
  };

  const filteredProducts = useMemo(() => {
    return data.filter((product) => {
      const matchesPrice = product.price <= selectedMaxPrice;
      const matchesColor =
        selectedColors.length === 0 || selectedColors.includes(product.color);
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(product.type);

      return matchesPrice && matchesColor && matchesType;
    });
  }, [data, selectedColors, selectedMaxPrice, selectedTypes]);

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    if (sortOrder === "recommended") {
      products.sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }

        return a.id - b.id;
      });
    }

    if (sortOrder === "cheapest") {
      products.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "expensive") {
      products.sort((a, b) => b.price - a.price);
    }

    return products;
  }, [filteredProducts, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE));
  const visibleProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder, selectedMaxPrice, selectedColors, selectedTypes, data]);

  useEffect(() => {
    setSelectedMaxPrice(maxPrice);
  }, [maxPrice]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const hasActiveFilters =
    selectedMaxPrice !== maxPrice || selectedColors.length > 0 || selectedTypes.length > 0;

  return (
    <section className="products-overview">
      <aside className="filter-section">
        <div className="filter-section-inner">
          <h3>Filtr</h3>
          <div className="filters">
            <div className="filter-group">
              <div className="filter-group-header">
                <h4>Cena</h4>
                {hasActiveFilters && (
                  <button
                    type="button"
                    className="clear-filters"
                    onClick={clearFilters}
                  >
                    Vymazat
                  </button>
                )}
              </div>

              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  step="10"
                  value={selectedMaxPrice}
                  onChange={(e) => setSelectedMaxPrice(Number(e.target.value))}
                />
                <div className="price-range-values">
                  <span>0 Kč</span>
                  <strong>{selectedMaxPrice} Kč</strong>
                </div>
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-group-header">
                <h4>Barva</h4>
              </div>

              <div className="filter-options">
                {availableColors.map((color) => (
                  <label className="filter-option color-option" key={color} htmlFor={color}>
                    <input
                      id={color}
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={() => handleColorToggle(color)}
                    />
                    <span
                      className={`color-swatch ${color === "bílá" ? "light" : ""}`}
                      style={{ backgroundColor: colorPreviewMap[color] || color }}
                    />
                    <span>{color}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-group-header">
                <h4>Typ</h4>
              </div>

              <div className="filter-options">
                {availableTypes.map((type) => (
                  <label className="filter-option" key={type} htmlFor={type}>
                    <input
                      id={type}
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeToggle(type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="products-content">
        <div className="sorting-section">
          <div className="sorting-actions">
            {Object.entries(sortLabels).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={sortOrder === value ? "checked" : ""}
                id={`sort-${value}`}
                value={value}
                onClick={() => setSortOrder(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="products-list">
            {visibleProducts.map((product) => (
              <div className="product-item" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="products-empty">
            <h4>Žádný produkt neodpovídá zvolenému filtru.</h4>
            <p>Upravte filtr nebo jej vymažte a zkuste to znovu.</p>
          </div>
        )}

        {sortedProducts.length > PRODUCTS_PER_PAGE && (
          <div className="pagination">
            <button
              type="button"
              className="pagination-button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Předchozí
            </button>

            <div className="pagination-pages">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  type="button"
                  key={page}
                  className={`pagination-page ${currentPage === page ? "active" : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="pagination-button"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Další
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsOverview;
