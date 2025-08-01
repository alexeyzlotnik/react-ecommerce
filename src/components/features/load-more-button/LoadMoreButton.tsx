// import { Button } from "@chakra-ui/react";
import { Grid, GridItem, Box, AbsoluteCenter } from "@chakra-ui/react";
import AppButton from "../../ui/AppButton";

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
          <AppButton
            variant="primary"
            onClick={onClick}
            loading={loading}
            loadingText="Loading...">
            {children ? children : "Load more"}
          </AppButton>
        </AbsoluteCenter>
      </Box>
    </>
  );
}

export default LoadMoreButton;
