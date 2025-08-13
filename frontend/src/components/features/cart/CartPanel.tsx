import { Drawer, Portal, CloseButton } from "@chakra-ui/react";
import AppButton from "../../ui/AppButton";
import { LuArrowRightFromLine, LuTrash } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { remove, clear } from "./cartSlice";
import { Table } from "@chakra-ui/react";
import { RootState } from "@/lib/definitions";

interface CartPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function CartPanel({ open = false, onClose }: CartPanelProps) {
  const items = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const ProductsList = () => {
    return (
      <>
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <h2>Products:</h2>
            <Table.Root size={"md"}>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader></Table.ColumnHeader>
                  <Table.ColumnHeader>Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Price</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {items.map((item, index) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
                    <Table.Cell textAlign="end">
                      <AppButton
                        variant="danger"
                        onClick={() => dispatch(remove(item.id))}>
                        Remove
                      </AppButton>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </>
        )}
      </>
    );
  };

  const FooterButtons = () => {
    return (
      <>
        {items.length === 0 ? null : (
          <>
            <AppButton variant="danger" onClick={() => dispatch(clear())}>
              Clear cart <LuTrash />
            </AppButton>
            <AppButton>
              Proceed to checkout <LuArrowRightFromLine />
            </AppButton>
          </>
        )}
      </>
    );
  };

  return (
    <Drawer.Root open={open} onOpenChange={() => onClose()} size={"md"}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Cart</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <ProductsList />
            </Drawer.Body>
            <Drawer.Footer>
              <FooterButtons />
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
