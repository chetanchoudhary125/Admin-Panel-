import { useState } from "react";
import data from "../data/Data.json";

export const TopSellingOrdersList = () => {
  const [selector, setSelector] = useState(null);
  const [visibleCount, setVisibleCount] = useState(7);
  const [stockFilter, setStockFilter] = useState("all"); // 'all' | 'inStock' | 'runningOut' | 'outOfStock'

  const filteredOrders = data.TopSellingPProducts.TopSelling.filter((order) => {
    if (stockFilter === "inStock") return order.stock > 10;
    if (stockFilter === "runningOut")
      return order.stock > 0 && order.stock <= 10;
    if (stockFilter === "outOfStock") return order.stock === 0;
    return true;
  });

  return (
    <div className="space-y-2">
      {/* filter  */}
      <div className="my-4 flex flex-wrap gap-2">
        {[
          { label: "All", value: "all" },
          { label: "In Stock", value: "inStock" },
          { label: "Running Out", value: "runningOut" },
          { label: "Out of Stock", value: "outOfStock" },
        ].map((filter) => (
          <button
            key={filter.value}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors
              ${
                stockFilter === filter.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            onClick={() => setStockFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <ul className="w-full list-none m-0">
        {filteredOrders.slice(0, visibleCount).map((orders) => (
          <li
            key={orders.id}
            className={`grid grid-cols-12 items-center gap-2 rounded-lg p-2 text-xs transition-colors sm:text-sm ${
              selector === orders.id ? "bg-blue-50" : "hover:bg-slate-50"
            }`}
            onClick={() =>
              setSelector(selector === orders.id ? null : orders.id)
            }
          >
            <div className="col-span-2 py-3">{orders.id}</div>
            <div className="col-span-3 truncate py-3">{orders.name}</div>
            <div className="col-span-2 truncate py-3">${orders.price}</div>
            <div className="col-span-2 truncate py-3">{orders.sales}</div>
            <div className="col-span-3 min-w-0 py-3">
              <span
                className={`inline-block max-w-full truncate rounded-full px-2 py-1 text-[10px] font-semibold sm:px-3 sm:text-xs
          ${
            orders.stock === 0
              ? "bg-red-100 text-red-700"
              : orders.stock <= 10
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
          }`}
              >
                {orders.stock === 0
                  ? "Out of Stock"
                  : orders.stock <= 10
                    ? `Running Out (${orders.stock})`
                    : `In Stock (${orders.stock})`}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {visibleCount < filteredOrders.length && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
            onClick={() => setVisibleCount(visibleCount + 3)}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};
