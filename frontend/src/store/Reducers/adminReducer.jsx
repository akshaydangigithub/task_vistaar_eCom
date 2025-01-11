import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  products: [],
  orders: [],
  singleProduct: null,
  isAdminAuthenticate: false,
};

export const adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addadmin: (state, action) => {
      state.admin = action.payload;
      state.isAdminAuthenticate = true;
    },
    addproducts: (state, action) => {
      state.products = action.payload;
    },
    addorders: (state, action) => {
      state.orders = action.payload;
    },
    removeadmin: (state) => {
      state.admin = null;
      state.isAdminAuthenticate = false;
    },
    singleproduct: (state, action) => {
      state.singleProduct = action.payload;
    },
    removesingleproduct: (state) => {
      state.singleProduct = null;
    },
  },
});

export const {
  addadmin,
  addproducts,
  removeadmin,
  singleproduct,
  removesingleproduct,
  addorders,
} = adminReducer.actions;

export default adminReducer.reducer;
