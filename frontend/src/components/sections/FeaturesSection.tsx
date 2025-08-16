import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FiShoppingBag, FiTruck, FiShield, FiStar } from "react-icons/fi";

export const FeaturesSection = () => {
  const features = [
    {
      icon: FiShoppingBag,
      title: "Wide Selection",
      description: "Discover thousands of unique products from trusted sellers",
    },
    {
      icon: FiTruck,
      title: "Fast Delivery",
      description: "Free shipping on orders over $50 with 2-3 day delivery",
    },
    {
      icon: FiShield,
      title: "Secure Shopping",
      description: "Your data is protected with bank-level security",
    },
    {
      icon: FiStar,
      title: "Quality Guarantee",
      description: "30-day money-back guarantee on all purchases",
    },
  ];

  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <VStack gap={16}>
          <VStack gap={4} textAlign="center">
            <Heading size="xl">Why Choose TechMart?</Heading>
            <Text fontSize="lg" maxW="600px">
              We're committed to providing you with the best shopping experience
              possible, backed by our core values and exceptional service.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8} w="full">
            {features.map((feature, index) => (
              <VStack
                key={index}
                gap={4}
                p={8}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="xl"
                textAlign="center"
                _hover={{
                  transform: "translateY(-4px)",
                  shadow: "xl",
                  borderColor: "blue.300",
                }}
                transition="all 0.3s ease">
                <Box p={4} bg="blue.50" color="blue.600" borderRadius="full">
                  <Icon as={feature.icon} boxSize={6} />
                </Box>

                <VStack gap={2}>
                  <Heading size="md">{feature.title}</Heading>
                  <Text fontSize="sm" lineHeight="1.6">
                    {feature.description}
                  </Text>
                </VStack>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};
