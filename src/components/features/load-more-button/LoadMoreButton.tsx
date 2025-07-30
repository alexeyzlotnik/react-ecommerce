// import { Button } from "@chakra-ui/react";
import { Button, Grid, GridItem, Box, AbsoluteCenter } from "@chakra-ui/react";

function LoadMoreButton({
  loading = false,
  canLoadMore = true,
  onClick,
  children,
}: {
  loading?: boolean;
  canLoadMore?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (!canLoadMore) return null;

  return (
    <>
      <Box position="relative" h="100px">
        <AbsoluteCenter>
          <Button
            backgroundColor="green.emphasized"
            color="white"
            onClick={onClick}
            loading={loading}
            loadingText="Loading...">
            {children ? children : "Load more"}
          </Button>
        </AbsoluteCenter>
      </Box>
    </>
  );
}

export default LoadMoreButton;
