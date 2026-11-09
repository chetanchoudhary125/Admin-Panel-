// features/payouts/PayoutStats.jsx
// Reuses the InfoCard component you already have in components/SalesCardToday.jsx
import InfoCard from "../../components/SalesCardToday";
import {
  IconCurrencyDollar,
  IconWallet,
  IconClock,
  IconCircleCheck,
} from "@tabler/icons-react";

export default function PayoutStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <InfoCard
        title="Total Earnings"
        value="$24,850"
        subtitle="All time"
        icon={IconCurrencyDollar}
        color="bg-indigo-50 text-indigo-700"
        trend={{ direction: "up", percent: 14 }}
      />
      <InfoCard
        title="Available Balance"
        value="$3,240"
        subtitle="Ready to withdraw"
        icon={IconWallet}
        color="bg-emerald-50 text-emerald-700"
      />
      <InfoCard
        title="Pending"
        value="$1,180"
        subtitle="Being processed"
        icon={IconClock}
        color="bg-amber-50 text-amber-700"
      />
      <InfoCard
        title="Last Payout"
        value="$2,400"
        subtitle="Aug 10, 2025"
        icon={IconCircleCheck}
        color="bg-blue-50 text-blue-700"
      />
    </div>
  );
}