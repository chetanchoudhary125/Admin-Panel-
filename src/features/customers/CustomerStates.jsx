export default function CustomerStats({ customers }) {
  const stats = [
    { id: 1, label: "Total Customers", value: customers.length, bg: "bg-blue-50", text: "text-blue-700" },
    { id: 2, label: "Active", value: customers.filter((customer) => customer.status === "Active").length, bg: "bg-green-50", text: "text-green-700" },
    { id: 3, label: "Inactive", value: customers.filter((customer) => customer.status === "Inactive").length, bg: "bg-red-50", text: "text-red-700" },
    { id: 4, label: "Blocked", value: customers.filter((customer) => customer.status === "Blocked").length, bg: "bg-amber-50", text: "text-amber-700" },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {stats.map((stat) => (
        <div key={stat.id} className={`${stat.bg} rounded-xl px-4 py-3`}>
          <p className="text-xs text-gray-500">{stat.label}</p>
          <p className={`text-2xl font-bold mt-1 ${stat.text}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}