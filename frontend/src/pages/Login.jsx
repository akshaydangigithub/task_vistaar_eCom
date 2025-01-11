import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { asyncsigninuser } from "../store/Actions/userAction";
import { asyncsigninadmin } from "../store/Actions/adminAction";
import { BaseURL } from "../utils/axios";

const Login = () => {
  const [formData, setFormData] = useState({
    role: "user",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUserAuthenticate } = useSelector((state) => state.user);
  const { isAdminAuthenticate } = useSelector((state) => state.admin);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isUserAuthenticate) {
      navigate("/user/dashboard");
    }
  }, [isUserAuthenticate, navigate]);

  useEffect(() => {
    if (isAdminAuthenticate) {
      navigate("/admin/dashboard");
    }
  }, [isAdminAuthenticate, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if(formData.role === "user"){
      dispatch(asyncsigninuser(formData));
    }
    if(formData.role === "admin"){
      dispatch(asyncsigninadmin(formData));
    }
  };

  return (
    <>
      <Navbar />

      <div className="h-screen mb-10 flex items-center justify-center flex-col px-4 sm:px-6 lg:px-8">
        <h1 className="text-center font-bold text-lg mt-20">Welcome Back</h1>

        <div className="flex flex-col items-center mt-5 bg-gray-200 px-20 rounded-md py-3">
          <h3 className="text-red-500">
            Use below credentials to login as admin
          </h3>
          <p>
            Email: <b>admin@gmail.com</b>
          </p>
          <p>
            Password: <b>admin123</b>
          </p>
        </div>

        <a href={`${BaseURL}auth/google`}>
          <button
            type="button"
            className="flex items-center mt-5 border border-gray-300 bg-white text-gray-900 rounded-lg py-2.5 px-10 gap-4 hover:bg-gray-100 transition-all"
          >
            <FcGoogle className="text-2xl" /> Continue with Google
          </button>
        </a>

        <form
          onSubmit={handleLogin}
          className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl shadow-sm shadow-black rounded-xl py-3 px-6 my-10"
        >
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Select your role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  mb-5   "
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     "
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     "
              required
            />
          </div>

          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500"
            >
              Sign up
            </Link>
          </p>

          <button
            type="submit"
            className="mt-5 bg-black py-2 px-5 rounded-lg text-white"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <Footer />
      </div>
    </>
  );
};

export default Login;
