import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiHandbagLine } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncaddOrderProducts,
  asyncgetCartLength,
} from "../store/Actions/userAction";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const { isAdminAuthenticate } = useSelector((state) => state.admin);
  const { isUserAuthenticate, cartLength } = useSelector((state) => state.user);

  const sliderRef = useRef(null);
  const cartRef = useRef(null);

  const handleAddOrder = (product) => {
    if (!isUserAuthenticate) {
      return navigate("/login");
    }

    const newProduct = {
      quantity: product.quantity,
      totalPrice: product.totalPrice,
    };
    dispatch(asyncaddOrderProducts(product._id, newProduct));
  };

  //  when user click outside the cart slider, it will close
  window.addEventListener("click", (e) => {
    if (
      sliderRef.current &&
      !sliderRef.current.contains(e.target) &&
      !cartRef.current.contains(e.target)
    ) {
      setShowCart(false);
    }
  });

  useEffect(() => {
    dispatch(asyncgetCartLength());
  }, []);

  return (
    <nav className="flex items-center fixed w-full top-0 left-0 bg-white z-10 border-b-[1px] justify-between py-4 px-4 md:px-20">
      <div className="flex items-center gap-4 md:gap-16">
        <Link to="/">
          <h1 className="text-lg md:text-xl font-bold">Vistaar</h1>
        </Link>
        <div className="flex gap-4 md:gap-16">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        {!isAdminAuthenticate && (
          <div
            ref={cartRef}
            onClick={() => setShowCart(true)}
            className="relative cursor-pointer"
          >
            <RiHandbagLine className="text-lg md:text-xl" />
            <div className="h-4 w-4 md:h-5 md:w-5 text-white flex items-center justify-center bg-black absolute rounded-full -top-2 -right-2">
              {cartLength}
            </div>
          </div>
        )}

        <button
          onClick={() =>
            navigate(
              isAdminAuthenticate
                ? "/admin/dashboard"
                : isUserAuthenticate
                ? "/user/dashboard"
                : "/login"
            )
          }
          className="bg-black text-white py-1 px-2 md:py-1 md:px-3 rounded-lg"
        >
          {isAdminAuthenticate || isUserAuthenticate ? "Dashboard" : "Login"}
        </button>
      </div>

      {/* slider of cart */}
      <div
        ref={sliderRef}
        className={`h-screen z-30 transition-all duration-300 w-80 md:w-96 bg-white shadow-xl absolute top-0 right-0 ${
          showCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top */}
        <div className="bg-gray-100 p-4 md:p-5 flex items-center justify-between w-full">
          <p>Shopping Cart</p>
          <div
            onClick={() => setShowCart(false)}
            className="h-8 cursor-pointer w-8 rounded-full bg-black flex items-center justify-center text-white"
          >
            <IoIosClose className="text-2xl md:text-3xl" />
          </div>
        </div>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((product) => (
            <div
              key={product._id}
              className="border-b-[1px] flex flex-col px-4 md:px-5 pb-2 justify-center"
            >
              <div className="flex relative items-center gap-4 md:gap-10 mt-5">
                <img height={70} width={70} src={product.image.url} alt="" />
                <div>
                  <h1 className="font-semibold hover:text-red-600 transition-all duration-200 cursor-pointer">
                    {product.name}
                  </h1>
                  <p>
                    ₹ {product.price} x {product.quantity} = ₹{" "}
                    {product.totalPrice}
                  </p>
                </div>
              </div>

              {/* order button */}
              <button
                onClick={() => {
                  handleAddOrder(product);
                }}
                className="bg-black flex mt-3 p-2.5 items-center justify-center text-white"
              >
                Order Now
              </button>
            </div>
          ))
        ) : (
          <div className="w-full h-full p-5 flex items-center justify-center gap-3">
            <h1>Your cart is empty</h1>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
