import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncaddproducts,
  asyncgetsingleproduct,
  asyncupdateproduct,
  asyncremovesingleproduct,
} from "../../store/Actions/adminAction";

const AddProducts = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const state = location.state;

  const id = state?.id;

  const { singleProduct } = useSelector((state) => state.admin);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    productImages: null,
    description: "",
  });

  useEffect(() => {
    if (id === undefined) {
      setProduct({
        name: "",
        price: "",
        category: "",
        productImages: null,
        description: "",
      });
      dispatch(asyncremovesingleproduct());
    }
    if (id !== undefined) {
      dispatch(asyncgetsingleproduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProduct) {
      setProduct({
        name: singleProduct.name || "",
        price: singleProduct.price || "",
        category: singleProduct.category?.name || "",
        description: singleProduct.description || "",
      });
    }
  }, [singleProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const data = () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("category", product.category);

    formData.append("image", image);

    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return toast.error("Please select an image");
    }

    const formData = data();

    try {
      setLoading(true);
      await dispatch(asyncaddproducts(formData));
    } catch (error) {
    } finally {
      setLoading(false);
      setProduct({
        name: "",
        price: "",
        category: "",
        productImages: null,
        description: "",
      });
    }
  };

  const updateHandler = async () => {
    const updatedProduct = {
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
    };

    try {
      setLoading(true);
      await dispatch(asyncupdateproduct(id, updatedProduct));
    } catch (error) {
    } finally {
      setLoading(false);
      setProduct({
        name: "",
        price: "",
        category: "",
        productImages: null,
        description: "",
      });
    }
  };

  return (
    <>
      <h3 className="font-bold text-xl mb-7">
        {id ? "Edit Product" : "Add Product"}
      </h3>

      <section className="bg-gray-100">
        <div className="px-4 mx-auto p-7">
          <form>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Type product name"
                  value={product.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="$2999"
                  value={product.price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Category"
                  value={product.category}
                  onChange={handleInputChange}
                />
              </div>

              {!state?.id && (
                <div className="sm:col-span-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 mt-2 text-sm font-medium text-gray-900"
                    >
                      Product Image
                    </label>
                    <input
                      type="file"
                      name="productImages"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="product images"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div>
              )}

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={8}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                  placeholder="Your description here"
                  value={product.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {state?.id ? (
              <button
                type="button"
                onClick={updateHandler}
                className="mt-6 bg-black text-white px-5 rounded-lg py-3"
              >
                {loading ? "Loading..." : "Update Product"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="mt-6 bg-black text-white px-5 rounded-lg py-3"
              >
                {loading ? "Loading..." : "Add Product"}
              </button>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default AddProducts;
