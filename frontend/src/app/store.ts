import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../components/features/cart/cartSlice";
import { RootState } from "../lib/definitions";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = RootState;

export default store;
