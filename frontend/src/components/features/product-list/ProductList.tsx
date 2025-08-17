import { useCallback, useEffect, useState } from "react";
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
  limit = 8,
}: {
  service: IProductService;
  category?: string | null;
  showLoadMore?: boolean;
  limit?: number;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const cart = useCart();
  const [pagination, setPagination] = useState({
    offset: 0,
    loadedCount: 0,
    totalAvailable: 0,
    hasMore: true,
  });

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
      const result = await service.getProducts({
        category,
        offset: pagination.offset + pagination.loadedCount, // Next offset
        limit: limit,
      });

      if (result?.data) {
        setProducts(prev => [...prev, ...result.data]);

        // Update pagination state based on response
        setPagination(prev => ({
          ...prev,
          offset: result.pagination.nextOffset,
          loadedCount: prev.loadedCount + result.data.length,
          totalAvailable: result.pagination.total,
          hasMore: result.pagination.hasMore,
        }));
      }
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoadMoreLoading(false);
    }
  };

  const retryLoad = async () => {
    setInitialLoading(true);
    setError(null);
    try {
      const initialProducts = await fetchProducts();
      if (initialProducts?.data) {
        // Ensure we're working with an array
        const productsArray = Array.isArray(initialProducts.data)
          ? initialProducts.data
          : [initialProducts.data];

        setProducts(productsArray);
        // Set initial pagination state
        setPagination({
          offset: 0,
          loadedCount: initialProducts.data.length,
          totalAvailable: initialProducts.pagination.total,
          hasMore: initialProducts.pagination.hasMore,
        });
      }
    } catch (error) {
      console.error("Error loading initial products:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialProducts = async () => {
      try {
        const result = await service.getProducts({
          category,
          offset: 0,
          limit: limit,
        });

        if (result?.data) {
          setProducts(result.data);

          // Set initial pagination state
          setPagination({
            offset: 0,
            loadedCount: result.data.length,
            totalAvailable: result.pagination.total,
            hasMore: result.pagination.hasMore,
          });
        }
      } catch (error) {
        console.error("Error loading initial products:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadInitialProducts();
  }, [service, fetchProducts, category]);

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

      {showLoadMore && products?.length > 0 && pagination.hasMore && (
        <LoadMoreButton
          loading={loadMoreLoading}
          canLoadMore={{
            value: pagination.hasMore,
            count: pagination.totalAvailable - pagination.loadedCount,
          }}
          onClick={handleLoadMore}>
          {loadMoreLoading
            ? "Loading..."
            : `Load + ${
                pagination.totalAvailable - pagination.loadedCount
              } more products`}
        </LoadMoreButton>
      )}
    </>
  );
}

export default ProductList;
