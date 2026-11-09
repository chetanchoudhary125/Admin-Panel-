import { useState } from "react";
import order from "../data/Data.json";
import { IconX } from "@tabler/icons-react";
import { OrdersPagination } from "../features/orders/OrdersPagination";
import { formatCurrency } from "../utils/formatCurrency";

// Same pattern you wrote in Transactions page
const statusStyles = {
  Delivered:  "bg-green-100 text-green-700",
  Shipped:    "bg-blue-100 text-blue-700",
  Pending:    "bg-yellow-100 text-yellow-700",
  Cancelled:  "bg-red-100 text-red-700",
};

// Small helper — same idea as StockBadge in AllProductsList
// just pulls label+value into one reusable line
const Row = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-medium text-gray-800">{value}</span>
  </div>
);

const Orders = () => {
  const orders = order.orders.Order;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Two filters chained — same .filter() you wrote in Products and Transactions
  // First filter: by search text
  // Second filter: by selected status button
  const filtered = orders
    .filter((o) =>
      search
        ? o.customer.toLowerCase().includes(search.toLowerCase()) ||
          o.orderId.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .filter((o) => statusFilter === "All" ? true : o.status === statusFilter);

  // Same pagination logic you already had — just cleaner variable names
  const totalPages = Math.ceil(filtered.length / ordersPerPage);
  const currentOrders = filtered.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div className="w-full min-w-0">
      <div className="min-w-0 rounded-2xl bg-white p-4 shadow-sm sm:p-6">

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
          <span className="text-sm text-gray-400">{filtered.length} orders</span>
        </div>

        {/* Search — now actually wired up */}
        <div className="mb-5 flex flex-col gap-3 xl:flex-row">
          <input
            type="text"
            placeholder="Search by customer or order ID..."
            className="w-full rounded-lg border border-gray-200 p-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 xl:max-w-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset to page 1 whenever search changes
            }}
          />

          {/* Filter buttons — mapped from array so adding a new status is one word */}
          <div className="flex flex-wrap gap-2">
            {["All", "Delivered", "Pending", "Shipped", "Cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 text-sm rounded-lg border transition ${
                  statusFilter === status
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table — same structure as AllProductsList you just rewrote */}
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="min-w-full text-sm lg:min-w-0">
            <thead>
              <tr className="bg-gray-50 text-xs font-medium uppercase tracking-wide text-gray-400 border-b border-gray-100">
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="hidden px-4 py-3 text-left xl:table-cell">Product</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="hidden px-4 py-3 text-left xl:table-cell">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {currentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-400 xl:hidden">
                    No orders found
                  </td>
                  <td colSpan={7} className="hidden px-4 py-12 text-center text-sm text-gray-400 xl:table-cell">
                    No orders found
                  </td>
                </tr>
              ) : (
                currentOrders.map((o) => (
                  // Fixed: key={o.orderId} not o.id — your data has orderId
                  <tr key={o.orderId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{o.orderId}</td>
                    <td className="px-4 py-3 text-gray-600">{o.customer}</td>
                    {/* ?? "—" means: if product is undefined show a dash */}
                    <td className="hidden px-4 py-3 text-gray-500 xl:table-cell">{o.product ?? "—"}</td>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {formatCurrency(o.totalAmount)}
                    </td>
                    <td className="hidden px-4 py-3 text-gray-500 xl:table-cell">{o.date}</td>
                    <td className="px-4 py-3">
                      {/* Same badge pattern as Transactions */}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[o.status] || "bg-gray-100 text-gray-600"}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="text-blue-500 hover:text-blue-700 text-xs font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <OrdersPagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>

      {/* Slide panel — same open/close pattern you had, just cleaned up */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex justify-end"
          onClick={() => setSelectedOrder(null)} // click backdrop to close
        >
          <div
            className="w-full sm:w-[360px] bg-white h-full p-6 overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()} // stop click going to backdrop
          >
            {/* Panel header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <IconX size={20} stroke={1.5} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Order info rows — using the Row helper above */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <Row label="Order ID"  value={selectedOrder.orderId} />
                <Row label="Date"      value={selectedOrder.date} />
                <Row label="Customer"  value={selectedOrder.customer} />
                <Row label="Product"   value={selectedOrder.product ?? "—"} />
                <Row label="Quantity"  value={selectedOrder.quantity ?? "—"} />
                <Row label="Total"     value={formatCurrency(selectedOrder.totalAmount)} />
              </div>

              {/* Status */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                <span className="text-sm text-gray-500">Status</span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[selectedOrder.status] || "bg-gray-100 text-gray-600"}`}>
                  {selectedOrder.status}
                </span>
              </div>

              {/* Shipping — keeping it simple for now */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Shipping Address</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  100 Main St<br />Springfield, USA
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;