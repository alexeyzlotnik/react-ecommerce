import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        brand: action.payload.brand,
        price: action.payload.price,
      });
    },
    remove: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    clear: state => {
      return (state = []);
    },
  },
});

export const { add, remove, clear } = cartSlice.actions;

export const cartCount = state => state.cart.length;

export default cartSlice.reducer;
