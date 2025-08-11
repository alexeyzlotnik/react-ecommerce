import { Badge, Box, Card, HStack, Image } from "@chakra-ui/react";
import { Product } from "../../../lib/definitions";
import AppButton from "../../ui/AppButton";

export default function ProductCard({
  product,
}: {
  product: Product | undefined;
}) {
  const ProductImageSlider = () => (
    <>
      <Image
        src={product?.image[0].url}
        maxWidth={"50%"}
        width={"50%"}
        maxHeight={"300px"}
        objectFit={"cover"}
        objectPosition={"center"}
      />
    </>
  );

  return (
    <>
      {product && (
        <Card.Root
          flexDirection="row"
          overflow="hidden"
          className="max-w-[1000px] !m-auto">
          <ProductImageSlider />
          <Box>
            <Card.Body>
              <Card.Title mb="2">{product.name}</Card.Title>
              <Card.Description>
                <p className="flex gap-2">
                  Price:
                  <span>{product.price}$</span>
                  <span className="line-through">{product.originalPrice}$</span>
                </p>
              </Card.Description>
              <HStack mt="4">
                <Badge>{product.category.name}</Badge>
                {/* <Badge>Caffeine</Badge> */}
              </HStack>
            </Card.Body>
            <Card.Footer>
              <AppButton>Add to cart</AppButton>
            </Card.Footer>
          </Box>
        </Card.Root>
      )}
    </>
  );
}
