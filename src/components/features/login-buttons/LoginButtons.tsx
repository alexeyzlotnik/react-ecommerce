import AppButton from "../../ui/AppButton";
import { HStack } from "@chakra-ui/react";

export default function LoginButtons() {
  return (
    <HStack className="login-buttons">
      <AppButton variant="primary" onClick={() => {}}>
        Login
      </AppButton>
      <AppButton variant="secondary" onClick={() => {}}>
        Signup
      </AppButton>
    </HStack>
  );
}
