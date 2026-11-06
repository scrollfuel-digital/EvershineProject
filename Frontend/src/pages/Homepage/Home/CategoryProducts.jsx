import React, { useState, useEffect } from "react";
import { useDataProcess } from "../../../services/dataProccess";
import { fetchActiveProducts } from "../../../services/productService";
import CategoryProductSection from "./CategoryProductSection";

export default function CategoryProducts() {
  const { categories = [], nameMap } = useDataProcess();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      try {
        const data = await fetchActiveProducts();
        if (isMounted) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.warn("Failed to load products for homepage categories:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading && products.length === 0) {
    return null;
  }

  if (categories.length === 0 || products.length === 0) {
    return null;
  }

  return (
    <div className="mx-4 md:mx-[4vw] space-y-12 sm:space-y-16 py-6 sm:py-10">
      {categories.map((category) => (
        <CategoryProductSection
          key={category.id || category.name}
          category={category}
          products={products}
          nameMap={nameMap}
        />
      ))}
    </div>
  );
}

