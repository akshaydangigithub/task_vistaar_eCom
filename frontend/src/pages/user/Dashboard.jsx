import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncgetOrderProducts } from "../../store/Actions/userAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { orderProducts, user, isUserAuthenticate } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(asyncgetOrderProducts());
  }, []);

  return (
    <div>
      <h3 className="font-bold text-xl mb-7">
        Your all products which you have ordered
      </h3>

      <div className="relative mt-10 overflow-x-auto shadow-sm shadow-[#034062] sm:rounded-xl">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No.
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                name
              </th>

              <th scope="col" className="px-6 py-3">
                Total Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orderProducts && orderProducts.length > 0 ? (
              orderProducts.map((product, index) => (
                <tr key={product._id} className="bg-white border-b ">
                  <td className="px-6 py-4">{index + 1}.</td>
                  <td className="px-6 py-4">
                    <img
                      src={product.product.image.url}
                      alt={product.product.name}
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {product.product.name}
                  </th>

                  <td className="px-6 py-4">₹ {product.totalPrice}</td>
                  <td className="px-6 py-4">{product.quantity}</td>

                  <td className="px-6 py-4">
                    {product.status === "Pending" ? (
                      <span className="bg-yellow-500 px-3 py-1 text-white rounded-md">
                        {product.status}
                      </span>
                    ) : product.status === "Delivered" ? (
                      <span className="bg-green-500  px-3 py-1 text-white rounded-md">
                        {product.status}
                      </span>
                    ) : product.status === "Processing" ? (
                      <span className="bg-blue-500  px-3 py-1 text-white rounded-md">
                        {product.status}
                      </span>
                    ) : (
                      <span className="bg-red-500  px-3 py-1 text-white rounded-md">
                        {product.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No Orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
