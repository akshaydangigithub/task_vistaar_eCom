import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { asyncsignupuser } from "../store/Actions/userAction";
import { BaseURL } from "../utils/axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await dispatch(asyncsignupuser(formData));
      navigate("/login");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />

      <div className="h-screen flex items-center justify-center flex-col px-4 sm:px-6 lg:px-8">
        <h1 className="text-center font-bold text-lg mt-20">
          Register Your Account Now
        </h1>

        {/* button for register with email */}

        <a href={`${BaseURL}auth/google`}>
          <button
            type="button"
            className="flex items-center mt-5 border border-gray-300 bg-white text-gray-900 rounded-lg py-2.5 px-10 gap-4 hover:bg-gray-100 transition-all"
          >
            <FcGoogle className="text-2xl" /> Continue with Google
          </button>
        </a>

        <form
          onSubmit={handleRegister}
          className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl shadow-sm shadow-black rounded-xl py-3 px-6 my-10"
        >
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     "
              placeholder="John Doe"
            />
          </div>
          <div className="mb-5">
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
              placeholder="name@example.com"
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
            />
          </div>

          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500"
            >
              Login
            </Link>
          </p>

          <button
            type="submit"
            className="mt-5 bg-black py-2 px-5 rounded-lg text-white"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <Footer />
      </div>
    </>
  );
};

export default Register;
