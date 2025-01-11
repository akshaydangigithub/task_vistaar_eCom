import Admin from "../models/adminModel.js";
import { errorResponse, successResponse } from "../middlewares/responses.js";
import sendToken from "../utils/SendToken.js";
import BlackListedModel from "../models/blackListedToken.js";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Order from "../models/orderModel.js";
import { initImageKit } from "../utils/imageKit.js";
import path from "path";
const imagekit = initImageKit();

export const adminSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    switch (true) {
      case !email:
        return errorResponse(res, "Email is required", 400);
      case !password:
        return errorResponse(res, "Password is required", 400);
    }

    const existAdmin = await Admin.findOne({ email });
    if (existAdmin) {
      return errorResponse(res, "Email already exist", 400);
    }

    const admin = await new Admin({ email, password }).save();

    if (!admin) {
      return errorResponse(res, "Admin not created", 400);
    }

    sendToken(admin, 201, res);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500, error);
  }
};

export const adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    switch (true) {
      case !email:
        return errorResponse(res, "Email is required", 400);
      case !password:
        return errorResponse(res, "Password is required", 400);
    }

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return errorResponse(res, "Admin not found with this email", 400);
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 400);
    }

    sendToken(admin, 200, res);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500, error);
  }
};

export const adminLogout = async (req, res) => {
  try {
    req.session.destroy();
    await BlackListedModel.create({ token: req.token });

    return successResponse(res, "Logout successfully", 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500, error);
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return errorResponse(res, "Admin not found", 404);
    }

    return successResponse(res, "Profile fetched successfully", admin, 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500, error);
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const file = req.files?.image;

    switch (true) {
      case !name:
        return errorResponse(res, "Name is required", 400);
      case !price:
        return errorResponse(res, "Price is required", 400);
      case !description:
        return errorResponse(res, "Description is required", 400);
      case !category:
        return errorResponse(res, "Category is required", 400);
      case !file:
        return errorResponse(res, "Image is required", 400);
    }

    let existCategory = await Category.findOne({ name: category });

    if (!existCategory) {
      existCategory = await new Category({ name: category }).save();

      if (!existCategory) {
        return errorResponse(res, "Category not created", 400);
      }
    }

    const fileName = `vistaar-${Date.now()}${path.extname(file.name)}`;
    const result = await imagekit.upload({
      file: file.data,
      fileName,
    });

    const product = await new Product({
      name,
      price,
      description,
      category: existCategory._id,
      image: {
        fileId: result.fileId,
        url: result.url,
      },
    });

    await product.save();

    return successResponse(res, "Product created successfully", product, 201);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500, error);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    return successResponse(res, "Product fetched successfully", product, 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500, error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");

    if (!products) {
      return errorResponse(res, "Products not found", 404);
    }

    return successResponse(res, "Fetched Succefully", products, 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500, error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    return successResponse(res, "Product deleted successfully", 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500, error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    switch (true) {
      case !name:
        return errorResponse(res, "Name is required", 400);
      case !price:
        return errorResponse(res, "Price is required", 400);
      case !description:
        return errorResponse(res, "Description is required", 400);
      case !category:
        return errorResponse(res, "Category is required", 400);
    }

    let existCategory = await Category.findOne({ name: category });

    if (!existCategory) {
      existCategory = await new Category({ name: category }).save();

      if (!existCategory) {
        return errorResponse(res, "Category not created", 400);
      }
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.category = existCategory._id;

    await product.save();

    return successResponse(res, "Product updated successfully", 200);
  } catch (error) {
    console.log(error);

    return errorResponse(res, "Internal server error", 500, error);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("product");

    if (!orders) {
      return errorResponse(res, "Orders not found", 404);
    }

    return successResponse(res, "Orders fetched successfully", orders, 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500, error);
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { status } = req.body;

    switch (true) {
      case !status:
        return errorResponse(res, "Status is required", 400);
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return errorResponse(res, "Order not found", 404);
    }

    order.status = status;

    await order.save();

    return successResponse(res, "Order updated successfully", 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500, error);
  }
};
