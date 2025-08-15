import { Container } from "@chakra-ui/react";
import Header from "../header/Header";
import Footer from "../Footer";
import { Outlet } from "react-router";
import ErrorBoundary from "../ui/ErrorBoundary";

export default function DefaultLayout() {
  return (
    <Container className="container">
      <Header />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <Footer />
    </Container>
  );
}
