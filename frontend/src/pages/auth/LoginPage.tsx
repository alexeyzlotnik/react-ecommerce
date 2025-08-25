import { Card } from "@chakra-ui/react";
import { Link } from "react-router";
import LoginForm from "../../components/features/auth/login-form";

export default function LoginPage() {
  return (
    <>
      <Card.Root width={{ base: "100%", md: "500px" }} className="!mx-auto">
        <Card.Body gap="2">
          <Card.Title>Login to your account</Card.Title>
          <LoginForm />
        </Card.Body>
        <Card.Footer justifyContent="center" className="!text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="!underline">
            Create one
          </Link>
        </Card.Footer>
      </Card.Root>
    </>
  );
}
