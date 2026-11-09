import { IconX, IconShieldOff } from "@tabler/icons-react";

export default function BlockUserModal({ customerName, onClose, onConfirm }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <IconShieldOff size={20} stroke={1.5} className="text-red-500" />
            <h3 className="font-semibold text-gray-800">Block User</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <IconX size={18} stroke={1.5} />
          </button>
        </div>

        <p className="text-sm text-gray-600">
          Are you sure you want to block{" "}
          <span className="font-semibold text-gray-800">{customerName}</span>?
          They will no longer be able to place orders.
        </p>

        <div className="flex gap-3 mt-6 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Yes, Block
          </button>
        </div>
      </div>
    </div>
  );
}