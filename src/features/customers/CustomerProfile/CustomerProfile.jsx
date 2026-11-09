import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconArrowLeft, IconCreditCard } from "@tabler/icons-react";

import data from "../../../data/Costomers.json";
import OrderHistoryList from "./OrderHistoryList";
import BlockUserModal from "./BlockUserModal";
import CustomerInfoPanel from "./CustomerInfoPanel";

function readBlockedUsers() {
  try {
    const stored = localStorage.getItem("blockedUsers");
    const ids = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(ids)) throw new Error("Blocked customer data must be a list.");
    return { ids, error: "" };
  } catch (error) {
    console.error("Failed to load blocked customer data:", error);
    return { ids: [], error: "Saved blocked-customer data could not be loaded." };
  }
}

export default function CustomerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [blockedData, setBlockedData] = useState(readBlockedUsers);
  const blockedIds = blockedData.ids;
  const storageError = blockedData.error;

  const customerRecord = data.find((c) => c.id === Number(id));
  const customer = customerRecord
    ? { ...customerRecord, status: blockedIds.includes(customerRecord.id) ? "Blocked" : customerRecord.status }
    : null;
  const isBlocked = customer ? blockedIds.includes(customer.id) : false;

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
        <p className="text-gray-500 text-sm">Customer not found.</p>
        <button
          onClick={() => navigate("/customers")}
          className="text-blue-600 text-sm hover:underline"
        >
          Back to Customers
        </button>
      </div>
    );
  }

  const handleBlock = () => {
    const updated = [...new Set([...blockedIds, customer.id])];
    try {
      localStorage.setItem("blockedUsers", JSON.stringify(updated));
      setBlockedData({ ids: updated, error: "" });
      setShowBlockModal(false);
      navigate("/customers");
    } catch (error) {
      console.error("Failed to save blocked customer:", error);
      setBlockedData((current) => ({
        ...current,
        error: "This customer could not be blocked because browser storage is unavailable.",
      }));
    }
  };

  const handleUnblock = () => {
    const updated = blockedIds.filter((blockedId) => blockedId !== customer.id);
    try {
      localStorage.setItem("blockedUsers", JSON.stringify(updated));
      setBlockedData({ ids: updated, error: "" });
      navigate("/customers");
    } catch (error) {
      console.error("Failed to save customer status:", error);
      setBlockedData((current) => ({
        ...current,
        error: "This customer status could not be updated because browser storage is unavailable.",
      }));
    }
  };

  return (
    <div className="w-full min-w-0">
      <button
        onClick={() => navigate("/customers")}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-5 transition"
      >
        <IconArrowLeft size={16} stroke={1.5} />
        Back to Customers
      </button>
      {storageError && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{storageError}</p>}

      <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(16rem,0.8fr)_minmax(0,2fr)]">
        <div className="min-w-0">
          <CustomerInfoPanel
            customer={customer}
            isBlocked={isBlocked}
            onBlock={() => (isBlocked ? handleUnblock() : setShowBlockModal(true))}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <div className="rounded-2xl bg-white p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Order History</h3>
              <span className="text-xs text-gray-400">
                {customer.orders.length} orders
              </span>
            </div>
            <OrderHistoryList orders={customer.orders} />
          </div>

          <div className="rounded-2xl bg-white p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Address</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                <p className="text-xs text-gray-400 mb-1">Billing Address</p>
                <p className="text-sm font-medium text-gray-800">
                  123 Main Street
                  <br />
                  New York, 10001 USA
                </p>
              </div>
              <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                <p className="text-xs text-gray-400 mb-1">Delivery Address</p>
                <p className="text-sm font-medium text-gray-800">
                  123 Main Street
                  <br />
                  New York, 10001 USA
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-4">
              Payment Methods
            </h3>
            <div className="flex flex-col gap-3">

              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <IconCreditCard size={18} stroke={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      **** **** **** 5946
                    </p>
                    <p className="text-xs text-gray-400">Visa</p>
                  </div>
                </div>
                <span className="text-xs font-medium bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                  Primary
                </span>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100">
                <div className="h-9 w-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <IconCreditCard size={18} stroke={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    **** **** **** 8374
                  </p>
                  <p className="text-xs text-gray-400">Mastercard</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {showBlockModal && (
        <BlockUserModal
          customerName={customer.name}
          onClose={() => setShowBlockModal(false)}
          onConfirm={handleBlock}
        />
      )}
    </div>
  );
}
