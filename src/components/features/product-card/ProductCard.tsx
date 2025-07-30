import { Product } from "@/lib/definitions";
import { Card, Image, Button } from "@chakra-ui/react";
// // cart
// import { useSelector, useDispatch } from 'react-redux';
// import { cartCount, add, remove } from './cartSlice'

interface ProductCardIProps {
  product: Product;
  showPrice?: boolean;
  showButton?: boolean;
  productIsAddedToCart?: boolean;
  handleAddToCart: () => void;
}

function ProductCard({
  product,
  showPrice = true,
  showButton = true,
  productIsAddedToCart = false,
  handleAddToCart,
}: ProductCardIProps) {
  // const cartItems = useSelector((state) => state.cart);
  // const dispatch = useDispatch();

  // const isProductAddedToCart = cartItems.filter(el => el.id === product.id).length > 0

  const ProductImage = () => (
    <Image
      src={product.image}
      alt={product.name}
      height={{ base: 150, md: 180, lg: 200 }}
      roundedTop="md"
      fit="cover"
    />
  );

  const ProductBody = () => (
    <>
      <h3>{product.name}</h3>
      <span>Brand: {product.brand}</span>
      {showPrice ? <span>{product.price}$</span> : null}
    </>
  );

  const ProductBuyButton = () => {
    return (
      <>
        {showButton ? (
          <>
            <Button
              backgroundColor={
                productIsAddedToCart ? "green.100" : "green.emphasized"
              }
              color={productIsAddedToCart ? "green" : "white"}
              onClick={() => handleAddToCart(product.id)}>
              {productIsAddedToCart ? "Remove from cart" : "Add to cart"}
            </Button>
          </>
        ) : null}
      </>
    );
  };

  return (
    <>
      <Card.Root
        id={`product-${product.id}`}
        variant="subtle">
        <Card.Header padding={0}>
          <ProductImage />
        </Card.Header>
        <Card.Body>
          <ProductBody />
        </Card.Body>
        <Card.Footer>
          <ProductBuyButton />
        </Card.Footer>
      </Card.Root>
    </>
  );
}

export default ProductCard;
