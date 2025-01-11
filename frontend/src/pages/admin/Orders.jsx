import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncgetorders,
  asyncupdateorder,
} from "../../store/Actions/adminAction";

const Orders = () => {
  const dispatch = useDispatch();
  const [statuses, setStatuses] = useState({});

  const { orders } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(asyncgetorders());
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      const initialStatuses = orders.reduce((acc, order) => {
        acc[order._id] = order.status;
        return acc;
      }, {});
      setStatuses(initialStatuses);
    }
  }, [orders]);

  const handleStatusChange = (e, id) => {
    const newStatus = e.target.value;
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: newStatus,
    }));
    dispatch(asyncupdateorder(id, newStatus));
  };

  return (
    <>
      <h3 className="font-bold text-xl mb-7">All Orders</h3>

      <div className="relative mt-10 overflow-x-auto shadow-sm shadow-[#034062] sm:rounded-xl">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white  ">
            Orders
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No.
              </th>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1} .</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹ {order.totalPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={statuses[order._id] || ""}
                      onChange={(e) => handleStatusChange(e, order._id)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    >
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Processing">Processing</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
