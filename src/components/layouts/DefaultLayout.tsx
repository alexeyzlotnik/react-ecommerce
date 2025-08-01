import { Container } from "@chakra-ui/react";
import Header from "../header/Header";
import Footer from "../Footer";

export default function DefaultLayout({ children }) {
  return (
    <Container className="container">
      <Header />
      {children}
      <Footer />
    </Container>
  );
}
