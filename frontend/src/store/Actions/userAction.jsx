import axios from "../../utils/axios";
import { toast } from "react-hot-toast";
import {
  adduser,
  removeuser,
  addOrderProducts,
  addcartLength,
} from "../Reducers/userReducer";

export const asynccurrentuser = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("api/user/profile");
    if (data.success) {
      dispatch(adduser(data?.data));
    }
  } catch (error) {
    // console.log(error);
  }
};

export const asyncsignupuser = (newuser) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("api/user/signup", newuser);
    if (data.success) {
      dispatch(adduser(data?.data));
      toast.success(data.message);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const asyncsigninuser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("api/user/signin", user);

    if (data.success) {
      dispatch(adduser(data?.data));
      toast.success("Login Success");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const asyncsignoutuser = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("api/user/logout");

    console.log(data);

    dispatch(removeuser());
    if (data.success) {
      toast.success(data.message);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const asyncgetCartLength = () => async (dispatch, getState) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  dispatch(addcartLength(cartItems.length));
};

export const asyncaddCart = (product) => async () => {
  // set product in local storage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existItem = cartItems.find((item) => item._id === product._id);

  if (existItem) {
    const updatedCart = cartItems.map((item) =>
      item._id === existItem._id ? product : item
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    toast.success("Product updated in cart");
  } else {
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    toast.success("Product added to cart");
  }
};

export const asyncgetOrderProducts = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("api/user/getUserOrders");

    if (data.success) {
      dispatch(addOrderProducts(data?.data));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const asyncaddOrderProducts =
  (id, product) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post(`api/user/order/create/${id}`, product);

      if (data.success) {
        dispatch(asyncgetOrderProducts());
        toast.success(data.message);

        // remove product from cart
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const updatedCart = cartItems.filter((item) => item._id !== id);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
