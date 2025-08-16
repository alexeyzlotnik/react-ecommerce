import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Image,
  Badge,
} from "@chakra-ui/react";

import AppButton from "../ui/AppButton";
import { useNavigate } from "react-router";

export const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <Box py={20} position="relative" overflow="hidden">
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="space-between"
          gap={8}>
          {/* Text Content */}
          <VStack align={{ base: "center", lg: "start" }} gap={6} flex={1}>
            <Badge
              variant="subtle"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm">
              🚀 Welcome to
            </Badge>

            <Heading
              size="2xl"
              textAlign={{ base: "center", lg: "left" }}
              lineHeight="1.2">
              Cool shop
            </Heading>

            <Text
              fontSize="xl"
              textAlign={{ base: "center", lg: "left" }}
              maxW="600px"
              opacity={0.9}>
              Your one-stop destination for cutting-edge technology, gadgets,
              and innovative products. Discover the future today with our
              curated collection of premium items.
            </Text>

            <HStack gap={4} pt={4}>
              <AppButton
                size="lg"
                variant="primary"
                onClick={() => navigate("/shop")}>
                Shop Now
              </AppButton>
              {/* <AppButton size="lg" variant="secondary">
                Learn More
              </AppButton> */}
            </HStack>
          </VStack>

          {/* Hero Image */}
          <Box flex={1} display={{ base: "none", lg: "block" }}>
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="TechMart Hero"
              borderRadius="xl"
              shadow="2xl"
              maxH="400px"
              objectFit="cover"
              w="full"
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
