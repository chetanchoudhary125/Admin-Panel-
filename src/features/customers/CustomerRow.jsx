
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

function Avatar({ src, name }) {
  const [error, setError] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (!error && src) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setError(true)}
        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
      />
    );
  }

  return (
    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-semibold flex-shrink-0">
      {initials}
    </div>
  );
}

export default function CustomerRow({ customer }) {
  const navigate = useNavigate();
  const { id, name, email, location, status, spend, avatar } = customer;

  return (
    <tr
      className="hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={() => navigate(`/customers/${id}`)}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar src={avatar} name={name} />
          <span className="font-medium text-gray-800 text-sm">{name}</span>
        </div>
      </td>

      {/* Email */}
      <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-[160px]">
        {email}
      </td>

      <td className="hidden px-4 py-3 text-sm text-gray-500 xl:table-cell">
        {location}
      </td>

      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === "Active"
              ? "bg-green-100 text-green-700"
              : status === "Blocked"
                ? "bg-amber-100 text-amber-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </td>

      <td className="hidden px-4 py-3 text-sm font-medium text-gray-700 xl:table-cell">
        {formatCurrency(spend)}
      </td>

      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => navigate(`/customers/${id}`)}
          className="px-3 py-1 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          View
        </button>
      </td>
    </tr>
  );
}