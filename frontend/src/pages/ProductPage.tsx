import { useParams, useNavigate } from "react-router";
import { StrapiProductService } from "../services/StrapiProductService";
import { useCallback, useEffect, useState } from "react";
import { Product } from "@/lib/definitions";
import ProductCard from "../components/features/product-card/ProductCard";
// import RelaterProducts from "../components/features/single-product/RelaterProducts";
import ViewedProducts from "../components/features/single-product/ViewedProducts";
import { Button, Spinner, Text, Box } from "@chakra-ui/react";
import { LuArrowLeft } from "react-icons/lu";
import { useViewedProducts } from "../hooks/useViewedProducts";
import { useCart } from "../hooks/useCart";

const service = new StrapiProductService();

export default function ProductPage() {
  const { product: productId } = useParams();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const viewedProducts = useViewedProducts();
  const cart = useCart();

  const BackButton = () => (
    <Button variant={"plain"} paddingLeft={0} onClick={() => navigate("/shop")}>
      <LuArrowLeft />
      Back to shop
    </Button>
  );

  const loadProduct = useCallback(async () => {
    if (!productId) return;
    try {
      setLoading(true);
      setError(null);
      const result = await service.getProduct(productId);
      return result;
    } catch (err) {
      setError("Failed to load product. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const saveProductToLocalStorage = useCallback(() => {
    if (product) {
      viewedProducts.saveViewedProduct(product);
    }
  }, [product, viewedProducts]);

  const retryLoad = () => {
    if (productId) {
      loadProduct()
        .then(result => {
          if (result && result.data) {
            // Handle both single product and array cases
            if (Array.isArray(result.data)) {
              setProduct(result.data[0]);
            } else {
              setProduct(result.data);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const result = await loadProduct();
        if (result && result.data) {
          // Handle both single product and array cases
          if (Array.isArray(result.data)) {
            setProduct(result.data[0]);
          } else {
            setProduct(result.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    load();
  }, [loadProduct]);

  useEffect(() => {
    saveProductToLocalStorage();
  }, [saveProductToLocalStorage]);

  if (loading) {
    return (
      <>
        <BackButton />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minH="400px">
          <Spinner size="xl" />
          <Text ml={4}>Loading product...</Text>
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <>
        <BackButton />
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
            maxW="md">
            <Text color="red.600" fontWeight="medium">
              {error}
            </Text>
            <Button mt={2} onClick={retryLoad} colorScheme="blue" size="sm">
              Try Again
            </Button>
          </Box>
        </Box>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <BackButton />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minH="400px">
          <Box
            border="1px solid"
            borderColor="orange.200"
            borderRadius="md"
            p={4}
            bg="orange.50"
            maxW="md">
            <Text color="orange.600" fontWeight="medium">
              Product not found
            </Text>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <div className="!space-y-16">
        <BackButton />
        <section>
          <ProductCard
            variant="horizontal"
            product={product}
            handleAddToCart={cart.addToCart}
            productIsAddedToCart={cart.isProductInCart(product.id)}
          />
        </section>
        {/* <RelaterProducts /> */}
        <section>
          {viewedProducts.hasViewedProducts && product?.id && (
            <ViewedProducts currentProductId={product.id} />
          )}
        </section>
      </div>
    </>
  );
}
