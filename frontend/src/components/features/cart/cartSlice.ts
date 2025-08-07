import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct } from "@/lib/definitions";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartProduct[],
  reducers: {
    add: (state, action: PayloadAction<CartProduct>) => {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        category: action.payload.category,
        price: action.payload.price,
      });
    },
    remove: (state, action: PayloadAction<number>) => {
      return state.filter((item: CartProduct) => item.id !== action.payload);
    },
    clear: () => {
      return [];
    },
  },
});

export const { add, remove, clear } = cartSlice.actions;

export const cartCount = (state: { cart: CartProduct[] }) => state.cart.length;

export default cartSlice.reducer;
