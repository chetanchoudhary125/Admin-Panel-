import { createElement } from "react";

export default function IconBadge({ icon, label, value, className = "" }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm ${className}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {createElement(icon, { size: 20, stroke: 1.5, "aria-hidden": true })}
      </span>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-base font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
