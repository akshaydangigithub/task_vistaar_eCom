import dotenv from "dotenv";
dotenv.config();

import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}#/login`,
  }),
  (req, res) => {
    const token = req.user.getjwtoken();
    const option = {
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
      httpOnly: true,
    };

    res.cookie("token", token, option);

    res.redirect(`${process.env.FRONTEND_URL}#/user/dashboard`);
  }
);

export default router;
