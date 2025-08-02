import { useSelector } from "react-redux";
import { cartCount } from "./cartSlice";
import { LuShoppingBasket } from "react-icons/lu";
import CartPanel from "./CartPanel";

import { Button } from "@chakra-ui/react";
import { useState } from "react";

function Cart() {
  const count = useSelector(cartCount);
  const cartItems = useSelector(state => state.cart);

  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Button variant="subtle" onClick={() => setCartOpen(true)}>
        <LuShoppingBasket />
        {count}
      </Button>

      <CartPanel
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}

export default Cart;
