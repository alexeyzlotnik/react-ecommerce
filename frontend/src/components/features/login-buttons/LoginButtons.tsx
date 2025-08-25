import AppButton from "../../ui/AppButton";
import { HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router";

interface LoginProps {
  onItemClick: () => void;
}

export default function LoginButtons({ onItemClick }: LoginProps) {
  const navigate = useNavigate();

  const handleBtnClick = (path: string) => {
    if (onItemClick) {
      onItemClick();
    }
    navigate(path);
  };

  return (
    <HStack className="login-buttons">
      <AppButton variant="primary" onClick={() => handleBtnClick("login")}>
        Login
      </AppButton>
      <AppButton variant="secondary" onClick={() => handleBtnClick("register")}>
        Signup
      </AppButton>
    </HStack>
  );
}
