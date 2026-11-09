import { createElement, useState } from "react";
import { useAuth } from "../context/AuthContext";

import { Menu, X, LogOut,  } from "lucide-react";

import {
  IconLayoutDashboard,
  IconShoppingCart,
  IconPackage,
  IconUsers,
  IconSettings,
  IconCoin, 
  IconBrandCashapp,
  IconChartPie2Filled,
} from "@tabler/icons-react";


import { NavLink, useNavigate } from "react-router-dom";

const colorMap = {
  purple: { bg: "#EEEDFE", icon: "#534AB7" },
  teal: { bg: "#E1F5EE", icon: "#0F6E56" },
  coral: { bg: "#FAECE7", icon: "#993C1D" },
  blue: { bg: "#E6F1FB", icon: "#185FA5" },

  green:  { bg: "#E9F7EF", icon: "#1E8449" },   // fresh, growth-oriented
  orange: { bg: "#FFF4E6", icon: "#D35400" },   // energetic, highlights alerts
  pink:   { bg: "#FDECF3", icon: "#C2648B" },   // soft yet bold for customer metrics
  gray:   { bg: "#F4F6F8", icon: "#C8644B" },
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      Icon: IconLayoutDashboard,
      color: "purple",
      path: "/dashboard",
    },
    { name: "Orders", Icon: IconShoppingCart, color: "coral", path: "/orders" },
    { name: "Products", Icon: IconPackage, color: "teal", path: "/products" },
    { name: "Customers", Icon: IconUsers, color: "blue", path: "/customers" },
    { name: "Transactions", Icon: IconCoin , color: "purple", path: "/transactions" },
    
    { name: "Payouts", Icon: IconBrandCashapp, color: "orange", path: "/payouts" },
    { name: "Analytics", Icon: IconChartPie2Filled, color: "gray", path: "/analytics" },

    { name: "Settings", Icon: IconSettings, color: "purple", path: "/settings" },
    
  ];

  const {logout} = useAuth()

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        className="fixed left-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <button
          type="button"
          aria-label="Dismiss navigation overlay"
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 h-dvh w-[min(18rem,88vw)] overflow-y-auto border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:w-64 lg:shadow-none
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-center border-b border-gray-200 px-4">
          <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
        </div>

        <nav aria-label="Main navigation" className="mt-4 flex flex-col gap-1 px-3 pb-20">
          {menuItems.map(({ name, Icon, color, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 rounded-xl bg-blue-600 px-3 py-2.5 text-white transition-colors"
                  : "flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-700 transition-colors hover:bg-slate-100"
              }
              onClick={() => setIsOpen(false)}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 7,
                  background: colorMap[color].bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {createElement(Icon, {
                  size: 17,
                  stroke: 1.5,
                  color: colorMap[color].icon,
                })}
              </div>

              <span>{name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-100 bg-white p-4">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-white transition-colors hover:bg-red-700"
            onClick={() => {
                logout();
                navigate("/");
            }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
