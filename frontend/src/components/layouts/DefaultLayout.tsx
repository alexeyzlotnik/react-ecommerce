import { Container } from "@chakra-ui/react";
import Header from "../header/Header";
import Footer from "../Footer";
import { Outlet } from "react-router";

export default function DefaultLayout() {
  return (
    <Container className="container">
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
}
