import { Button } from "@chakra-ui/react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  loadingText?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function AppButton({
  variant = "primary",
  size = "md",
  loading = false,
  loadingText = "Loading...",
  type = "button",
  onClick,
  children,
}: ButtonProps) {
  const buttonBackground = {
    primary: "orange.500",
    secondary: "orange.700",
    danger: "red.600",
  };

  const buttonTextColor = {
    primary: "white",
    secondary: "white",
    danger: "white",
  };

  const buttonBackgroundHover = {
    primary: "orange.600",
    secondary: "orange.800",
    danger: "red.700",
  };

  return (
    <Button
      size={size}
      backgroundColor={buttonBackground[variant]}
      color={buttonTextColor[variant]}
      onClick={onClick}
      loading={loading}
      loadingText={loadingText}
      type={type}
      _hover={{ bg: buttonBackgroundHover[variant] }}>
      {children}
    </Button>
  );
}
