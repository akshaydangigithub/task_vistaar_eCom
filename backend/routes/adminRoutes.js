import express from "express";
import {
  adminSignup,
  adminSignin,
  adminLogout,
  createProduct,
  getAdminProfile,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getOrders,
  updateOrder,
} from "../controller/adminController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/signup", adminSignup);

router.post("/signin", adminSignin);

router.post("/logout", isAdmin, adminLogout);

router.get("/profile", isAdmin, getAdminProfile);

router.post("/product/create", isAdmin, createProduct);

router.get("/product/:id", getProduct);

router.get("/products", getProducts);

router.delete("/product/:id", isAdmin, deleteProduct);

router.put("/product/:id", isAdmin, updateProduct);

router.get("/getOrders", isAdmin, getOrders);

router.put("/order/:id", isAdmin, updateOrder);

export default router;
