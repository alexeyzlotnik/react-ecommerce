import { useSelector, useDispatch } from "react-redux";
import { cartCount, add, remove, clear } from "./cartSlice";
import { LuArrowRightFromLine, LuShoppingCart } from "react-icons/lu";

import { ActionBar, Button, Checkbox, Portal } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuShare, LuTrash2 } from "react-icons/lu";

function Cart() {
  const count = useSelector(cartCount);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(count > 0);

  useEffect(() => {
    count > 0 ? setChecked(true) : setChecked(false);
  }, [count]);

  const handleAddItem = () => {
    dispatch(add("test-product-" + Date.now()));
  };

  const handleClearCart = () => {
    dispatch(clear());
  };

  return (
    <>
      {/* <Checkbox.Root onCheckedChange={(e) => setChecked(!!e.checked)}>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Show Action bar</Checkbox.Label>
      </Checkbox.Root> */}
      <ActionBar.Root open={checked}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                {count} selected
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button
                variant="subtle"
                backgroundColor={"red.emphasized"}
                onClick={handleClearCart}
                size="sm">
                Clear
                <LuTrash2 />
              </Button>
              <Button
                variant="subtle"
                backgroundColor={"green.emphasized"}
                size="sm">
                Proceed to checkout
                <LuArrowRightFromLine />
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  );
}

export default Cart;
