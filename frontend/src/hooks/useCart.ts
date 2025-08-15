import { Product, CartProduct, RootState } from "../lib/definitions";
import { useSelector, useDispatch } from "react-redux";
import { add, remove, clear } from "../components/features/cart/cartSlice";

export const useCart = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const formatProductForCart = (product: Product): CartProduct | undefined => {
    if (!product) return;

    const { id, name, category, price } = product;

    return {
      id: id,
      name: name,
      category: category,
      price: price,
    };
  };

  const isProductInCart = (productId: number): boolean => {
    return cartItems.filter(item => item.id === productId).length > 0;
  };

  const addToCart = (product: Product): void => {
    if (isProductInCart(product.id)) {
      dispatch(remove(product.id));
    } else {
      const cartProduct = formatProductForCart(product);
      if (cartProduct) {
        dispatch(add(cartProduct));
      }
    }
  };

  const removeFromCart = (productId: number): void => {
    dispatch(remove(productId));
  };

  const clearCart = (): void => {
    dispatch(clear());
  };

  return {
    cartItems,
    isProductInCart,
    addToCart,
    removeFromCart,
    clearCart,
  };
};
