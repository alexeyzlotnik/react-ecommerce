import { useSelector } from "react-redux";
import { cartCount } from "./cartSlice";
import { LuShoppingBasket } from "react-icons/lu";
import CartPanel from "./CartPanel";

import { Button, Badge } from "@chakra-ui/react";
import { useState } from "react";

function Cart() {
  const count = useSelector(cartCount);

  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Button
        variant="subtle"
        onClick={() => setCartOpen(true)}
        backgroundColor={count > 0 ? "orange.500" : undefined}
        size={{ base: "sm", md: "md" }}
        minW={{ base: "40px", md: "44px" }}
        minH={{ base: "40px", md: "44px" }}
        position="relative"
        p={{ base: 2, md: 3 }}
        borderRadius="md"
        _hover={{
          backgroundColor: count > 0 ? "orange.600" : "chakra-subtle-bg",
        }}
        transition="all 0.2s">
        <LuShoppingBasket size={20} />

        {/* Cart count badge */}
        {count > 0 && (
          <Badge
            position="absolute"
            top="-8px"
            right="-8px"
            colorScheme="red"
            borderRadius="full"
            fontSize={{ base: "xs", md: "sm" }}
            minW={{ base: "20px", md: "22px" }}
            h={{ base: "20px", md: "22px" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="bold">
            {count > 99 ? "99+" : count}
          </Badge>
        )}
      </Button>

      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default Cart;
