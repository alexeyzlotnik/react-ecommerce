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
    primary: "green.emphasized",
    secondary: "green.100",
    danger: "red.muted",
  };

  const buttonTextColor = {
    primary: "white",
    secondary: "green",
    danger: "white",
  };

  return (
    <Button
      size={size}
      backgroundColor={buttonBackground[variant]}
      color={buttonTextColor[variant]}
      onClick={onClick}
      loading={loading}
      loadingText={loadingText}
      type={type}>
      {children}
    </Button>
  );
}
