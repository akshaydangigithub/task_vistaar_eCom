import React, { useEffect, useState } from "react";
import { RiHandbagLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncgetproducts } from "../store/Actions/adminAction";

const ProductCards = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncgetproducts());
  }, []);

  // get unique categories

  useEffect(() => {
    if (products && products.length > 0) {
      const categories = products.map((product) => product.category.name);
      setCategories([...new Set(categories)]);
      // add key all to categories in the beginning
      setCategories((prev) => ["all", ...prev]);
    }
  }, [products]);

  // filter products based on category
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category.name === activeCategory
      );
      setFilteredProducts(filtered);
    }
  }, [activeCategory, products]);

  return (
    <>
      {/* Categories */}
      <div className=" mt-10">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className={`inline-block rounded-md me-3 md:mt-0 mt-3 border py-2 px-5 cursor-pointer transition-all duration-200 hover:bg-black hover:text-white uppercase ${
              activeCategory === category
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </div>
        ))}

        {/* card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10 gap-6">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product, idx) => (
              <div
                key={product._id}
                className="w-full rounded-md overflow-hidden group relative border"
              >
                <img
                  onClick={() =>
                    navigate(`/product/${product._id}`, { state: product })
                  }
                  className="cursor-pointer h-48 sm:h-60 md:h-72 w-full object-cover"
                  src={product.image.url}
                  alt=""
                />

                <div className="p-3">
                  <div className="flex justify-between gap-6">
                    <h1
                      onClick={() =>
                        navigate(`/product/${product._id}`, { state: product })
                      }
                      className="leading-none cursor-pointer hover:text-blue-500 hover:underline transition-all font-semibold text-gray-700"
                    >
                      {product.name}
                    </h1>
                    <h1 className="leading-none">₹ {product.price}</h1>
                  </div>
                  <div className="mt-2">
                    <h1 className="font-medium text-gray-500 scale-100">
                      {product.category.name}
                    </h1>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-2xl text-gray-500">No Products Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCards;
