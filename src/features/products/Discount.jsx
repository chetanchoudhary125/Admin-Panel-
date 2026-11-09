import { ArrowRight } from "lucide-react";

export const Discounts = () => {
  const discountOptions = [
    {
      title: "Create Discount Code",
      desc: "Set up percentage or fixed amount discounts",
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Email Campaign",
      desc: "Send newsletters and promotional emails",
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Announcement Banner",
      desc: "Display site-wide promotional message",
      color: "bg-yellow-50 text-yellow-700",
    },
    {
      title: "Bundle Offer",
      desc: "Create bundle offers with special pricing",
      color: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 mb-4 shadow-md">
      <h2 className="mb-6 text-lg font-semibold text-gray-800">Discounts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {discountOptions.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border shadow-sm hover:shadow-md transition flex flex-col justify-between ${item.color}`}
          >
            <div>
              <h3 className="font-medium mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>

            <div className="flex justify-end mt-3">
              <ArrowRight className="w-5 h-5 text-gray-500 hover:text-gray-800 transition" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
