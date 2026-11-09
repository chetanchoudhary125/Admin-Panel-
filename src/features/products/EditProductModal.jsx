import { useState } from "react";
import { IconX } from "@tabler/icons-react";

export default function EditProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    stock: product.stock,
    rating: product.rating,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    onSave({
      ...product,
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      rating: Number(form.rating),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-800">Edit Product</h2>
          <button type="button" onClick={onClose} aria-label="Close edit product" className="text-gray-400 hover:text-gray-600">
            <IconX size={20} />
          </button>
        </div>

        {/* Fields */}
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div>
            <label htmlFor="edit-product-name" className="text-sm font-medium text-gray-600">Name</label>
            <input id="edit-product-name" name="name" required value={form.name} onChange={handleChange}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="edit-product-price" className="text-sm font-medium text-gray-600">Price ($)</label>
            <input id="edit-product-price" name="price" type="number" min="0" step="0.01" required value={form.price} onChange={handleChange}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="edit-product-stock" className="text-sm font-medium text-gray-600">Stock</label>
            <input id="edit-product-stock" name="stock" type="number" min="0" step="1" required value={form.stock} onChange={handleChange}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="edit-product-rating" className="text-sm font-medium text-gray-600">Rating</label>
            <input id="edit-product-rating" name="rating" type="number" step="0.1" min="0" max="5" required value={form.rating} onChange={handleChange}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-2">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit"
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Save Changes
          </button>
        </div>
        </form>

      </div>
    </div>
  );
}