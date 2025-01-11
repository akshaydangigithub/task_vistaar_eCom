import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  cart: [],
  cartLength: 0,
  orderProducts: [],
  isUserAuthenticate: false,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    adduser: (state, action) => {
      state.user = action.payload;
      state.isUserAuthenticate = true;
    },
    addcart: (state, action) => {
      state.cart.push(action.payload);
    },
    addOrderProducts: (state, action) => {
      state.orderProducts = action.payload;
    },
    removeuser: (state) => {
      state.user = null;
      state.isUserAuthenticate = false;
    },
    addcartLength: (state, action) => {
      state.cartLength = action.payload;
    },
  },
});

export const { adduser, addcart, addOrderProducts, removeuser, addcartLength } =
  userReducer.actions;

export default userReducer.reducer;
