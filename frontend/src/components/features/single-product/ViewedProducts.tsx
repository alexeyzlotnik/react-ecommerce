import ProductCard from "../product-card/ProductCard";
import { Grid } from "@chakra-ui/react";
import { useViewedProducts } from "../../../hooks/useViewedProducts";
import { useCart } from "../../../hooks/useCart";

export default function ViewedProducts({
  currentProductId,
}: {
  currentProductId: number;
}) {
  const { viewedProducts, hasViewedProducts } =
    useViewedProducts(currentProductId);
  const { addToCart, isProductInCart } = useCart();

  if (!hasViewedProducts) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Viewed Products</h2>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap="6">
        {viewedProducts.map(product => (
          <ProductCard
            key={product.id}
            colSpan={1}
            product={product}
            productIsAddedToCart={isProductInCart(product.id)}
            handleAddToCart={() => addToCart(product)}
          />
        ))}
      </Grid>
    </div>
  );
}
