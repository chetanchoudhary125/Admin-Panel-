import { useState } from "react";
import data from "../../data/Data.json";
import { useNavigate } from "react-router-dom";

export const OrdersList = () => {
  const [selector, setSelector] = useState(null);
  const [visibleCount] = useState(7);
  const [stockFilter, setStockFilter] = useState("all"); 

  const navigate = useNavigate();

  // Filtering Logic
  const filteredOrders = data.TopSellingPProducts.TopSelling.filter((order) => {
    if (stockFilter === "inStock") return order.stock > 10;
    if (stockFilter === "runningOut") return order.stock > 0 && order.stock <= 10;
    if (stockFilter === "outOfStock") return order.stock === 0;
    return true; 
  });

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 my-4">
        {[
          { label: "All", value: "all" },
          { label: "In Stock", value: "inStock" },
          { label: "Running Out", value: "runningOut" },
          { label: "Out of Stock", value: "outOfStock" },
        ].map((filter) => (
          <button
            key={filter.value}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all
              ${
                stockFilter === filter.value
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            onClick={() => setStockFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Orders Header (desktop only) */}
      <div className="hidden md:flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-500 border-b border-gray-200">
        <span className="w-1/12">ID</span>
        <span className="w-1/5">Name</span>
        <span className="w-1/5">Price</span>
        <span className="w-1/5">Sales</span>
        <span className="w-1/5">Stock</span>
      </div>

      {/* Orders List */}
      {filteredOrders.slice(0, visibleCount).map((orders) => (
        <div key={orders.orderId}>
          {/* Desktop row */}
          <ul
            className={`hidden sm:flex items-center justify-between px-4 rounded-lg cursor-pointer transition-all
              ${
                selector === orders.id
                  ? "bg-gray-100 border border-gray-200"
                  : "hover:bg-gray-50"
              }`}
            onClick={() =>
              setSelector(selector === orders.id ? null : orders.id)
            }
          >
            <li className="py-3 w-1/12 text-sm font-medium text-gray-700">
              {orders.id}
            </li>
            <li className="py-3 w-1/5 text-sm text-gray-800 truncate">
              {orders.name}
            </li>
            <li className="py-3 w-1/5 text-sm text-gray-600">
              ${orders.price}
            </li>
            <li className="py-3 w-1/5 text-sm text-gray-600">
              {orders.sales}
            </li>
            <li className="py-3 w-1/5">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-medium
                  ${
                    orders.stock === 0
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : orders.stock <= 10
                      ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                      : "bg-green-50 text-green-700 border border-green-200"
                  }`}
              >
                {orders.stock === 0
                  ? "Out of Stock"
                  : orders.stock <= 10
                  ? `Running Out (${orders.stock})`
                  : `In Stock (${orders.stock})`}
              </span>
            </li>
          </ul>

          {/* mobile  */}
          <div
            className={`sm:hidden p-4 rounded-lg border transition-all cursor-pointer
              ${
                selector === orders.id
                  ? "bg-gray-100 border-gray-300"
                  : "bg-white hover:bg-gray-50"
              }`}
            onClick={() =>
              setSelector(selector === orders.id ? null : orders.id)
            }
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">
                {orders.name}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium
                  ${
                    orders.stock === 0
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : orders.stock <= 10
                      ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                      : "bg-green-50 text-green-700 border border-green-200"
                  }`}
              >
                {orders.stock === 0
                  ? "Out"
                  : orders.stock <= 10
                  ? `Low (${orders.stock})`
                  : `Stock (${orders.stock})`}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-600 space-y-1">
              <p>ID: {orders.id}</p>
              <p>Price: ${orders.price}</p>
              <p>Sales: {orders.sales}</p>
            </div>
          </div>
        </div>
      ))}

      {visibleCount < filteredOrders.length && (
        <div className="flex justify-center mt-6">
          <button
            className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium 
                       hover:bg-blue-700 shadow-sm transition-colors"
            onClick={() => navigate("/orders")}
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};
