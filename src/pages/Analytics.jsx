import transactions from "../data/maintransection.json";
import { formatCurrency } from "../utils/formatCurrency";

const totalVolume = transactions.reduce(
  (total, transaction) => total + transaction.productPrice + transaction.deliveryFee,
  0,
);
const deliveredCount = transactions.filter(
  (transaction) => transaction.status === "Delivered",
).length;
const averageTransaction = transactions.length ? totalVolume / transactions.length : 0;
const statusCounts = transactions.reduce((counts, transaction) => {
  counts[transaction.status] = (counts[transaction.status] ?? 0) + 1;
  return counts;
}, {});
const largestStatusCount = Math.max(...Object.values(statusCounts), 1);

export default function Analytics() {
  return (
    <div className="w-full min-w-0">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">A snapshot of the sample transaction data in this frontend.</p>
      </header>

      <section aria-label="Transaction summary" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Transaction volume", value: formatCurrency(totalVolume) },
          { label: "Transactions", value: transactions.length.toLocaleString() },
          { label: "Delivered", value: `${deliveredCount} (${transactions.length ? Math.round((deliveredCount / transactions.length) * 100) : 0}%)` },
        ].map((stat) => (
          <article key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-semibold text-slate-900">Transactions by status</h2>
          <div className="mt-5 space-y-4">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-slate-600">{status}</span>
                  <span className="font-medium text-slate-800">{count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${(count / largestStatusCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-semibold text-slate-900">Transaction value</h2>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{formatCurrency(averageTransaction)}</p>
          <p className="mt-1 text-sm text-slate-500">Average transaction including delivery fees</p>
          <div className="mt-6 border-t border-slate-100 pt-4">
            <p className="text-sm text-slate-500">Data source</p>
            <p className="mt-1 text-sm font-medium text-slate-800">Local sample transactions</p>
          </div>
        </article>
      </section>
    </div>
  );
}
