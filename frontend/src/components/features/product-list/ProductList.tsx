import { useCallback, useEffect, useState, useRef } from "react";
import ProductCard from "../product-card/ProductCard";
import LoadMoreButton from "../load-more-button/LoadMoreButton";
import { Grid } from "@chakra-ui/react";

// cart
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../cart/cartSlice";
import { CartProduct, Product, RootState } from "@/lib/definitions";
import { IProductService } from "@/lib/interfaces";

function ProductList({
  service,
  category,
}: {
  service: IProductService;
  category?: string | null;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
  const hasInitialized = useRef<boolean>(false);

  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const fetchProducts = useCallback(async () => {
    const data = await service.getProducts({ category });
    return data;
  }, [service, category]);

  // helper function
  const isProductInCart = (productId: number) => {
    return cartItems.filter(item => item.id === productId).length > 0;
  };

  const formatProductForCart = (product: Product): CartProduct | undefined => {
    if (!product) return;

    const { id, name, category, price } = product;

    return {
      id: id,
      name: name,
      category: category,
      price: price,
    };
  };

  const handleAddToCart = (product: Product): void => {
    if (isProductInCart(product.id)) {
      dispatch(remove(product.id));
    } else {
      const cartProduct = formatProductForCart(product);
      if (cartProduct) {
        dispatch(add(cartProduct));
      }
    }
  };

  const handleLoadMore = async () => {
    setLoadMoreLoading(true);

    try {
      const newProductsResponse = await fetchProducts();

      if (newProductsResponse?.data) {
        // Ensure we're working with an array before spreading
        const newProducts = Array.isArray(newProductsResponse.data)
          ? newProductsResponse.data
          : [newProductsResponse.data];

        setProducts(prevProducts => [...prevProducts, ...newProducts]);
      }
      setCanLoadMore(service.canLoadMore().value);
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoadMoreLoading(false);
    }
  };

  useEffect(() => {
    // Prevent double fetching in development
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const loadInitialProducts = async () => {
      try {
        const initialProducts = await fetchProducts();
        if (initialProducts?.data) {
          // Ensure we're working with an array
          const productsArray = Array.isArray(initialProducts.data)
            ? initialProducts.data
            : [initialProducts.data];

          setProducts(productsArray);
          setCanLoadMore(service.canLoadMore().value);
        }
      } catch (error) {
        console.error("Error loading initial products:", error);
      }
    };

    loadInitialProducts();
  }, [service, fetchProducts]);

  const productList =
    products?.length === 0 ? (
      // TODO: add skeleton here
      <p>List empty</p>
    ) : (
      products?.map(product => (
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

      {products?.length > 0 && (
        <LoadMoreButton
          loading={loadMoreLoading}
          canLoadMore={canLoadMore}
          onClick={handleLoadMore}>
          {loadMoreLoading
            ? "Loading..."
            : `Load + ${service.canLoadMore().count} more products`}
        </LoadMoreButton>
      )}
    </>
  );
}

export default ProductList;
