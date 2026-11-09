
import { createElement, useState } from "react";
import {
  IconMail,
  IconPhone,
  IconCalendar,
  IconClock,
  IconMapPin,
} from "@tabler/icons-react";

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
        className="w-20 h-20 rounded-full object-cover ring-4 ring-gray-100"
      />
    );
  }

  return (
    <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold ring-4 ring-gray-100">
      {initials}
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-gray-400 flex-shrink-0">
        {createElement(icon, { size: 16, stroke: 1.5 })}
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

const formatDate = (str) =>
  new Date(str).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

export default function CustomerInfoPanel({ customer, onBlock, isBlocked }) {
  const { name, email, phone, dob, lastOnline, location, status, avatar } = customer;

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">

      <div className="flex flex-col items-center text-center gap-2">
        <Avatar src={avatar} name={name} />
        <h2 className="text-lg font-semibold text-gray-800 mt-1">{name}</h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === "Active"
              ? "bg-green-100 text-green-700"
              : status === "Blocked"
                ? "bg-amber-100 text-amber-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </div>

      <hr className="border-gray-100" />

      <div className="flex flex-col gap-4">
        <InfoRow icon={IconMail}     label="Email"       value={email} />
        <InfoRow icon={IconPhone}    label="Phone"       value={phone} />
        <InfoRow icon={IconMapPin}   label="Location"    value={location} />
        <InfoRow icon={IconCalendar} label="Date of Birth" value={formatDate(dob)} />
        <InfoRow icon={IconClock}    label="Last Online" value={formatDate(lastOnline)} />
      </div>

      <hr className="border-gray-100" />

      <div className="flex flex-col gap-2">
        <a href={`mailto:${email}`} className="w-full py-2.5 rounded-xl bg-blue-600 text-center text-white text-sm font-medium hover:bg-blue-700 transition">
          Send Message
        </a>
        <button
          onClick={onBlock}
          className={`w-full py-2.5 rounded-xl border text-sm font-medium transition ${
            isBlocked
              ? "border-green-200 text-green-700 hover:bg-green-50"
              : "border-red-200 text-red-600 hover:bg-red-50"
          }`}
        >
          {isBlocked ? "Unblock User" : "Block User"}
        </button>
      </div>

    </div>
  );
}