import axios from "../../utils/axios";
import { toast } from "react-hot-toast";
import {
  addadmin,
  removeadmin,
  addproducts,
  singleproduct,
  removesingleproduct,
  addorders,
} from "../Reducers/adminReducer";

export const asynccurrentadmin = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("api/admin/profile");

    if (data.success) {
      dispatch(addadmin(data.data));
    }
  } catch (error) {
    // console.log(error);
  }
};

export const asyncsigninadmin = (admin) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("api/admin/signin", admin);
    console.log(data);

    if (data.success) {
      dispatch(addadmin(data));
      toast.success("Login Success");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const asyncsignoutadmin = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("api/admin/logout");

    console.log(data);

    dispatch(removeadmin());
    if (data.success) {
      toast.success(data.message);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const asyncaddproducts = (product) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("api/admin/product/create", product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data.success) {
      dispatch(addproducts(data.data));
      toast.success(data.message);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const asyncgetproducts = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("api/admin/products");

    if (data.success) {
      dispatch(addproducts(data.data));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const asyncdeleteproduct = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.delete(`api/admin/product/${id}`);

    if (data.success) {
      dispatch(addproducts(data.data));
      toast.success(data.message);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const asyncgetsingleproduct = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`api/admin/product/${id}`);

    if (data.success) {
      dispatch(singleproduct(data.data));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const asyncupdateproduct =
  (id, product) => async (dispatch, getState) => {
    try {
      const { data } = await axios.put(`api/admin/product/${id}`, product);

      if (data.success) {
        dispatch(removesingleproduct());
        asyncgetproducts();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

export const asyncremovesingleproduct = () => async (dispatch, getState) => {
  dispatch(removesingleproduct());
};

export const asyncgetorders = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("api/admin/getOrders");

    if (data.success) {
      dispatch(addorders(data.data));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const asyncupdateorder = (id, status) => async (dispatch, getState) => {
  try {
    const { data } = await axios.put(`api/admin/order/${id}`, { status });

    if (data.success) {
      asyncgetorders();
      toast.success(data.message);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
