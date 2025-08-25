import { Product } from "@/lib/definitions";
import {
  Badge,
  Card,
  HStack,
  Image,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
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
  const wrapperFlexDirection = {
    base: "column", // Always column on mobile
    sm: isVariantDefault ? "column" : "row", // Use variant logic on medium screens and up
  };
  const wrapperClass = isVariantDefault ? null : "max-w-[1000px] !m-auto";

  const SingleProductImage = () => {
    return imageToUse ? (
      <Image
        src={imageToUse[0].url}
        alt={product.name}
        height={{ base: 250, sm: 300, md: 350, lg: 400 }}
        width={{ base: "100%", sm: 300, md: 380, lg: 500 }}
        fit="cover"
        draggable="false"
        objectFit="cover"
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
            height={{ base: 200, sm: 220, md: 250, lg: 280 }}
            width="100%"
            roundedTop="md"
            fit="cover"
            className="cursor-pointer"
            onClick={() => navigate(`/product/${product.documentId}`)}
            draggable="false"
            objectFit="cover"
            transition="transform 0.2s"
            // _hover={{ transform: "scale(1.02)" }}
          />
        </Card.Header>
      </>
    ) : null;
  };

  const ProductBrand = () => {
    return (
      <HStack mt="2" mb="2" flexWrap="wrap" gap={2}>
        <Badge
          variant={"solid"}
          backgroundColor={"orange.400"}
          className="cursor-pointer"
          onClick={() => navigate(`/category/${product.category.slug}`)}
          fontSize={{ base: "xs", md: "sm" }}
          px={{ base: 2, md: 3 }}
          py={{ base: 1, md: 1.5 }}>
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
            <Card.Footer p={{ base: 3, md: 4 }}>
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
        <Card.Body p={{ base: 3, md: 4 }}>
          <VStack align="start">
            <Card.Title>
              <Link to={`/product/${product.documentId}`}>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="semibold"
                  lineHeight="tight"
                  transition="color 0.2s">
                  {product.name}
                </Text>
              </Link>
            </Card.Title>

            <span>{product.category && <ProductBrand />}</span>

            {showPrice ? (
              <Box>
                <HStack flexWrap="wrap">
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="bold"
                    color="green.600">
                    ${product.price}
                  </Text>
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <Text
                        fontSize={{ base: "sm", md: "md" }}
                        textDecoration="line-through"
                        color="gray.500">
                        ${product.originalPrice}
                      </Text>
                    )}
                </HStack>
              </Box>
            ) : null}
          </VStack>
        </Card.Body>
        <ProductBuyButton />
      </>
    );
  };

  const SingleProductBody = () => {
    return (
      <>
        <VStack
          flexDirection={"column"}
          width={"full"}
          alignItems={"flex-start"}>
          <Card.Body p={{ base: 4, md: 6 }}>
            <VStack align="start">
              <Card.Title
                mb="2"
                as={"h1"}
                fontSize={{ base: "2xl", md: "3xl" }}>
                {product.name}
              </Card.Title>

              <Card.Description>
                <VStack align="start">
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="semibold">
                    Price:
                  </Text>
                  <HStack>
                    <Text
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="bold"
                      color="green.600">
                      ${product.price}
                    </Text>
                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <Text
                          fontSize={{ base: "lg", md: "xl" }}
                          textDecoration="line-through"
                          color="gray.500">
                          ${product.originalPrice}
                        </Text>
                      )}
                  </HStack>
                </VStack>
              </Card.Description>

              <ProductBrand />
            </VStack>
          </Card.Body>
          <ProductBuyButton />
        </VStack>
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
        className={`${wrapperClass}`}
        height="100%"
        transition="all 0.2s"
        _hover={{
          // transform: "translateY(-2px)",
          boxShadow: "sm",
        }}>
        <ProductImage />
        <ProductBody />
      </Card.Root>
    </>
  );
}

export default ProductCard;
