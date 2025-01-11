import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncaddCart, asyncgetCartLength } from "../store/Actions/userAction";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const dispatch = useDispatch();
  const state = location.state;
  const { isAdminAuthenticate } = useSelector((state) => state.admin);

  const handleAddToCart = (product) => {
    const cartItem = {
      ...product,
      quantity: Number(quantity),
      totalPrice: Number(quantity) * product.price,
    };
    dispatch(asyncaddCart(cartItem));
    dispatch(asyncgetCartLength());
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen mt-20 px-20 w-full">
        <h1 className="text-2xl font-semibold">Product Details</h1>

        {/* landing */}
        <div className="h-auto py-20 w-full my-10 bg-[#EEEEEE] grid grid-cols-2">
          <div className="relative flex justify-center">
            <img
              className={`w-[65%] rounded-md h-[25rem] object-cover`}
              src={state?.image.url}
              alt=""
            />
          </div>
          <div className="h-full w-full flex flex-col">
            <h1 className="text-3xl font-bold">{state?.name}</h1>
            <p className="mt-5">
              <b>Category:</b> {state?.category.name}
            </p>
            <p className="mt-3">
              <b>Price:</b> ₹ {state?.price}
            </p>
            <p className="mt-3 w-3/4">
              <b>Description:</b> {state?.description}
            </p>

            {!isAdminAuthenticate && (
              <>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter product quantity"
                  className="w-[200px] border-[1px] outline-none py-2 px-2 mt-10 border-black/50 rounded-md text-black bg-transparent"
                />
                <button
                  onClick={() => handleAddToCart(state)}
                  className="py-4 rounded-md px-16 mt-10 transition-all divide-gray-200 bg-black text-white border w-fit hover:bg-black/70"
                >
                  Add To Cart
                </button>
              </>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default ProductDetails;
