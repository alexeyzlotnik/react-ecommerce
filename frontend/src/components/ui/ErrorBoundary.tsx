import React, { Component, ErrorInfo, ReactNode } from "react";
import { Box, Text, Button } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minH="400px"
          textAlign="center">
          <Box
            border="1px solid"
            borderColor="red.200"
            borderRadius="md"
            p={6}
            bg="red.50"
            maxW="md">
            <Text color="red.600" fontWeight="medium" mb={3}>
              Something went wrong
            </Text>
            <Text color="gray.600" mb={4} fontSize="sm">
              {this.state.error?.message || "An unexpected error occurred"}
            </Text>
            <Button
              onClick={() => window.location.reload()}
              colorScheme="blue"
              size="sm">
              Reload Page
            </Button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
