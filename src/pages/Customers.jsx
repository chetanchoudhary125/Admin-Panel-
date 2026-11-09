
import { useMemo, useState } from "react";
import { IconDownload } from "@tabler/icons-react";
import customerData from "../data/Costomers.json";
import { downloadCsv } from "../utils/downloadCsv";

import CustomerStats from "../features/customers/CustomerStates";
import CustomersTable from "../features/customers/CustomersTable";

// Filter options — same array.map pattern you used in Orders.jsx
const FILTERS = ["All", "Active", "Inactive", "Blocked"];

export default function Customers() {
  const [query, setQuery]   = useState("");
  const [filter, setFilter] = useState("All");
  const [blockedData] = useState(() => {
    try {
      const saved = localStorage.getItem("blockedUsers");
      const parsed = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(parsed)) throw new Error("Blocked customer data must be a list.");
      return { ids: parsed, error: "" };
    } catch (error) {
      console.error("Failed to load blocked customer data:", error);
      return { ids: [], error: "Saved blocked-customer data could not be loaded." };
    }
  });
  const blockedIds = blockedData.ids;

  const customers = useMemo(
    () => customerData.map((customer) => ({
      ...customer,
      status: blockedIds.includes(customer.id) ? "Blocked" : customer.status,
    })),
    [blockedIds],
  );
  const filtered = customers
    .filter((c) =>
      query
        ? c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.email.toLowerCase().includes(query.toLowerCase())
        : true
    )
    .filter((c) =>
      filter === "All" ? true : c.status === filter
    );

  return (
    <div className="w-full min-w-0">
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>
            <p className="text-sm text-gray-400 mt-0.5">{customers.length} total customers</p>
          </div>

          <button
              type="button"
              onClick={() => downloadCsv(
                "customers.csv",
                ["Name", "Email", "Location", "Status", "Total Spend"],
                filtered.map((customer) => [
                  customer.name,
                  customer.email,
                  customer.location,
                  customer.status,
                  customer.spend,
                ]),
              )}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
            >
            <IconDownload size={16} stroke={1.5} />
            Download
          </button>
        </div>

        {blockedData.error && <p role="alert" className="mb-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">{blockedData.error}</p>}
        <CustomerStats customers={customers} />

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition ${
                  filter === f
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <CustomersTable customers={filtered} />

      </div>
    </div>
  );
}