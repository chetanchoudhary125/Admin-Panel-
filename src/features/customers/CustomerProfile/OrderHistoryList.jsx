
import { formatCurrency } from "../../../utils/formatCurrency";

const statusStyles = {
  Delivered:  "bg-green-100 text-green-700",
  Shipped:    "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-700",
  Cancelled:  "bg-red-100 text-red-700",
};

export default function OrderHistoryList({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <p className="text-sm text-gray-400 py-4">No orders found for this customer.</p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {orders.map((order) => (
        <div
          key={order.orderId}
          className="flex flex-col gap-3 rounded-xl border border-gray-100 p-3 transition hover:bg-gray-50 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between sm:p-4"
        >
          <div>
            <p className="text-sm font-medium text-gray-800">{order.orderId}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {order.items.join(", ")}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <p className="text-sm font-semibold text-gray-800">
              {formatCurrency(order.total)}
            </p>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                statusStyles[order.status] || "bg-gray-100 text-gray-600"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}