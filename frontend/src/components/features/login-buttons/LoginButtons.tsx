import AppButton from "../../ui/AppButton";
import { HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export default function LoginButtons() {
  const navigate = useNavigate();

  return (
    <HStack className="login-buttons">
      <AppButton variant="primary" onClick={() => navigate("login")}>
        Login
      </AppButton>
      <AppButton variant="secondary" onClick={() => navigate("register")}>
        Signup
      </AppButton>
    </HStack>
  );
}
