import { IconBuildingBank } from "@tabler/icons-react";

export default function PayoutMethodCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-800">Payout Method</h2>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
        <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
          <IconBuildingBank size={20} stroke={1.5} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">Wallet transfer</p>
          <p className="text-xs text-gray-500 mt-0.5">**** **** **** 4821</p>
          <p className="text-xs text-gray-400">Paypal - International</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Payout Schedule</span>
          <span className="text-xs font-medium text-gray-800">Every 2 weeks</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Next Payout Date</span>
          <span className="text-xs font-medium text-gray-800">Aug 25, 2025</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Minimum Payout</span>
          <span className="text-xs font-medium text-gray-800">$100.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Processing Time</span>
          <span className="text-xs font-medium text-gray-800">3–5 business days</span>
        </div>
      </div>

      <p className="mt-6 rounded-xl bg-blue-50 px-4 py-3 text-center text-xs text-blue-700">
        Payout requests will be available when a backend is connected.
      </p>
    </div>
  );
}
