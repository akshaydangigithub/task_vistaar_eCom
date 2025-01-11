import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import BlackListedToken from "../models/blackListedToken.js";

export const isAdmin = async (req, res, next) => {
  try {
    // Get token from header or cookie
    const token = req.cookies.token;

    if (!token) {
      req.session.destroy();
      return res.status(401).json({ message: "You are not authorized" });
    }

    // Check if token is blacklisted
    const blacklistedToken = await BlackListedToken.findOne({ token });
    if (blacklistedToken) {
      req.session.destroy();
      return res.status(401).json({ message: "You are not authorized" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      req.session.destroy();
      return res.status(401).json({ message: "You are not authorized" });
    }
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Authorization failed !",
      });
    } else {
      (req.admin = admin), (req.token = token);

      next();
    }
  } catch (error) {
    console.log(error);

    return res.status(401).json({ message: "You are not authorized" });
  }
};
