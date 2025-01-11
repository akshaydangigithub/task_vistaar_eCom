import User from "../models/userModel.js";
import { errorResponse, successResponse } from "../middlewares/responses.js";
import sendToken from "../utils/SendToken.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import BlackListedModel from "../models/blackListedToken.js";

export const userSignup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    switch (true) {
      case !email:
        return errorResponse(res, "Email is required", 400);
      case !password:
        return errorResponse(res, "Password is required", 400);
      case !name:
        return errorResponse(res, "Name is required", 400);
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return errorResponse(res, "Email already exist", 400);
    }

    const user = await new User({ email, password, name }).save();

    if (!user) {
      return errorResponse(res, "User not created", 400);
    }

    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);

    return errorResponse(res, "Internal server error", 500, error);
  }
};

export const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    switch (true) {
      case !email:
        return errorResponse(res, "Email is required", 400);
      case !password:
        return errorResponse(res, "Password is required", 400);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return errorResponse(res, "User not found with this email", 400);
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 400);
    }

    sendToken(user, 200, res);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500, error);
  }
};

export const userLogout = async (req, res) => {
  try {
    req.session.destroy();
    await BlackListedModel.create({ token: req.token });
    return successResponse(res, "Logout successfully", 200);
  } catch (error) {
    console.log(error);

    return errorResponse(res, "Internal server error", 500, error);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("orders");
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    return successResponse(res, "Profile fetched succesfully", user, 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500, error);
  }
};

export const createOrder = async (req, res) => {
  try {
    const { quantity, totalPrice } = req.body;
    const { productId } = req.params;
    const user = req.user._id;

    if (!quantity) {
      return errorResponse(res, "Quantity is required", 400);
    }

    const order = await Order.create({
      user,
      product: productId,
      quantity,
      totalPrice,
    });
    if (!order) {
      return errorResponse(res, "Order not created", 400);
    }

    await User.findByIdAndUpdate(user, { $push: { orders: order._id } });

    return successResponse(res, "Order successfully", order, 201);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500, error);
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("product")
      .populate("user");
    if (!orders) {
      return errorResponse(res, "Orders not found", 404);
    }
    return successResponse(res, "All order fetched", orders, 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500, error);
  }
};
