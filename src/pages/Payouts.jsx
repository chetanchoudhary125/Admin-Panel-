import PayoutHistoryTable from "../features/Payouts/PayoutHistoryTable";
import PayoutMethodCard from "../features/Payouts/PayoutMethodCard";
import PayoutStats from "../features/Payouts/PayoutStates";

export default function Payouts() {
  return (
    <div className="w-full min-w-0">

      {/* Page header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Payouts</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Track your earnings and manage payout settings
          </p>
        </div>
      </div>

      <PayoutStats />
      <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(16rem,0.8fr)_minmax(0,2fr)]">
        <div className="min-w-0">
          <PayoutMethodCard />
        </div>
        <div className="min-w-0">
          <PayoutHistoryTable />
        </div>
      </div>

    </div>
  );
}