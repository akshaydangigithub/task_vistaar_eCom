import React from "react";
import Navbar from "../components/Navbar";
import ProductCards from "../components/ProductCards";
import Footer from "../components/Footer";

const Products = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen mt-20 md:px-20 px-4 w-full">
      <h1 className="text-2xl font-semibold">Products</h1>
      <ProductCards />
      <Footer/>
      </main>

    </>
  );
};

export default Products;
