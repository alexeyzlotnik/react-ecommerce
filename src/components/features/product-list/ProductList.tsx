import { useCallback, useEffect, useState, useRef } from "react";
import ProductCard from "../product-card/ProductCard";
import LoadMoreButton from "../load-more-button/LoadMoreButton";
import { Button, Grid, GridItem } from "@chakra-ui/react";
// import { mockProducts } from "../../../data/data"
import { ProductService } from "../../../services/ProductService";
// cart
import { useSelector, useDispatch } from "react-redux";
import { cartCount, add, remove } from "../cart/cartSlice";
import { CartProduct, Product } from "@/lib/definitions";

const _numberToLoad: number = 4;
const productService = new ProductService(_numberToLoad);

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const hasInitialized = useRef(false);

  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const fetchProducts = useCallback(() => {
    const data = productService.getProducts();
    return data;
  }, []); // Empty dependency array since productService is stable

  // helper function
  const isProductInCart = (productId: number) => {
    return cartItems.filter(item => item.id === productId).length > 0;
  };

  const formatProductForCart = (product: Product): CartProduct => {
    if (!product) return;

    const { id, name, brand, price } = product;

    return {
      id: id,
      name: name,
      brand: brand,
      price: price,
    };
  };

  const handleAddToCart = (product: Product): void => {
    isProductInCart(product.id)
      ? dispatch(remove(product.id))
      : dispatch(add(formatProductForCart(product)));
  };

  const handleLoadMore = () => {
    setLoadMoreLoading(true);

    setTimeout(() => {
      // simulate promise delay
      const newProductsResponse = fetchProducts();
      setProducts(prevProducts => [
        ...prevProducts,
        ...newProductsResponse.data,
      ]);
      setLoadMoreLoading(false);
      setCanLoadMore(productService.canLoadMore().value);
    }, 500);
  };

  useEffect(() => {
    // Prevent double fetching in development
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initialProducts = fetchProducts();
    setProducts(initialProducts.data);
    setCanLoadMore(productService.canLoadMore().value);
  }, []);

  const productList =
    products.length === 0 ? (
      <p>List empty</p>
    ) : (
      products.map(product => (
        <ProductCard
          colSpan={1}
          key={product.id}
          product={product}
          handleAddToCart={handleAddToCart}
          productIsAddedToCart={isProductInCart(product.id)}
        />
      ))
    );

  return (
    <>
      <h1 className="!mb-4">Cool shop</h1>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap="6">
        {productList}
      </Grid>

      <LoadMoreButton
        loading={loadMoreLoading}
        canLoadMore={canLoadMore}
        onClick={handleLoadMore}>
        {loadMoreLoading
          ? "Loading..."
          : `Load + ${productService.canLoadMore().count} more products`}
      </LoadMoreButton>
    </>
  );
}

export default ProductList;
