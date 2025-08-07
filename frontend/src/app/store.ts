import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../components/features/cart/cartSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
