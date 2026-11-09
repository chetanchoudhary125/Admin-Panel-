
import { formatCurrency } from "../../utils/formatCurrency";

const payoutHistory = [
  { id: "PAY001", date: "2025-08-10", amount: 2400, method: "Bank Transfer", status: "Paid",       reference: "REF8821" },
  { id: "PAY002", date: "2025-08-15", amount:  620, method: "Bank Transfer", status: "Processing", reference: "REF9856" },
  { id: "PAY003", date: "2025-08-18", amount: 1180, method: "Bank Transfer", status: "Pending",    reference: "REF9901" },
  { id: "PAY004", date: "2025-07-25", amount: 1850, method: "PayPal",        status: "Paid",       reference: "REF7743" },
  { id: "PAY005", date: "2025-07-10", amount: 3200, method: "Bank Transfer", status: "Paid",       reference: "REF6612" },
  { id: "PAY006", date: "2025-06-28", amount: 2750, method: "Stripe",        status: "Paid",       reference: "REF5534" },
  { id: "PAY007", date: "2025-06-12", amount:  980, method: "PayPal",        status: "Paid",       reference: "REF4421" },
  { id: "PAY008", date: "2025-05-30", amount: 1470, method: "Stripe",        status: "Paid",       reference: "REF3309" },
];

const statusStyles = {
  Paid:       "bg-green-100 text-green-700",
  Pending:    "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Failed:     "bg-red-100 text-red-700",
};

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function PayoutHistoryTable() {
  return (
    <div className="min-w-0 rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-800">Payout History</h2>
        <span className="text-xs text-gray-400">{payoutHistory.length} payouts</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="min-w-full text-sm lg:min-w-0">

          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-400">
              <th className="px-4 py-3 text-left">Payout ID</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Method</th>
              <th className="hidden px-4 py-3 text-left xl:table-cell">Reference</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {payoutHistory.map((payout) => (
              <tr key={payout.id} className="hover:bg-gray-50 transition-colors">

                <td className="px-4 py-3 font-medium text-gray-800">
                  {payout.id}
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {formatDate(payout.date)}
                </td>

                <td className="px-4 py-3 font-medium text-gray-700">
                  {formatCurrency(payout.amount)}
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {payout.method}
                </td>

                <td className="hidden px-4 py-3 font-mono text-xs text-gray-400 xl:table-cell">
                  {payout.reference}
                </td>

                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[payout.status]}`}>
                    {payout.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}