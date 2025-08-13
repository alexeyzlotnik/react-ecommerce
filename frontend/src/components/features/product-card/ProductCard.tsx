import { Product } from "@/lib/definitions";
import { Card, Image } from "@chakra-ui/react";
import AppButton from "../../ui/AppButton";
import { Link, useNavigate } from "react-router";

// // cart
// import { useSelector, useDispatch } from 'react-redux';
// import { cartCount, add, remove } from './cartSlice'

interface ProductCardIProps {
  product: Product;
  showPrice?: boolean;
  showButton?: boolean;
  productIsAddedToCart?: boolean;
  colSpan?: number;
  handleAddToCart: (product: Product) => void;
}

function ProductCard({
  product,
  showPrice = true,
  showButton = true,
  productIsAddedToCart = false,
  handleAddToCart,
}: ProductCardIProps) {
  const navigate = useNavigate();

  const ProductImage = () =>
    product.image_thumbnail ? (
      <Image
        src={product.image_thumbnail[0]?.url}
        alt={product.name}
        height={{ base: 150, md: 180, lg: 200 }}
        roundedTop="md"
        fit="cover"
        className="cursor-pointer"
        onClick={() => navigate(`/product/${product.documentId}`)}
      />
    ) : null;

  const ProductBody = () => (
    <>
      <Link to={`/product/${product.documentId}`}>
        <h3>{product.name}</h3>
      </Link>
      <span>
        {product.category && (
          <>
            Brand:{" "}
            <Link
              to={`/category/${product.category.slug}`}
              className="!underline">
              {product.category?.name}
            </Link>
          </>
        )}
      </span>
      {showPrice ? <span>{product.price}$</span> : null}
    </>
  );

  const ProductBuyButton = () => {
    return (
      <>
        {showButton ? (
          <>
            <AppButton
              variant={productIsAddedToCart ? "secondary" : "primary"}
              onClick={() => handleAddToCart(product)}>
              {productIsAddedToCart ? "Remove from cart" : "Add to cart"}
            </AppButton>
          </>
        ) : null}
      </>
    );
  };

  return (
    <>
      <Card.Root id={`product-${product.id}`} variant="subtle">
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
