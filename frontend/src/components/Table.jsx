import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pulses from "./Pulses";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncdeleteproduct,
  asyncgetproducts,
} from "../store/Actions/adminAction";

const Table = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { products } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const handleEdit = (id) => {
    navigate("/admin/product/add", { state: { id } });
  };

  useEffect(() => {
    dispatch(asyncgetproducts());
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      setLoading(true);
      await dispatch(asyncdeleteproduct(id));
      dispatch(asyncgetproducts());
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      {loading ? (
        <div>
          <Pulses />
        </div>
      ) : (
        <>
          <div className="relative mt-10 overflow-x-auto shadow-sm shadow-[#034062] sm:rounded-xl">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white  ">
                Our products
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    name
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {products && products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={product._id} className="bg-white border-b ">
                      <td className="px-6 py-4">{index + 1}.</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        <img
                          className="h-12 w-12 object-cover"
                          src={product?.image?.url}
                          alt=""
                        />
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {product.name}
                      </th>

                      <td className="px-6 py-4">{product.category.name}</td>
                      <td className="px-6 py-4">₹ {product.price}</td>

                      <td className="px-6 py-4 ">
                        <span
                          onClick={() => handleEdit(product._id)}
                         className="font-medium cursor-pointer text-blue-600 hover:underline">
                          Edit
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          onClick={() => handleDeleteProduct(product._id)}
                          className="font-medium text-red-600 cursor-pointer hover:underline"
                        >
                          {loading ? "Deleting..." : "Delete"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No Products Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Table;
