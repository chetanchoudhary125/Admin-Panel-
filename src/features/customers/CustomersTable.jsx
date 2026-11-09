
import CustomerRow from "./CustomerRow";

export default function CustomersTable({ customers }) {
  if (customers.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 py-16 text-center">
        <p className="text-sm font-medium text-gray-600">No customers found</p>
        <p className="mt-1 text-xs text-gray-400">Try a different search or filter</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="min-w-full text-sm lg:min-w-0">

        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-400">
            <th className="px-4 py-3 text-left">Customer</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="hidden px-4 py-3 text-left xl:table-cell">Location</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="hidden px-4 py-3 text-left xl:table-cell">Total Spend</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 bg-white">
          {customers.map((customer) => (
            <CustomerRow key={customer.id} customer={customer} />
          ))}
        </tbody>

      </table>
    </div>
  );
}