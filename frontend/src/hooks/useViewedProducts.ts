import { useState, useEffect, useCallback } from "react";
import { Product } from "../lib/definitions";

const MAX_NUMBER_OF_PRODUCTS = 4;
const STORAGE_KEY = "viewedProducts";

const limitViewedProducts = (productsArr: Array<Product>): Array<Product> => {
  if (productsArr.length > MAX_NUMBER_OF_PRODUCTS) {
    return productsArr.slice(
      productsArr.length - MAX_NUMBER_OF_PRODUCTS,
      productsArr.length
    );
  }
  return productsArr;
};

const getViewedProductsFromStorage = (
  productIdToExclude: number | undefined
): Array<Product> => {
  const viewedProducts = localStorage.getItem(STORAGE_KEY);

  if (viewedProducts) {
    try {
      const products = JSON.parse(viewedProducts);
      return products.filter((i: Product) => i.id !== productIdToExclude);
    } catch (error) {
      console.error("Error parsing viewed products:", error);
      return [];
    }
  }

  return [];
};

export const useViewedProducts = (productIdToExclude?: number | undefined) => {
  const [viewedProducts, setViewedProducts] = useState<Array<Product>>([]);

  // Load viewed products from localStorage on mount
  useEffect(() => {
    const products = getViewedProductsFromStorage(productIdToExclude);
    setViewedProducts(products);
  }, [productIdToExclude]);

  const saveViewedProduct = useCallback((product: Product) => {
    setViewedProducts(prevProducts => {
      // Check if the product is already in the array
      if (prevProducts.some((p: Product) => p.id === product.id)) {
        return prevProducts; // Product already exists, no need to add it
      }

      // Add the new product
      const newProducts = [...prevProducts, product];

      // Limit the array size
      const limitedProducts = limitViewedProducts(newProducts);

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedProducts));

      return limitedProducts;
    });
  }, []);

  const clearViewedProducts = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setViewedProducts([]);
  }, []);

  const removeViewedProduct = useCallback((productId: number) => {
    setViewedProducts(prevProducts => {
      const filteredProducts = prevProducts.filter(p => p.id !== productId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProducts));
      return filteredProducts;
    });
  }, []);

  return {
    viewedProducts,
    saveViewedProduct,
    clearViewedProducts,
    removeViewedProduct,
    hasViewedProducts: viewedProducts.length > 0,
    viewedProductsCount: viewedProducts.length,
  };
};
