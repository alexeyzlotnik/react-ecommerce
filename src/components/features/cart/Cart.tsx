import { useSelector, useDispatch } from "react-redux";
import { cartCount, add, remove, clear } from "./cartSlice";
import { LuShoppingBasket } from "react-icons/lu";
import CartPanel from "./CartPanel";

import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Cart() {
  const count = useSelector(cartCount);
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   count > 0 ? setChecked(true) : setChecked(false);
  // }, [count]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleClearCart = () => {
    dispatch(clear());
  };

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
