import { createContext, useContext, useEffect, useState } from "react";
import seedProducts from "../data";

const ProductContext = createContext();
const PRODUCTS_STORAGE_KEY = "products";

const readStorageJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};

const normalizeProduct = (product) => ({
  ...product,
  id: Number(product.id),
  name: product.name?.trim() ?? "",
  description: product.description?.trim() ?? "",
  price: Number(product.price) || 0,
  rating: Number(product.rating) || 0,
  colors: Array.isArray(product.colors) 
    ? product.colors.map(c => c?.trim()).filter(Boolean)
    : (product.color ? [product.color.trim()] : []),
  type: product.type?.trim() ?? "",
  image: product.image || "",
  detailImage: product.detailImage || product.image || "",
  parameters: Array.isArray(product.parameters) ? product.parameters : [],
});

const hasLegacyImageReferences = (products) =>
  products.some((product) =>
    typeof product.image === "string" &&
    product.image.includes("product_img_") &&
    product.image.endsWith(".jpg")
  );

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const stored = readStorageJSON(PRODUCTS_STORAGE_KEY, null);
    if (Array.isArray(stored) && stored.length > 0 && !hasLegacyImageReferences(stored)) {
      // Re-map image references from seedProducts when loading from localStorage
      return stored.map(storedProduct => {
        const seedProduct = seedProducts.find(p => p.id === storedProduct.id);
        return {
          ...normalizeProduct(storedProduct),
          image: seedProduct?.image || storedProduct.image || "",
          detailImage: seedProduct?.detailImage || storedProduct.detailImage || seedProduct?.image || storedProduct.image || "",
        };
      });
    }

    return seedProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  const saveProduct = (payload) => {
    const product = normalizeProduct(payload);

    if (!product.name || !product.description || product.colors.length === 0 || !product.type) {
      return { ok: false, message: "Vyplňte název, popis, barvy a typ produktu." };
    }

    if (product.price <= 0) {
      return { ok: false, message: "Cena musí být vyšší než 0 Kč." };
    }

    if (product.rating < 0 || product.rating > 5) {
      return { ok: false, message: "Hodnocení musí být v rozsahu 0 až 5." };
    }

    if (product.id) {
      setProducts((prev) => prev.map((item) => (item.id === product.id ? product : item)));
      return { ok: true };
    }

    setProducts((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((item) => item.id)) + 1 : 1;
      return [...prev, { ...product, id: nextId }];
    });
    return { ok: true };
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const value = {
    products,
    saveProduct,
    deleteProduct,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within a ProductProvider");
  return ctx;
};
