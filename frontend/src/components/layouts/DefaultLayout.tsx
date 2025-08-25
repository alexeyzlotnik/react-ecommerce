import { Container, Box } from "@chakra-ui/react";
import Header from "../header/Header";
import Footer from "../Footer";
import { Outlet } from "react-router";
import ErrorBoundary from "../ui/ErrorBoundary";

export default function DefaultLayout() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box
        as="main"
        flex="1"
        pt={{ base: "80px", md: "100px" }}
        pb={{ base: 8, md: 12 }}>
        <Container
          maxW="1200px"
          px={{ base: 4, sm: 6, md: 8 }}
          className="container">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
