import { Card } from "@chakra-ui/react";
import { Link } from "react-router";
import RegisterForm from "../../components/features/auth/register-form";

export default function RegisterPage() {
  return (
    <>
      <Card.Root width={{ base: "100%", md: "500px" }} className="!mx-auto">
        <Card.Body gap="2">
          <Card.Title>Create your account</Card.Title>
          <RegisterForm />
        </Card.Body>
        <Card.Footer justifyContent="center" className="!text-sm">
          Already have an account?{" "}
          <Link to="/login" className="!underline">
            Log in
          </Link>
        </Card.Footer>
      </Card.Root>
    </>
  );
}
