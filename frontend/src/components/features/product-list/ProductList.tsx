import { useCallback, useEffect, useState, useRef } from "react";
import ProductCard from "../product-card/ProductCard";
import LoadMoreButton from "../load-more-button/LoadMoreButton";
import { Grid, Box, Text, Button, Spinner } from "@chakra-ui/react";
import { Product } from "@/lib/definitions";
import { IProductService } from "@/lib/interfaces";
import { useCart } from "../../../hooks/useCart";

function ProductList({
  service,
  category,
  showLoadMore = true,
}: {
  service: IProductService;
  category?: string | null;
  showLoadMore?: boolean;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hasInitialized = useRef<boolean>(false);
  const cart = useCart();

  const fetchProducts = useCallback(async () => {
    try {
      setError(null);
      const data = await service.getProducts({ category });
      return data;
    } catch (err) {
      setError("Failed to load products. Please try again.");
      throw err;
    }
  }, [service, category]);

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

  const retryLoad = async () => {
    setInitialLoading(true);
    setError(null);
    // Reset service state when retrying
    service.resetPagination();
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
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    // Reset service pagination state when component mounts or service changes
    service.resetPagination();
    hasInitialized.current = false;

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
      } finally {
        setInitialLoading(false);
      }
    };

    loadInitialProducts();

    // Cleanup: reset service when component unmounts
    return () => {
      service.resetPagination();
    };
  }, [service, fetchProducts]);

  if (initialLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="400px">
        <Spinner size="xl" />
        <Text ml={4}>Loading products...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="400px">
        <Box
          border="1px solid"
          borderColor="red.200"
          borderRadius="md"
          p={4}
          bg="red.50"
          maxW="md"
          textAlign="center">
          <Text color="red.600" fontWeight="medium" mb={3}>
            {error}
          </Text>
          <Button onClick={retryLoad} colorScheme="blue" size="sm">
            Try Again
          </Button>
        </Box>
      </Box>
    );
  }

  const productList =
    products?.length === 0 ? (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="200px"
        textAlign="center">
        <Text color="gray.500">No products found</Text>
      </Box>
    ) : (
      products?.map(product => (
        <ProductCard
          colSpan={1}
          key={product.id}
          product={product}
          handleAddToCart={cart.addToCart}
          productIsAddedToCart={cart.isProductInCart(product.id)}
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

      {showLoadMore && products?.length > 0 && (
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
