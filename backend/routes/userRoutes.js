import express from "express";
import {
  userSignup,
  userSignin,
  userLogout,
  getUserProfile,
  createOrder,
  getUserOrders,
} from "../controller/userController.js";
import { isUser } from "../middlewares/isUser.js";

const router = express.Router();

router.post("/signup", userSignup);

router.post("/signin", userSignin);

router.post("/logout", isUser, userLogout);

router.get("/profile", isUser, getUserProfile);

router.post("/order/create/:productId", isUser, createOrder);

router.get("/getUserOrders", isUser, getUserOrders);

export default router;
