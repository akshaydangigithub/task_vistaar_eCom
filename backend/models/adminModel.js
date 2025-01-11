import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

adminSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

adminSchema.methods.getjwtoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
