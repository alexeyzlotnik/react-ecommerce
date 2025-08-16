import { Product } from "@/lib/definitions";
import { Badge, Card, HStack, Image } from "@chakra-ui/react";
import AppButton from "../../ui/AppButton";
import { Link, useNavigate } from "react-router";

interface ProductCardIProps {
  product: Product;
  showPrice?: boolean;
  showButton?: boolean;
  productIsAddedToCart?: boolean;
  colSpan?: number;
  variant?: "default" | "horizontal";
  handleAddToCart: (product: Product) => void;
}

function ProductCard({
  product,
  showPrice = true,
  showButton = true,
  productIsAddedToCart = false,
  variant = "default",
  handleAddToCart,
}: ProductCardIProps) {
  const navigate = useNavigate();

  const isVariantDefault = variant === "default";

  const imageToUse = isVariantDefault ? product.image_thumbnail : product.image;
  const wrapperFlexDirection = isVariantDefault ? "column" : "row";
  const wrapperClass = isVariantDefault ? null : "max-w-[1000px] !m-auto";

  const SingleProductImage = () => {
    return imageToUse ? (
      <Image
        src={imageToUse[0].url}
        alt={product.name}
        height={{ base: 350, md: 380, lg: 400 }}
        width={{ base: 300, md: 380, lg: 500 }}
        roundedTop="md"
        fit="cover"
        draggable="false"
      />
    ) : null;
  };

  const ListProductImage = () => {
    return imageToUse ? (
      <>
        <Card.Header padding={0}>
          <Image
            src={imageToUse[0].url}
            alt={product.name}
            height={{ base: 150, md: 180, lg: 200 }}
            roundedTop="md"
            fit="cover"
            className="cursor-pointer"
            onClick={() => navigate(`/product/${product.documentId}`)}
            draggable="false"
          />
        </Card.Header>
      </>
    ) : null;
  };

  const ProductBrand = () => {
    return (
      <HStack mt="2" mb="2">
        <Badge
          variant={"solid"}
          backgroundColor={"orange.400"}
          className="cursor-pointer"
          onClick={() => navigate(`/category/${product.category.slug}`)}>
          {product.category.name}
        </Badge>
      </HStack>
    );
  };

  const ProductBuyButton = () => {
    return (
      <>
        {showButton ? (
          <>
            <Card.Footer>
              <AppButton
                variant={productIsAddedToCart ? "secondary" : "primary"}
                onClick={() => handleAddToCart(product)}>
                {productIsAddedToCart ? "Remove from cart" : "Add to cart"}
              </AppButton>
            </Card.Footer>
          </>
        ) : null}
      </>
    );
  };

  const ListProductBody = () => {
    return (
      <>
        <Card.Body>
          <Card.Title>
            <Link to={`/product/${product.documentId}`}>
              <h4>{product.name}</h4>
            </Link>
          </Card.Title>
          <span>{product.category && <ProductBrand />}</span>
          {showPrice ? (
            <>
              <div className="flex gap-2">
                <span>{product.price}$</span>{" "}
                <span className="line-through">{product.originalPrice}$</span>
              </div>
            </>
          ) : null}
        </Card.Body>
        <ProductBuyButton />
      </>
    );
  };

  const SingleProductBody = () => {
    return (
      <>
        <HStack
          flexDirection={"column"}
          width={"full"}
          alignItems={"flex-start"}>
          <Card.Body>
            <Card.Title mb="2" as={"h1"}>
              {product.name}
            </Card.Title>
            <Card.Description>
              <span className="flex gap-2">
                Price:
                <span>{product.price}$</span>
                <span className="line-through">{product.originalPrice}$</span>
              </span>
            </Card.Description>
            <ProductBrand />
          </Card.Body>
          <ProductBuyButton />
        </HStack>
      </>
    );
  };

  const ProductImage = () =>
    isVariantDefault ? <ListProductImage /> : <SingleProductImage />;

  const ProductBody = () =>
    isVariantDefault ? <ListProductBody /> : <SingleProductBody />;

  return (
    <>
      <Card.Root
        id={`product-${product.id}`}
        variant="subtle"
        flexDirection={wrapperFlexDirection}
        overflow="hidden"
        className={`${wrapperClass}`}>
        <ProductImage />
        <ProductBody />
      </Card.Root>
    </>
  );
}

export default ProductCard;
