import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { IProductService } from "@/lib/interfaces";
import ProductList from "../features/product-list/ProductList";
import AppButton from "../ui/AppButton";
import { useNavigate } from "react-router";

interface ProductsSectionProps {
  service: IProductService;
}

export const ProductsSection = ({ service }: ProductsSectionProps) => {
  const navigate = useNavigate();
  return (
    <Box py={16} bg="bg.subtle">
      <Container maxW="container.xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading size="xl">Featured Products</Heading>
            <Text fontSize="lg" maxW="600px">
              Discover our handpicked selection of premium products, carefully
              curated for quality and innovation.
            </Text>
          </VStack>

          <ProductList service={service} showLoadMore={false} limit={4} />
          <AppButton
            size="lg"
            variant="primary"
            onClick={() => navigate("/shop")}>
            See all products
          </AppButton>
        </VStack>
      </Container>
    </Box>
  );
};
