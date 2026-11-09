// TransactionTable.jsx
import  { useState } from "react";
import maintransection from "../data/maintransection.json";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { formatCurrency } from "../utils/formatCurrency";
import { downloadCsv } from "../utils/downloadCsv";

const statusStyles = {
  Delivered: "bg-green-100 text-green-800",
  Shipped: "bg-blue-100 text-blue-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Returned: "bg-red-100 text-red-800",
  Cancelled: "bg-gray-100 text-gray-700",
  Completed: "bg-indigo-100 text-indigo-800",
};


export default function Transactions() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filtered = maintransection
      .filter((transaction) => {
        const searchText = search.trim().toLowerCase();
        return !searchText || [
          transaction.trackingNumber,
          transaction.email,
          transaction.method,
          transaction.status,
        ].some((value) => value.toLowerCase().includes(searchText));
      })
      .filter((transaction) => statusFilter === "All" || transaction.status === statusFilter);

  return (
    <div className="w-full min-w-0 rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold text-gray-800 sm:text-2xl">
          Transactions
        </h1>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => downloadCsv(
              "transactions.csv",
              ["Tracking Number", "Product Price", "Delivery Fee", "Method", "Email", "Status", "Date"],
              filtered.map((transaction) => [
                transaction.trackingNumber,
                transaction.productPrice,
                transaction.deliveryFee,
                transaction.method,
                transaction.email,
                transaction.status,
                transaction.date,
              ]),
            )}
            className="rounded-lg border border-gray-400 p-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            <IoCloudDownloadOutline /> Download
          </button>
        </div>
      </header>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search..."
            className="w-full min-w-0 rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label className="sr-only" htmlFor="transaction-status">Filter by status</label>
          <select
            id="transaction-status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="w-full shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm sm:w-auto"
          >
            {["All", ...new Set(maintransection.map((transaction) => transaction.status))].map((status) => (
              <option key={status} value={status}>{status === "All" ? "All statuses" : status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-600">Transaction list</h2>
        <div className="text-sm text-gray-500">Showing {filtered.length}</div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 lg:min-w-0">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tracking Number
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Price
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 2xl:table-cell">
                Delivery Fee
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 2xl:table-cell">
                Method
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 2xl:table-cell">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400">
                  No transactions found
                </td>
              </tr>
            ) : filtered.map((t, idx) => (
              <tr
                key={t.trackingNumber}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {t.trackingNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatCurrency(t.productPrice)}
                </td>
                <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-700 2xl:table-cell">
                  {formatCurrency(t.deliveryFee)}
                </td>
                <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-600 2xl:table-cell">
                  {t.method}
                </td>
                <td className="max-w-48 truncate px-4 py-4 text-sm text-blue-600">
                  {t.email}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[t.status] || "bg-gray-100 text-gray-700"}`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-500 2xl:table-cell">
                  {t.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
