import { useParams, useNavigate } from "react-router";
import { StrapiProductService } from "../services/StrapiProductService";
import { useCallback, useEffect, useState } from "react";
import { Product } from "@/lib/definitions";
import ProductCard from "../components/features/single-product/ProductCard";
import RelaterProducts from "../components/features/single-product/RelaterProducts";
import ViewedProducts from "../components/features/single-product/ViewedProducts";
import { Button } from "@chakra-ui/react";
import { LuArrowLeft } from "react-icons/lu";
import { useViewedProducts } from "../hooks/useViewedProducts";

const service = new StrapiProductService();

export default function ProductPage() {
  const { product: productId } = useParams();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const navigate = useNavigate();
  const viewedProducts = useViewedProducts();

  const BackButton = () => (
    <Button variant={"plain"} paddingLeft={0} onClick={() => navigate("/")}>
      <LuArrowLeft />
      Back to shop
    </Button>
  );
  const loadProduct = useCallback(async () => {
    if (!productId) return;
    const result = await service.getProduct(productId);
    return result;
  }, [productId]);

  const saveProductToLocalStorage = () => {
    if (product) {
      viewedProducts.saveViewedProduct(product);
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
  });

  return (
    <>
      <BackButton />
      <ProductCard product={product} />
      <RelaterProducts />
      {viewedProducts.hasViewedProducts && product?.id && (
        <ViewedProducts currentProductId={product.id} />
      )}
    </>
  );
}
