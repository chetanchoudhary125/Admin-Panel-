// InfoCard.jsx
import { createElement } from "react";
import {
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";

export default function InfoCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  trend = null, // { direction: "up" | "down", percent: number }
  extra = null, // optional extra info line
}) {
  return (
    <div className="flex w-full min-w-0 items-center justify-between gap-3 rounded-xl bg-white p-4 shadow sm:p-5">
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-slate-600">{title}</h3>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        <p className="text-xs text-slate-400">{subtitle}</p>

        {trend && (
          <div className="flex items-center gap-1 mt-2">
            {trend.direction === "up" ? (
              <IconArrowUpRight size={14} className="text-emerald-600" />
            ) : (
              <IconArrowDownRight size={14} className="text-rose-600" />
            )}
            <span
              className={`text-xs font-medium ${
                trend.direction === "up" ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {trend.percent}% {trend.direction === "up" ? "increase" : "decrease"}
            </span>
          </div>
        )}

        {extra && (
          <p className="mt-1 text-xs text-slate-500">{extra}</p>
        )}
      </div>

      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 ${color}`}>
        {createElement(Icon, { size: 22, stroke: 1.5, "aria-hidden": true })}
      </div>
    </div>
  );
}
