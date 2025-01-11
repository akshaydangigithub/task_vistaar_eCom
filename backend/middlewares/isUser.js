import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import BlackListedToken from "../models/blackListedToken.js";

export const isUser = async (req, res, next) => {
  try {
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
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Authorization failed !",
      });
    } else {
      (req.user = user), (req.token = token);

      next();
    }
  } catch (error) {
    return res.status(401).json({ message: "You are not authorized" });
  }
};
