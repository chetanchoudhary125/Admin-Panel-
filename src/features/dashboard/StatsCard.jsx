import { IconBox, IconCurrencyDollar, IconPackage, IconRotate, IconShoppingCart, IconUser } from "@tabler/icons-react";
import InfoCard from "../../components/SalesCardToday";

export const StatsCard = () => (
  <div className="my-4 grid w-full grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3">
     <InfoCard
        title="Today's Sales"
        value="$1,250"
        subtitle="Revenue generated"
        icon={IconCurrencyDollar}
        color="bg-indigo-50 text-indigo-700"
        trend={{ direction: "up", percent: 12 }}
        extra="Avg order value: $45"
      />

      {/* Orders Card */}
      <InfoCard
        title="Orders"
        value="87"
        subtitle="Placed today"
        icon={IconShoppingCart}
        color="bg-emerald-50 text-emerald-700"
        trend={{ direction: "down", percent: 5 }}
        extra="Pending: 12"
      />

      {/* Products Card */}
      <InfoCard
        title="Products Sold"
        value="142"
        subtitle="Units dispatched"
        icon={IconPackage}
        color="bg-amber-50 text-amber-700"
        trend={{ direction: "up", percent: 8 }}
        extra="Top item: Sneakers"
      />

      {/* Top Customer Card */}
      <InfoCard
        title="Top Customer"
        value="John D."
        subtitle="Spent $320 today"
        icon={IconUser}
        color="bg-purple-50 text-purple-700"
        extra="3 repeat purchases this week"
      />

      {/* Refunds Card */}
      <InfoCard
        title="Refunds"
        value="$75"
        subtitle="Processed today"
        icon={IconRotate}
        color="bg-rose-50 text-rose-700"
        trend={{ direction: "up", percent: 2 }}
        extra="2 items returned"
      />

      {/* Inventory Card */}
      <InfoCard
        title="Inventory Status"
        value="1,024"
        subtitle="Items in stock"
        icon={IconBox}
        color="bg-teal-50 text-teal-700"
        extra="Low stock: 5 products"
      />

    {/* {data.stats.card.map(({ title, value, subtitle, chartUrl, id, color }) => (
      <div
        key={id}
        className="flex justify-between items-center rounded-xl px-6 py-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-gray-300"
        style={{ backgroundColor: color }}
      >
     
        <div className="flex-1">
          <h2 className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <CiShoppingCart className="text-gray-400 text-lg" aria-hidden="true" />
            <span>{title}</span>
          </h2>
          <h3 className="text-2xl font-semibold text-gray-900 mt-2">{value}</h3>
          <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
        </div>

        <div className="w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center">
          <img
            src={chartUrl}
            alt={`${title} chart`}
            className="object-contain w-full h-full opacity-80"
          />
        </div>
      </div>
    ))} */}
  </div>
);
